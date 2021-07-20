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
    this.sfx = {
      btnDown: this.sound.add('sndBtnDown'),
    };
    this.title = this.add.text(this.game.config.width * 0.5 + 15, 80, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.saveScore = this.add.text(this.game.config.width * 0.5 + 30, 145, `Your Score ${this.score}.\n Press ENTER when done`, {
      fontFamily: 'monospace',
      fontSize: 24,
      fontStyle: 'normal',
      color: '#ff0',
      align: 'center',
      wordWrap: { width: 500 },
    });
    this.saveScore.setOrigin(0.6);

    this.nameInput = this.add.dom(325, 220).createFromCache('form');

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on('up', () => {
      const name = this.nameInput.getChildByName('name');
      if (name.value !== '') {
        uploadScore(name.value, this.score)
          .then(() => {
            this.scene.start('LeaderBoard');
          })
          .catch((err) => {
            this.add.text(this.game.config.width * 0.27, 300, `Oops ${err.message}`, {
              fontFamily: 'monospace',
              fontSize: 20,
              fontStyle: 'bold',
              color: '#fa5',
              align: 'left',
            }).setOrigin(0);

            this.add.text(this.game.config.width * 0.12, 350, 'Press this button to go back to title screen', {
              fontFamily: 'monospace',
              fontSize: 20,
              fontStyle: 'bold',
              color: '#fa5',
              align: 'left',
            }).setOrigin(0);

            this.replayBtn = this.add.sprite(
              this.game.config.width * 0.5,
              (this.game.config.height * 0.5) + 180,
              'replayBtn',
            );
            this.replayBtn.setScale(0.3);

            this.replayBtn.setInteractive();
            this.replayBtn.on('pointerdown', () => {
              this.sfx.btnDown.play();
            }, this);

            this.replayBtn.on('pointerup', () => {
              this.scene.start('Title');
            }, this);
          });
      }
    });
  }
}