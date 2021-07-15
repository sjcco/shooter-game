import Phaser from 'phaser';
import character from './character';

export default class Enemy extends character {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.setData('speed', 150);
    this.setData('face-direction', 'right');
    this.anims.play('gunner-red-idle-right-anim', true);
  }

  moveLeft() {
    this.setData('face-direction', 'left');
    if (this.body.touching.down) {
      this.body.velocity.x = -this.getData('speed');
      this.anims.play('gunner-red-run-left-anim', true);
    } else {
      this.body.velocity.x = -100;
    }
  }

  moveRight() {
    this.setData('face-direction', 'right');
    if (this.body.touching.down) {
      this.body.velocity.x = this.getData('speed');
      this.anims.play('gunner-red-run-right-anim', true);
    } else {
      this.body.velocity.x = 100;
    }
  }

  jump() {
    this.body.setVelocityY(-250);
    if (this.getData('face-direction') === 'right') {
      this.play('gunner-red-jump-right-anim', false);
    } else if (this.getData('face-direction') === 'left') {
      this.play('gunner-red-jump-left-anim', true);
    }
  }

  idle() {
    if (this.getData('face-direction') === 'right') {
      this.play('gunner-red-idle-right-anim', true);
    } else if (this.getData('face-direction') === 'left') {
      this.play('gunner-red-idle-left-anim', true);
    }
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
  }
}