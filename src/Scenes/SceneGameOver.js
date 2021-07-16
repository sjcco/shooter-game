import Phaser from 'phaser';
import { uploadScore } from '../sys/api';
export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'gameOver' });
  }

  preload() {
    this.load.html('form', 'src/assets/gui/form.html');
    this.score = localStorage.getItem('score');
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 80, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.saveScore = this.add.text(432, 145, `Enter your name to save your score (${this.score}). Press ENTER when done`, {
      fontFamily: 'monospace',
      fontSize: 24,
      fontStyle: 'normal',
      color: '#ff0',
      align: 'center',
      wordWrap: { width: 500 },
    });
    this.saveScore.setOrigin(0.6);

    this.nameInput = this.add.dom(650, 220).createFromCache('form');

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on('up', () => {
      const name = this.nameInput.getChildByName('name');
      if (name.value !== '') {
        uploadScore(name.value, this.score);
        this.scene.start('LeaderBoard');
      }
    });
  }
}