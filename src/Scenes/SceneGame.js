import Phaser from 'phaser';
import Player from '../characters/player';

export default class SceneGame extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  setBackground() {
    this.sky = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'sky');
    this.sky.displayWidth = this.game.config.width;
    this.sky.displayHeight = this.game.config.height;

    this.farGround = this.add.image(this.game.config.width * 0.5, this.game.config.height - 90, 'far-ground');
  }

  create() {
    this.setBackground();

    this.ground = this.physics.add.staticImage(this.game.config.width * 0.5, 480, 'ground').refreshBody();

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
    );

    this.physics.add.collider(this.player, this.ground);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update();
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    } else if (this.player.body.touching.down) {
      this.player.idle();
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.jump();
    } else if (this.cursors.down.isDown && this.player.body.touching.down) {
      this.player.crouch();
    }
  }
}