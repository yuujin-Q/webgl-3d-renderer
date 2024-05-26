import { Vec3 } from "../../types/math/Vec3";
import { Color } from "../../types/objects/Color";
import { CubeGeometry } from "../../types/objects/mesh/geometry/CubeGeometry";
import { BasicMaterial } from "../../types/objects/mesh/material/BasicMaterial";
import { Mesh } from "../../types/objects/mesh/Mesh";
import { Animation } from "../../lib/animation/Animation";

export class MechanicalHand extends Mesh {
  static handThickness = 200;
  static fingerWidth = 100;
  static palmColor = new Color(67 / 255, 200 / 255, 190 / 255, 1);
  static fingerColor = new Color(67 / 255, 150 / 255, 120 / 255, 1);
  constructor() {
    const palmGeometry = new CubeGeometry(
      500,
      550,
      MechanicalHand.handThickness
    );
    const palmMaterial = new BasicMaterial();
    palmMaterial.defaultColor = MechanicalHand.palmColor;
    palmMaterial.enableDefaultColor(true);

    super(palmGeometry, palmMaterial);
    this.name = "MechanicalHand";

    // thumb
    const thumb = this.createSegment("Thumb0", 300, MechanicalHand.fingerColor);
    const thumb1 = this.createSegment(
      "Thumb1",
      200,
      MechanicalHand.fingerColor
    );
    thumb.add(thumb1);
    thumb.position = new Vec3(-250, -50, 0);
    thumb.rotation = new Vec3(0, 0, 0.5);
    thumb1.position = new Vec3(0, 200, 50);
    thumb1.rotation = new Vec3(0.5, 0, 0);

    // index
    const index = this.createSegment("index0", 200, MechanicalHand.fingerColor);
    const index1 = this.createSegment(
      "index1",
      300,
      MechanicalHand.fingerColor
    );

    index.add(index1);
    index.position = new Vec3(-190, 350, 0);
    index1.position = new Vec3(0, 150, 50);
    index1.rotation.x = 1;

    // middle
    const middle = this.createSegment(
      "middle0",
      200,
      MechanicalHand.fingerColor
    );
    const middle1 = this.createSegment(
      "middle1",
      300,
      MechanicalHand.fingerColor
    );

    middle.add(middle1);
    middle.position = new Vec3(-60, 350, 0);
    middle1.position = new Vec3(0, 150, 50);
    middle1.rotation.x = 1;

    // ring
    const ring = this.createSegment("ring0", 200, MechanicalHand.fingerColor);
    const ring1 = this.createSegment("ring1", 300, MechanicalHand.fingerColor);

    ring.add(ring1);
    ring.position = new Vec3(60, 350, 0);
    ring1.position = new Vec3(0, 150, 50);
    ring1.rotation.x = 1;

    const pinky = this.createSegment("pinky0", 200, MechanicalHand.fingerColor);
    const pinky1 = this.createSegment(
      "pinky1",
      300,
      MechanicalHand.fingerColor
    );

    pinky.add(pinky1);
    pinky.position = new Vec3(190, 350, 0);
    pinky1.position = new Vec3(0, 150, 50);
    pinky1.rotation.x = 1;

    this.add(thumb);
    this.add(index);
    this.add(middle);
    this.add(ring);
    this.add(pinky);

    this.animation = new Animation(this, MechanicalHand.grippingFrames, 60);

    // Initialize world matrices
    this.computeWorldMatrix(true, true);
  }

  private createSegment(name: string, height: number, color: Color): Mesh {
    const geometry = new CubeGeometry(
      MechanicalHand.fingerWidth,
      height,
      MechanicalHand.fingerWidth
    );
    const material = new BasicMaterial();
    material.defaultColor = color;
    material.enableDefaultColor(true);

    const segment = new Mesh(geometry, material);
    segment.name = name;
    return segment;
  }

  static grippingFrames = Animation.generateFrames(
    [
      "Thumb0",
      "Thumb1",
      "index0",
      "index1",
      "middle0",
      "middle1",
      "ring0",
      "ring1",
      "pinky0",
      "pinky1",
    ],
    [
      [new Vec3(-250, -50, 0), new Vec3(-250, -50, 15)],
      [new Vec3(0, 200, 50), new Vec3(0, 200, 50)],
      [new Vec3(-190, 350, 0), new Vec3(-190, 350, 75)],
      [new Vec3(0, 150, 50), new Vec3(0, 150, 50)],
      [new Vec3(-60, 350, 0), new Vec3(-60, 350, 75)],
      [new Vec3(0, 150, 50), new Vec3(0, 150, 50)],
      [new Vec3(60, 350, 0), new Vec3(60, 350, 75)],
      [new Vec3(0, 150, 50), new Vec3(0, 150, 50)],
      [new Vec3(190, 350, 0), new Vec3(190, 350, 75)],
      [new Vec3(0, 150, 50), new Vec3(0, 150, 50)],
    ],
    [
      [new Vec3(0, 0, 0.5), new Vec3(0.4, 0.25, 0.5)],
      [new Vec3(0.5, 0, 0), new Vec3(1.55, 0, 0)],
      [new Vec3(0, 0, 0), new Vec3(0.4, 0, 0)],
      [new Vec3(1, 0, 0), new Vec3(1.55, 0, 0)],
      [new Vec3(0, 0, 0), new Vec3(0.4, 0, 0)],
      [new Vec3(1, 0, 0), new Vec3(1.55, 0, 0)],
      [new Vec3(0, 0, 0), new Vec3(0.4, 0, 0)],
      [new Vec3(1, 0, 0), new Vec3(1.55, 0, 0)],
      [new Vec3(0, 0, 0), new Vec3(0.4, 0, 0)],
      [new Vec3(1, 0, 0), new Vec3(1.55, 0, 0)],
    ],
    [
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
      [new Vec3(1, 1, 1), new Vec3(1, 1, 1)],
    ],
    200,
    false,
    Vec3.easeInOutBack
  );
}
