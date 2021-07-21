import Phaser from 'phaser';
import character from './character';
import Bullet from '../entities/bullets';
import getAnimation from '../helpers/animationGetter';

export default class Enemy extends character {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.setData('speed', 150);
    this.setData('face-direction', 'right');
    this.setData('character', 'enemy');
    this.anims.play('gunner-red-idle-right-anim', true);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback() {
        let enemyBullet;
        if (this.getData('face-direction') === 'right') {
          enemyBullet = new Bullet(
            this.scene,
            this.x + 15,
            this.y - 2,
            250,
          );
        } else {
          enemyBullet = new Bullet(
            this.scene,
            this.x - 15,
            this.y - 2,
            -250,
          );
        }
        this.scene.enemyBullets.add(enemyBullet);
      },
      callbackScope: this,
      loop: true,
    });
  }

  moveLeft() {
    this.setData('face-direction', 'left');
    this.body.setAcceleration(100);
    if (this.body.touching.down) {
      this.body.velocity.x = -this.getData('speed');
      this.anims.play('gunner-red-run-left-anim', true);
    } else {
      this.body.velocity.x = -100;
      this.play('gunner-red-jump-left-anim', true);
    }
  }

  moveRight() {
    this.setData('face-direction', 'right');
    this.body.setAcceleration(-100);
    if (this.body.touching.down) {
      this.body.velocity.x = this.getData('speed');
      this.anims.play('gunner-red-run-right-anim', true);
    } else {
      this.body.velocity.x = 100;
      this.play('gunner-red-jump-right-anim', true);
    }
  }

  jump() {
    this.body.setVelocityY(-250);
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
    this.play(
      getAnimation(
        this.getData('face-direction'),
        this.getData('character'),
        'idle',
      ),
      true,
    );
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      // Set the texture to the explosion image, then play the animation
      this.body.allowGravity = false;
      this.setTexture('Explosion'); // this refers to the same animation key we used when we added this.anims.create previously
      this.play('Explosion', false); // play the animation

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
      this.body.setAcceleration(0, 0);

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
    if (!this.getData('isDead')) {
      if (Math.abs(this.body.velocity.x) <= 10) {
        this.body.velocity.x = 0;
        this.body.acceleration.x = 0;
        this.idle();
      }
    } else {
      this.play('Explosion', false);
      this.destroy();
    }
  }
}