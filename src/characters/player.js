import Phaser from 'phaser';
import Bullet from '../entities/bullets';
import getAnimation from '../helpers/animationGetter';
import Character from './character';

export default class Player extends Character {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 150);
    this.setData('face-direction', 'right');
    this.anims.play('gunner-blue-idle-right-anim', true);
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 50);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
    this.setData('health', 1);
    this.setData('character', 'player');
  }

  moveLeft() {
    this.setData('face-direction', 'left');
    if (this.body.touching.down) {
      this.body.velocity.x = -this.getData('speed');
      this.anims.play('gunner-blue-run-left-anim', true);
    } else {
      this.body.velocity.x = -100;
      this.play('gunner-blue-jump-left-anim', true);
    }
  }

  moveRight() {
    this.setData('face-direction', 'right');
    if (this.body.touching.down) {
      this.body.velocity.x = this.getData('speed');
      this.anims.play('gunner-blue-run-right-anim', true);
    } else {
      this.body.velocity.x = 100;
      this.play('gunner-blue-jump-right-anim', true);
    }
  }

  jump() {
    this.body.setVelocityY(-270);
    this.play(
      getAnimation(
        this.getData('face-direction'),
        this.getData('character'),
        'jump',
      ),
      true,
    );
  }

  idle() {
    this.play(getAnimation(this.getData('face-direction'), this.getData('character'), 'idle'), true);
  }

  hurt() {
    this.setData('health', this.getData('health') - 1);
    this.scene.sfx.hurt[0].play();
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      // Set the texture to the explosion image, then play the animation
      this.body.allowGravity = false;
      this.setTexture('Explosion'); // this refers to the same animation key we used when we added this.anims.create previously
      this.play('Explosion'); // play the animation

      // pick a random explosion sound within the array we defined in this.sfx in SceneMain
      this.scene.sfx.explosions[
        Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)
      ].play();

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on('animationcomplete', () => {
        if (canDestroy) {
          this.destroy();
        } else {
          this.setVisible(false);
        }
      }, this);

      this.setData('isDead', true);
    }
  }

  update() {
    this.body.velocity.x = 0;

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else { // when the "manual timer" is triggered:
        let laser;
        if (this.getData('face-direction') === 'right') {
          laser = new Bullet(this.scene, this.x + 15, this.y - 2, 250);
        } else if (this.getData('face-direction') === 'left') {
          laser = new Bullet(this.scene, this.x - 15, this.y - 2, -250);
        }
        this.scene.playerBullets.add(laser);

        // play the shooting sound effect
        this.setData('timerShootTick', 0);
      }
    }
  }
}