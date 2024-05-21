import { Renderer } from "./renderer/Renderer";
// keyboard input
export const keyboardInput = (e: KeyboardEvent) => {
  const step = 5;
  // if shift + arrow up and down is pressed, translate in z axis
  if (e.shiftKey) {
    if (e.key === "ArrowUp") {
      Renderer.setTranslation({ z: Renderer.translation().z + step });
    } else if (e.key === "ArrowDown") {
      Renderer.setTranslation({ z: Renderer.translation().z - step });
    }
  } else {
    if (e.key === "ArrowUp") {
      Renderer.setTranslation({ y: Renderer.translation().y + step });
    }
    if (e.key === "ArrowDown") {
      Renderer.setTranslation({ y: Renderer.translation().y - step });
    }
    if (e.key === "ArrowLeft") {
      Renderer.setTranslation({ x: Renderer.translation().x - step });
    }
    if (e.key === "ArrowRight") {
      Renderer.setTranslation({ x: Renderer.translation().x + step });
    }
  }
};
