import Phaser from 'phaser';
import PhaserRaycaster from 'phaser-raycaster';
import SceneBoot from '../Scenes/SceneBoot';
import ScenePreloader from '../Scenes/ScenePreloader';
import SceneTitle from '../Scenes/SceneTitle';
import SceneGame from '../Scenes/SceneGame';

export default {
  type: Phaser.WEBGL,
  width: 640,
  height: 480,
  parent: 'canvasContainer',
  backgroundColor: 'white',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 480 },
    },
  },
  scene: [
    SceneBoot,
    ScenePreloader,
    SceneTitle,
    SceneGame,
  ],
  plugins: {
    scene: [
      {
        key: 'PhaserRaycaster',
        plugin: PhaserRaycaster,
        mapping: 'raycasterPlugin',
      },
    ],
  },
  pixelArt: true,
  roundPixels: true,
};