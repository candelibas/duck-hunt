import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/Constants';

// Sprites
import logoSprite from '../../assets/images/ui/logo.png';
import backgroundSprite from '../../assets/images/environment/background.png';
import treeSprite from '../../assets/images/environment/tree.png';
// Dog
import dogSniff0 from '../../assets/images/dog/sniff/0.png';
import dogSniff1 from '../../assets/images/dog/sniff/1.png';
import dogSniff2 from '../../assets/images/dog/sniff/2.png';
import dogSniff3 from '../../assets/images/dog/sniff/3.png';
import dogSniff4 from '../../assets/images/dog/sniff/4.png';
import dogBarkSprite from '../../assets/images/dog/find/0.png';
import dogJumpSprite0 from '../../assets/images/dog/jump/0.png';
import dogJumpSprite1 from '../../assets/images/dog/jump/1.png';
import duckBlackLeft0 from '../../assets/images/duck/black/left/0.png';
import duckBlackLeft1 from '../../assets/images/duck/black/left/1.png';
import duckBlackLeft2 from '../../assets/images/duck/black/left/2.png';

// Sounds
import menuThemeOgg from '../../assets/sounds/menu_soundtrack.ogg';
import menuThemeMp3 from '../../assets/sounds/menu_soundtrack.mp3';
import introThemeOgg from '../../assets/sounds/intro_theme.ogg';
import introThemeMp3 from '../../assets/sounds/intro_theme.mp3';
import dogBarkSound from '../../assets/sounds/dog_bark.ogg';

export default class Preload extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
    this.background = {};
  }

  preload() {
    this.background.camera = this.cameras.add(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.background.camera.setBackgroundColor('#000000');

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    progressBar.fillStyle(0x222222, 0.8);
    progressBox.fillRect(28, 185, 242, 50);

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "About to be real!",
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#fffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.scene.start('Menu');

      console.log("loading done" + width);
    });

    // Sprites
    this.load.image('logo', logoSprite);
    this.load.image('background', backgroundSprite);
    this.load.image('tree', treeSprite);
    this.load.image('dogsniff0', dogSniff0);
    this.load.image('dogsniff1', dogSniff1);
    this.load.image('dogsniff2', dogSniff2);
    this.load.image('dogsniff3', dogSniff3);
    this.load.image('dogsniff4', dogSniff4);
    this.load.image('dog_bark', dogBarkSprite);
    this.load.image('dog_jump0', dogJumpSprite0);
    this.load.image('dog_jump1', dogJumpSprite1);
    this.load.image('duck_black_left0', duckBlackLeft0);
    this.load.image('duck_black_left1', duckBlackLeft1);
    this.load.image('duck_black_left2', duckBlackLeft2);

    // Sounds
    this.load.audio('menu_theme', [menuThemeMp3, menuThemeOgg]);
    this.load.audio('intro_theme', [introThemeMp3, introThemeOgg]);
    this.load.audio('dog_bark_sound', dogBarkSound);


  }

  create() {
    console.log("Preload scene");
  }
}