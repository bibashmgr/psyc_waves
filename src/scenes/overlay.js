import * as THREE from 'three';

// src
import Experience from '../experience.js';

// shaders
import overlayVertex from '../shaders/overlay_vertex.glsl';
import overlayFragment from '../shaders/overlay_fragment.glsl';

export default class Overlay {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    this.setOverlay();
    this.animateOverlay();
  }

  setOverlay() {
    this.overlayGeo = new THREE.PlaneGeometry(10, 10, 100, 100);
    this.overlayMat = new THREE.RawShaderMaterial({
      vertexShader: overlayVertex,
      fragmentShader: overlayFragment,
      uniforms: {
        uTime: { type: 'f', value: 0 },
        uHue: { type: 'f', value: 0.56 },
        uHueVariation: { type: 'f', value: 0 },
        uDensity: { type: 'f', value: 0.75 },
        uDisplacement: { type: 'f', value: 0.75 },
        uCursorPosition: { type: 'v2', value: new THREE.Vector2(0.5, 0.5) },
      },
      wireframe: false,
      side: THREE.DoubleSide,
    });
    this.overlay = new THREE.Mesh(this.overlayGeo, this.overlayMat);
    this.scene.add(this.overlay);
  }

  animateOverlay() {
    this.overlay.material.uniforms.uTime.value = this.time.elapsed * 0.001;
  }

  resize() {}

  update() {
    this.animateOverlay();
  }
}
