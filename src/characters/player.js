import Bullet from '../entities/bullets';
import Character from './character';

export default class Player extends Character {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 150);
    this.setData('face-direction', 'right');
    this.anims.play('gunner-blue-idle-right-anim', true);
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
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
      this.play('gunner-blue-jump-right-anim', false);
    }
  }

  jump() {
    this.body.setVelocityY(-250);
    if (this.getData('face-direction') === 'right') {
      this.play('gunner-blue-jump-right-anim', false);
    } else if (this.getData('face-direction') === 'left') {
      this.play('gunner-blue-jump-left-anim', true);
    }
  }

  idle() {
    if (this.getData('face-direction') === 'right') {
      this.play('gunner-blue-idle-right-anim', true);
    } else if (this.getData('face-direction') === 'left') {
      this.play('gunner-blue-idle-left-anim', true);
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