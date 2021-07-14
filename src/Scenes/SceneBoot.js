import Phaser from 'phaser';

export default class SceneBoot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.load.image('jcco-logo', 'src/assets/boot-logo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}