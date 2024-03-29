import * as THREE from 'three';
import { EventEmitter } from 'events';

// src
import Experience from '../experience.js';

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.textureLoader = new THREE.TextureLoader();
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === 'normalTexture') {
        this.loaders.textureLoader.load(asset.path, (file) => {
          file.encoding = THREE.sRGBEncoding;
          this.singleAssetLoaded(asset, file);
        });
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit('ready');
    }
  }
}
