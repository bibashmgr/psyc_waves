import * as THREE from 'three';

// src
import Experience from '../experience.js';

// scenes
import Environment from './environment.js';
import Overlay from './overlay.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.box = new Overlay();
    });
  }

  resize() {}

  update() {
    if (this.box) {
      this.box.update();
    }
    if (this.environment) {
      this.environment.update();
    }
  }
}
