import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/Constants';

export default class Menu extends Phaser.Scene {

  constructor() {
    super({ key: 'Menu' });

    this.background = {};
    this.logo = null;
  }

  preload() {
    let menuPlayText = this.make.text({
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2 + 150,
      text: 'Tap screen to Play!',
      style: {
        font: '38px monospace',
        fill: '#ffffff'
      }
    });
    menuPlayText.setOrigin(0.5, 0.5).setAlpha(0);

    this.tweens.add({
      targets: menuPlayText,
      alpha: { value: 1.0, duration: 1000, ease: 'Power1' },
      yoyo: true,
      loop: -1
    });
  }

  create() {
    this.background.camera = this.cameras.add(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.background.camera.setBackgroundColor('#000000');

    this.logo = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100, 'logo').setScale(0.4);
    
    let menuTheme = this.sound.add('menu_theme');
    menuTheme.play();

    this.input.once('pointerup', (event) => {

      console.log('From Menu to Game');

      this.scene.transition({
        target: 'Game',
        duration: 1000,
        moveBelow: true,
        onUpdate: this.transitionOut,
        data: { x: 400, y: 300 }
      });

    }, this);
  }

  transitionOut (progress) {
    this.logo.y = (600 * progress);
  }
}