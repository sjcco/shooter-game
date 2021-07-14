import Phaser from 'phaser';
import SceneBoot from '../Scenes/SceneBoot';
import ScenePreloader from '../Scenes/ScenePreloader';
import SceneTitle from '../Scenes/SceneTitle';
import SceneGame from '../Scenes/SceneGame';

export default {
  type: Phaser.WEBGL,
  width: 640,
  height: 480,
  backgroundColor: 'white',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [
    SceneBoot,
    ScenePreloader,
    SceneTitle,
    SceneGame,
  ],
  pixelArt: true,
  roundPixels: true,
};