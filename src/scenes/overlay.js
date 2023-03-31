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
    this.cursor = this.experience.cursor;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;

    this.setOverlay();
    this.animateOverlay();
  }

  setOverlay() {
    let ang_rad = (this.camera.perspectiveCamera.fov * Math.PI) / 180;
    let fov_y =
      this.camera.perspectiveCamera.position.z * Math.tan(ang_rad / 2) * 2;

    this.overlayGeo = new THREE.PlaneGeometry(
      fov_y * this.camera.perspectiveCamera.aspect,
      fov_y,
      1,
      1
    );
    this.overlayMat = new THREE.RawShaderMaterial({
      vertexShader: overlayVertex,
      fragmentShader: overlayFragment,
      uniforms: {
        uTime: { type: 'f', value: 0 },
        uHue: { type: 'f', value: 0.57 },
        uHueVariation: { type: 'f', value: 0 },
        uDensity: { type: 'f', value: 0.5 },
        uDisplacement: { type: 'f', value: 0.66 },
        uCursorPosition: { type: 'v2', value: new THREE.Vector2(0.5, 0.5) },
      },
      wireframe: false,
      side: THREE.FrontSide,
    });
    this.overlay = new THREE.Mesh(this.overlayGeo, this.overlayMat);
    this.scene.add(this.overlay);
  }

  animateOverlay() {
    this.overlay.material.uniforms.uTime.value = this.time.elapsed * 0.003;
  }

  resize() {}

  update() {
    this.animateOverlay();
  }

  cursorMove() {
    this.overlay.material.uniforms.uCursorPosition.value = new THREE.Vector2(
      this.cursor.position.x,
      this.cursor.position.y
    );
  }
}
