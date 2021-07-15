import Phaser from 'phaser';
import './style.css';
import config from './Config/config';

const parent = document.createElement('div');
parent.setAttribute('id', 'canvasContainer');
parent.classList.add('container');
document.body.appendChild(parent);
// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
const can = document.querySelector('canvas');
console.log(game.canvas);
console.log(can);