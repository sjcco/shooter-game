import Phaser from 'phaser';

export default class Character extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.body.collideWorldBounds = true;
    this.setData('isDead', false);
  }
}