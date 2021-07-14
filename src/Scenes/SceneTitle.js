import Phaser from 'phaser';

export default class SceneTitle extends Phaser.Scene {
  constructor() {
    super({ key: 'Title' });
  }

  create() {
    this.sfx = {
      btnDown: this.sound.add('sndBtnDown'),
    };
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'title');
    this.btnStart = this.add.sprite(
      this.game.config.width * 0.5,
      (this.game.config.height * 0.5) + 100,
      'startBtn',
    );
    this.btnStart.setScale(0.6);

    this.btnStart.setInteractive();

    this.btnStart.on('pointerdown', function () {
      this.sfx.btnDown.play();
    }, this);

    this.btnStart.on('pointerup', function () {
      this.scene.start('Game');
    }, this);
  }
}