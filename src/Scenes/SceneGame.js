import Phaser from 'phaser';
import Player from '../characters/player';
import Enemy from '../characters/enemies';
import getSpawnPoint from '../helpers/spawnpoints';
import nextAction from '../helpers/nextAction';

export default class SceneGame extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  setBackground() {
    this.sky = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'sky');
    this.sky.displayWidth = this.game.config.width;
    this.sky.displayHeight = this.game.config.height;

    this.farGround = this.add.image(this.game.config.width * 0.5, this.game.config.height - 90, 'far-ground');
    this.healthbar = this.add.image(this.game.config.width - 115, 40, 'health-bar');
  }

  drawHealth(bars) {
    for (this.i = 0; this.i < bars; this.i += 1) {
      this.dot = this.add.image((this.game.config.width - 25) - (this.i * 30), 40, 'health-dot');
      this.healthGroup.add(this.dot);
    }
  }

  create() {
    this.sfx = {
      explosions: [
        this.sound.add('kill1'),
        this.sound.add('kill2'),
        this.sound.add('kill3'),
        this.sound.add('kill4'),
        this.sound.add('kill5'),
      ],
      hurt: [
        this.sound.add('hurt'),
      ],
    };

    this.music = this.sound.add('music');
    this.music.play();

    this.setBackground();
    this.tallrigthPlataform = this.physics.add.staticImage(420, 425, 'tall-plataform').refreshBody();
    this.ground = this.physics.add.staticImage(this.game.config.width * 0.5, 450, 'ground').refreshBody();
    this.smallPlataform = this.physics.add.staticImage(this.game.config.width - 70, 340, 'small-plataform').refreshBody();
    this.centerPlataform = this.physics.add.staticImage((this.game.config.width * 0.5) - 10, 290, 'center-plataform').refreshBody();
    this.smallLeftPlataform = this.physics.add.staticImage(75, 100, 'small-left-plataform').refreshBody();
    this.smallPlataform1 = this.physics.add.staticImage(60, 375, 'small-plataform').refreshBody();
    this.longPlataform = this.physics.add.staticImage(this.game.config.width - 150, 220, 'long-plataform').refreshBody();
    this.longPlataform1 = this.physics.add.staticImage(90, 220, 'long-plataform').refreshBody();
    this.smallRightPlataform = this.physics.add.staticImage(this.game.config.width - 60, 150, 'small-plataform').refreshBody();

    this.score = 0;

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
    );

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.tiles = this.add.group();
    this.enemies = this.add.group();
    this.playerBullets = this.add.group();
    this.enemyBullets = this.add.group();
    this.healthGroup = this.add.group();

    this.drawHealth(this.player.getData('health'));

    this.tiles.addMultiple(
      [
        this.ground,
        this.centerPlataform,
        this.smallLeftPlataform,
        this.tallrigthPlataform,
        this.smallPlataform,
        this.smallPlataform1,
        this.longPlataform,
        this.longPlataform1,
        this.smallRightPlataform,
      ],
    );

    this.physics.add.collider(this.player, this.tiles);

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        if (this.enemies.getChildren().length <= 4) {
          const enemy = new Enemy(
            this,
            ...getSpawnPoint(),
          );
          this.enemies.add(enemy);

          this.physics.add.collider(this.enemies, this.tiles);

          this.physics.add.collider(this.playerBullets, this.enemies, (playerBullet, enemy) => {
            if (enemy) {
              if (enemy.onDestroy !== undefined) {
                enemy.onDestroy();
              }
              this.score += 100;
              enemy.explode(true);
              playerBullet.destroy();
            }
          });

          this.physics.add.overlap(this.player, this.enemyBullets, (player, enemyBullet) => {
            if (!player.getData('isDead')) {
              player.hurt();
              this.healthGroup.getChildren().forEach(dot => dot.destroy());
              this.drawHealth(this.player.getData('health'));
              enemyBullet.destroy();
            }
          });
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        if (this.enemies.getChildren().length > 1) {
          this.enemies.getChildren().forEach(element => {
            const action = nextAction();
            if (action === 'jump') {
              element.jump();
            } else if (action === 'left') {
              element.moveLeft();
            } else if (action === 'right') {
              element.moveRight();
            } else if (action === 'left-jump') {
              element.moveLeft();
              element.jump();
            } else if (action === 'right-jump') {
              element.moveRight();
              element.jump();
            }
          });
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    if (this.player.getData('health') <= 0) {
      this.player.explode(true);
      this.music.stop();

      localStorage.setItem('score', this.score);

      this.scene.start('gameOver');
    }
    if (!this.player.getData('isDead')) {
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
      }
      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }

      for (let i = 0; i < this.enemyBullets.getChildren().length; i += 1) {
        const bullet = this.enemyBullets.getChildren()[i];
        bullet.update();

        if (bullet.x < -bullet.displayWidth
          || bullet.x > this.game.config.width + bullet.displayWidth
          || bullet.y < -bullet.displayHeight * 4
          || bullet.y > this.game.config.height + bullet.displayHeight) {
          if (bullet) {
            bullet.destroy();
          }
        }
      }
    }

    for (let i = 0; i < this.playerBullets.getChildren().length; i += 1) {
      const bullet = this.playerBullets.getChildren()[i];
      bullet.update();

      if (bullet.x < -bullet.displayWidth
        || bullet.x > this.game.config.width + bullet.displayWidth
        || bullet.y < -bullet.displayHeight * 4
        || bullet.y > this.game.config.height + bullet.displayHeight) {
        if (bullet) {
          bullet.destroy();
        }
      }
    }

    if (this.enemies.getChildren().length > 1) {
      this.enemies.getChildren().forEach(element => {
        element.update();
      });
    }
  }
}