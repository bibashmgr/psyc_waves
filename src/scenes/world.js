import * as THREE from 'three';

// src
import Experience from '../experience.js';

// scenes
// import Environment from './environment.js';
import Overlay from './overlay.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      // this.environment = new Environment();
      this.overlay = new Overlay();
    });
  }

  resize() {}

  update() {
    if (this.overlay) {
      this.overlay.update();
    }

    // if (this.environment) {
    //   this.environment.update();
    // }
  }

  cursorMove() {
    if (this.overlay) {
      this.overlay.cursorMove();
    }
  }
}
