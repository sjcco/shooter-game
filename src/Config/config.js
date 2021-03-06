import Phaser from 'phaser';
import PhaserRaycaster from 'phaser-raycaster';
import SceneBoot from '../Scenes/SceneBoot';
import ScenePreloader from '../Scenes/ScenePreloader';
import SceneTitle from '../Scenes/SceneTitle';
import SceneGame from '../Scenes/SceneGame';
import SceneGameOver from '../Scenes/SceneGameOver';
import SceneLeaderBoard from '../Scenes/SceneLeaderBoard';

export default {
  type: Phaser.WEBGL,
  width: 640,
  height: 480,
  parent: 'canvasContainer',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  backgroundColor: 'white',
  dom: {
    createContainer: true,
  },
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
    SceneGameOver,
    SceneLeaderBoard,
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