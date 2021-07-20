import Phaser from 'phaser';
import { getRankings } from '../sys/api';

export default class SceneLeaderBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderBoard' });
  }

  create() {
    this.sfx = {
      btnDown: this.sound.add('sndBtnDown'),
    };
    this.rankings = getRankings();

    this.title = this.add.text((this.game.config.width * 0.33) + 30, 55, 'Top 10 Scores', {
      fontSize: '28px',
      fill: '#fff',
      fontFamily: 'Mate SC',
    });

    this.rankings.then((achievement) => {
      const topTen = achievement.slice(0, 10);

      for (let i = 0; i < topTen.length; i += 1) {
        this.add.text(this.game.config.width * 0.40, 80 + (i + 1) * 25, `${i + 1}º: ${topTen[i].user}: ${topTen[i].score}`, {
          fontFamily: 'monospace',
          fontSize: 15,
          fontStyle: 'bold',
          color: '#fa5',
          align: 'left',
        }).setOrigin(0);
      }
    }).catch((err) => {
      this.add.text(this.game.config.width * 0.27, 200, `Oops ${err.message}`, {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#fa5',
        align: 'left',
      }).setOrigin(0);
    });

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
  }
}