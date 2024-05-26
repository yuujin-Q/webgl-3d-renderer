import { Texture } from "./Texture";

type TexturePreset = {
  u_diffuseMap: Texture;
  u_specularMap?: Texture;
  u_normalMap?: Texture;
  u_displacementMap?: Texture;
};

// Brick
const brickDiffuse = new Texture();
brickDiffuse.setData("/brick-wall/brick-wall_albedo.png");
const brickSpecular = new Texture();
brickSpecular.setData("/brick-wall/brick-wall_ao.png");
const brickNormalMap = new Texture();
brickNormalMap.setData("/brick-wall/brick-wall_normal.png");
const brickDisplacementMap = new Texture();
brickDisplacementMap.setData("/brick-wall/brick-wall_height.png");

const brickPreset: TexturePreset = {
  u_diffuseMap: brickDiffuse,
  u_specularMap: brickSpecular,
  u_normalMap: brickNormalMap,
  u_displacementMap: brickDisplacementMap,
};

// F
const fTexture = new Texture();
fTexture.setData("/f-texture.png");
const fPreset: TexturePreset = {
  u_diffuseMap: fTexture,
};

export { brickPreset, fPreset };
