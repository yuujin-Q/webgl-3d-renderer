import { Vec3 } from "../../types/math/Vec3";
import { ObjectNode } from "../../types/objects/ObjectNode";
import { Renderer } from "../renderer/Renderer";

export type AnimationTRS = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};
export type AnimationFrame<T = AnimationTRS> = { [key: string]: T };

export class Animation {
  private object: ObjectNode;
  private frames: AnimationFrame[] = [];
  private currentFrameIndex: number = 0;
  private playing: boolean = false;
  private reverse: boolean = false;
  private autoReplay: boolean = true;
  private fps: number = 30;
  private intervalId: number | null = null;

  constructor(object: ObjectNode, frames: AnimationFrame[], fps: number = 30) {
    this.object = object;
    this.frames = frames;
    this.fps = fps;
  }

  // Methods for controlling animation
  play(): void {
    if (!this.playing) {
      this.intervalId = setInterval(() => {
        if (this.reverse) {
          this.previousFrame();
        } else {
          this.nextFrame();
        }
        if (this.isEndOfAnimation()) {
          if (this.autoReplay) {
            if (this.reverse) {
              this.gotoLastFrame();
            } else {
              this.gotoFirstFrame();
            }
          } else {
            this.pause();
          }
        }
      }, 1000 / this.fps);
      this.playing = true;
    }
  }

  pause(): void {
    if (this.playing && this.intervalId) {
      clearInterval(this.intervalId);
      this.playing = false;
    }
  }

  setReverse(reverseStatus: boolean): void {
    this.reverse = reverseStatus;
  }

  setAutoReplay(autoReplayStatus: boolean): void {
    this.autoReplay = autoReplayStatus;
    if (this.isEndOfAnimation()) {
      this.play();
    }
  }

  setFPS(fps: number): void {
    this.fps = fps;
    if (this.playing) {
      this.pause();
      this.play();
    }
  }

  nextFrame(): void {
    this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
    // Apply current frame to the articulated model
    this.applyFrame();
  }

  previousFrame(): void {
    this.currentFrameIndex = Math.max(this.currentFrameIndex - 1, 0);
    // Apply current frame to the articulated model
    this.applyFrame();
  }

  gotoFirstFrame(): void {
    this.currentFrameIndex = 0;
    // Apply current frame to the articulated model
    this.applyFrame();
  }

  gotoLastFrame(): void {
    this.currentFrameIndex = this.frames.length - 1;
    // Apply current frame to the articulated model
    this.applyFrame();
  }

  gotoFrame(index: number): void {
    this.currentFrameIndex = Math.max(
      0,
      Math.min(index, this.frames.length - 1)
    );
    // Apply current frame to the articulated model
    this.applyFrame();
  }

  getObject(): ObjectNode {
    return this.object;
  }

  getReverse(): boolean {
    return this.reverse;
  }

  getAutoReplay(): boolean {
    return this.autoReplay;
  }

  getFPS(): number {
    return this.fps;
  }

  getCurrentFrameIndex(): number {
    return this.currentFrameIndex;
  }

  getMaxFrameIndex(): number {
    return this.frames.length - 1;
  }

  // Generate keyframes for the articulated model
  static generateFrames(
    keys: string[],
    positions: [Vec3, Vec3][],
    rotations: [Vec3, Vec3][],
    scales: [Vec3, Vec3][],
    totalFrames: number,
    looped: boolean = false
  ): AnimationFrame[] {
    const keyFrames = [];
    let loopedFrames = totalFrames;

    if (looped) {
      loopedFrames = totalFrames * 2 - 1;
    }

    for (let i = 0; i < loopedFrames; i++) {
      let t = i / (totalFrames - 1);

      if (looped && t >= 1) {
        // Reverse the animation for the second half
        t = 2 - t;
      }

      const position = positions.map(([start, end]) =>
        Vec3.lerp(start, end, t)
      );
      const rotation = rotations.map(([start, end]) =>
        Vec3.lerp(start, end, t)
      );
      const scale = scales.map(([start, end]) => Vec3.lerp(start, end, t));

      const keyFrame: AnimationFrame = {};
      keys.forEach((key, index) => {
        keyFrame[key] = {
          position: position[index],
          rotation: rotation[index],
          scale: scale[index],
        };
      });

      keyFrames.push(keyFrame);
    }

    return keyFrames;
  }

  static combineFrames(listOfFrames: AnimationFrame[][]): AnimationFrame[] {
    const combinedFrames: AnimationFrame[] = [];

    // Iterate through each array of frames
    listOfFrames.forEach((frames) => {
      // Iterate through each frame in the array
      frames.forEach((frame) => {
        // Push the frame to the combinedFrames array
        combinedFrames.push(frame);
      });
    });

    return combinedFrames;
  }

  // Apply the properties of the current frame to the articulated model
  private applyFrame(): void {
    const currentFrame = this.frames[this.currentFrameIndex];

    const applyPropertiesRecursively = (node: ObjectNode): void => {
      const nodeName = node.name;
      const nodeKey = Object.keys(currentFrame).find((key) => key === nodeName);
      if (nodeKey) {
        const frame = currentFrame[nodeKey];
        node.position = frame.position;
        node.rotation = frame.rotation;
        node.scale = frame.scale;
      }
      // Recursively apply properties to children
      node.children.forEach((child) => {
        applyPropertiesRecursively(child);
      });
    };

    // Start applying properties from the root object
    applyPropertiesRecursively(this.object);

    this.object.computeWorldMatrix(true, true);
    Renderer.renderScene();
  }

  // Check if the animation has reached the end
  private isEndOfAnimation(): boolean {
    return this.reverse
      ? this.currentFrameIndex <= 0
      : this.currentFrameIndex >= this.frames.length - 1;
  }
}
