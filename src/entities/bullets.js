import Entity from './entity';

export default class Bullet extends Entity {
  constructor(scene, x, y, speed) {
    super(scene, x, y, 'bullet');
    this.body.allowGravity = false;
    this.body.velocity.x = speed;
  }
}