import { ObjectNode } from "./ObjectNode";

export class Scene extends ObjectNode {
  /**
   * Notes:
   * Scene class as root node or origin.
   *
   * Bisa ditambahkan properti background berupa color (untuk gl.clearColor).
   *
   * Di three.js sendiri, Scene dapat memiliki background berupa latar belakang bertekstur flat
   * atau cube/equirectangular (HDRi) untuk latar belakang berupa skybox.
   *
   * Selain itu, untuk background berupa texture, three.js juga dapat mengatur intensitas tekstur (opacity)
   * dan rotasi (untuk skybox, memberikan efek langit yang tampak bergerak).
   * Terakhir, scene pada three.js dapat mengatur environment map sekaligus fog.
   */
}
