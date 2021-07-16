import Phaser from 'phaser';

export default class ScenePreloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }

  preload() {
    const logo = this.add.image(this.game.config.width * 0.5, 150, 'jcco-logo');
    logo.setScale(0.7);

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    progressBox.y = 50;
    progressBox.x = -85;
    progressBar.y = 50;
    progressBar.x = -85;

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 25,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      // eslint-disable-next-line radix
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(1500, this.ready, [], this);


    this.load.audio('sndBtnDown', 'src/assets/sounds/sndBtnDown.wav');
    this.load.audio('kill1', 'src/assets/sounds/impactsplat01.mp3');
    this.load.audio('kill2', 'src/assets/sounds/impactsplat02.mp3');
    this.load.audio('kill3', 'src/assets/sounds/impactsplat03.mp3');
    this.load.audio('kill4', 'src/assets/sounds/impactsplat04.mp3');
    this.load.audio('kill5', 'src/assets/sounds/impactsplat05.mp3');
    this.load.audio('hurt', 'src/assets/sounds/Playersounds - Track 9 - Jump.wav');

    this.load.image('title', 'src/assets/title.png');
    this.load.image('startBtn', 'src/assets/gui/Start_BTN.png');
    this.load.image('sky', 'src/assets/sky.png');
    this.load.image('far-ground', 'src/assets/far-grounds.png');
    this.load.image('ground', 'src/assets/tile.png');
    this.load.image('bullet', 'src/assets/bullet.png');
    this.load.image('center-plataform', 'src/assets/plataform_tile.png');
    this.load.image('small-left-plataform', 'src/assets/small-left-tile.png');
    this.load.image('tall-plataform', 'src/assets/tall-plataform.png');
    this.load.image('small-plataform', 'src/assets/small-tile.png');
    this.load.image('long-plataform', 'src/assets/longer-tile.png');
    this.load.image('health-bar', 'src/assets/Health_Bar_Table.png');
    this.load.image('health-dot', 'src/assets/Health_Dot.png');


    this.load.spritesheet('sprExplosion', 'src/assets/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('Explosion', 'src/assets/Explosion.png', {
      frameWidth: 96,
      frameHeight: 96,
    });

    this.load.spritesheet('gunner-red-idle-right', 'src/assets/characters/Gunner_Red_Idle_right.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-red-idle-left', 'src/assets/characters/Gunner_Red_Idle_left.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-red-run-right', 'src/assets/characters/Gunner_Red_Run_right.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-red-run-left', 'src/assets/characters/Gunner_Red_Run_left.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-red-jump-right', 'src/assets/characters/Gunner_Red_Jump_right.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-red-jump-left', 'src/assets/characters/Gunner_Red_Jump_left.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-red-death-right', 'src/assets/characters/Gunner_Red_Death_right.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-red-death-left', 'src/assets/characters/Gunner_Red_Death_left.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-red-crouch-right', 'src/assets/characters/Gunner_Red_Crouch_right.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-red-crouch-left', 'src/assets/characters/Gunner_Red_Crouch_left.png', {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet('gunner-blue-idle-right', 'src/assets/characters/Gunner_Blue_Idle_right.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-blue-idle-left', 'src/assets/characters/Gunner_Blue_Idle_left.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-blue-run-right', 'src/assets/characters/Gunner_Blue_Run_right.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-blue-run-left', 'src/assets/characters/Gunner_Blue_Run_left.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-blue-jump-right', 'src/assets/characters/Gunner_Blue_Jump_right.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-blue-jump-left', 'src/assets/characters/Gunner_Blue_Jump_left.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-blue-death-right', 'src/assets/characters/Gunner_Blue_Death_right.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-blue-death-left', 'src/assets/characters/Gunner_Blue_Death_left.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-blue-crouch-right', 'src/assets/characters/Gunner_Blue_Crouch_right.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('gunner-blue-crouch-left', 'src/assets/characters/Gunner_Blue_Crouch_left.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: 'Explosion',
      frames: this.anims.generateFrameNumbers('Explosion'),
      frameRate: 20,
      repeat: 0,
    });


    this.anims.create({
      key: 'gunner-red-idle-right-anim',
      frames: this.anims.generateFrameNames('gunner-red-idle-right'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-red-idle-left-anim',
      frames: this.anims.generateFrameNames('gunner-red-idle-left'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-red-run-right-anim',
      frames: this.anims.generateFrameNames('gunner-red-run-right'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-red-run-left-anim',
      frames: this.anims.generateFrameNames('gunner-red-run-left'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-red-jump-right-anim',
      frames: this.anims.generateFrameNames('gunner-red-jump-right'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-red-jump-left-anim',
      frames: this.anims.generateFrameNames('gunner-red-jump-left'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-red-death-right-anim',
      frames: this.anims.generateFrameNames('gunner-red-death-right'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-red-death-left-anim',
      frames: this.anims.generateFrameNames('gunner-red-death-left'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-red-crouch-right-anim',
      frames: this.anims.generateFrameNames('gunner-red-crouch-right'),
      frameRate: 20,
      repeat: 1,
    });
    this.anims.create({
      key: 'gunner-red-crouch-left-anim',
      frames: this.anims.generateFrameNames('gunner-red-crouch-left'),
      frameRate: 20,
      repeat: 1,
    });


    this.anims.create({
      key: 'gunner-blue-idle-right-anim',
      frames: this.anims.generateFrameNames('gunner-blue-idle-right'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-blue-idle-left-anim',
      frames: this.anims.generateFrameNames('gunner-blue-idle-left'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-blue-run-right-anim',
      frames: this.anims.generateFrameNames('gunner-blue-run-right'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-blue-run-left-anim',
      frames: this.anims.generateFrameNames('gunner-blue-run-left'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-blue-jump-right-anim',
      frames: this.anims.generateFrameNames('gunner-blue-jump-right'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-blue-jump-left-anim',
      frames: this.anims.generateFrameNames('gunner-blue-jump-left'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-blue-death-right-anim',
      frames: this.anims.generateFrameNames('gunner-blue-death-right'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-blue-death-left-anim',
      frames: this.anims.generateFrameNames('gunner-blue-death-left'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'gunner-blue-crouch-right-anim',
      frames: this.anims.generateFrameNames('gunner-blue-crouch-right'),
      frameRate: 20,
    });
    this.anims.create({
      key: 'gunner-blue-crouch-left-anim',
      frames: this.anims.generateFrameNames('gunner-blue-crouch-left'),
      frameRate: 20,
    });
  }
}