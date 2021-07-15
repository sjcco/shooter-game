import Phaser from 'phaser';
import Player from '../characters/player';
import Enemy from '../characters/enemies';
import getSpawnPoint from '../helpers/spawnpoints';

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
    this.sfx = {
      explosions: [
        this.sound.add('kill1'),
        this.sound.add('kill2'),
        this.sound.add('kill3'),
        this.sound.add('kill4'),
        this.sound.add('kill5'),
      ],
    };

    this.setBackground();

    this.ground = this.physics.add.staticImage(this.game.config.width * 0.5, 480, 'ground').refreshBody();

    this.raycaster = this.raycasterPlugin.createRaycaster();

    this.ray = this.raycaster.createRay();

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
    );

    this.physics.add.collider(this.player, this.ground);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.gunner = this.add.sprite(100, 100);
    this.gunner.play('gunner-blue-crouch-right-anim');

    this.enemies = this.add.group();
    this.playerBullets = this.add.group();

    this.time.addEvent({
      delay: 2000,
      callback: () => {
        const enemy = new Enemy(
          this,
          ...getSpawnPoint(),
        );
        this.enemies.add(enemy);

        this.physics.add.collider(this.enemies, this.ground);

        this.physics.add.collider(this.playerBullets, this.enemies, (playerBullet, enemy) => {
          if (enemy) {
            if (enemy.onDestroy !== undefined) {
              enemy.onDestroy();
            }

            enemy.explode(true);
            playerBullet.destroy();
          }
        });
      },
      callbackScope: this,
      loop: true,
    });
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
    }
    if (this.keySpace.isDown) {
      this.player.setData('isShooting', true);
    } else {
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
      this.player.setData('isShooting', false);
    }
  }
}