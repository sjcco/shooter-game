import character from './character';

export default class Player extends character {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 150);
    this.setData('face-direction', 'right');
    this.anims.play('gunner-blue-idle-right-anim', true);
  }

  moveLeft() {
    this.setData('face-direction', 'left');
    if (this.body.touching.down) {
      this.body.velocity.x = -this.getData('speed');
      this.anims.play('gunner-blue-run-left-anim', true);
    } else {
      this.body.velocity.x = -100;
    }
  }

  moveRight() {
    this.setData('face-direction', 'right');
    if (this.body.touching.down) {
      this.body.velocity.x = this.getData('speed');
      this.anims.play('gunner-blue-run-right-anim', true);
    } else {
      this.body.velocity.x = 100;
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

  crouch() {
    if (this.getData('face-direction') === 'right') {
      this.play('gunner-blue-crouch-right-anim', true);
    } else {
      this.play('gunner-blue-crouch-left-anim', true);
    }
  }

  update() {
    this.body.velocity.x = 0;
  }
}