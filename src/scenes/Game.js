import Phaser from 'phaser';

import { GAME_WIDTH, GAME_HEIGHT } from '../config/Constants';


export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  create() {
    console.log("Game scene bruh");

    let introTheme = this.sound.add('intro_theme');
    this.sound.stopAll(); // prevent menu theme playing
    introTheme.play();
    introTheme.on('stop', () => {
      console.log("introtheme complete");
    }, this);

    this.createEnvironment();

    this.addDogSniffAnimation();

    // Show and Calculate the score when the camera flashes, and hide it when it completes
    this.cameras.main.on('cameraflashstart', (cam, fx, duration) => {
      //logo.setVisible(true);
    });

    this.cameras.main.on('cameraflashcomplete', () => {
      //logo.setVisible(false);
    });

    //  Every time you click, shake the camera
    this.input.on('pointerdown', function () {
      this.cameras.main.flash();
      //this.cameras.main.shake(70);
    }, this);

    // TODO: Add duck movement https://labs.phaser.io/view.html?src=src\tweens\timelines\simple%20timeline%206.js
  }

  createEnvironment() {
    let tree = this.add.image(150, 380, 'tree');
    let background = this.add.image(400, 300, 'background');
  }

  addDogSniffAnimation() {
    this.anims.create({
      key: 'dogsniff',
      frames: [
        { key: 'dogsniff0' },
        { key: 'dogsniff1' },
        { key: 'dogsniff2' },
        { key: 'dogsniff3' },
        { key: 'dogsniff4', duration: 50 }
      ],
      frameRate: 10,
      repeat: -1
    });

    let dogSniff = this.add.sprite(0, 530, 'dogsniff0').play('dogsniff');

    this.tweens.add({
      targets: dogSniff,
      x: GAME_WIDTH / 2,
      duration: 6000,
      ease: 'Power2',
      loop: 0,
      onComplete: () => {
        // Activate dog jump sprite & bark sound
        let dogBarkSound = this.sound.add('dog_bark_sound');
        dogBarkSound.play();
        dogSniff.destroy();

        let dogBark = this.add.image(GAME_WIDTH / 2, 530, 'dog_bark');

        dogBarkSound.once('ended', () => {
          dogBark.destroy();
          this.addDogJumpAnimation();
        });
      }
    });
  }

  addDogJumpAnimation() {
    this.anims.create({
      key: 'dog_jump',
      frames: [
        { key: 'dog_jump0', duration: 200 },
        { key: 'dog_jump1', duration: 500 }
      ],
      frameRate: 2,
      repeat: -1
    });

    let dogJump = this.add.sprite(GAME_WIDTH / 2, 540, 'dog_jump0').play('dog_jump');

    this.tweens.add({
      targets: dogJump,
      y: 400,
      duration: 500,
      ease: 'Power2',
      yoyo: true,
      loop: 0,
      onYoyo: () => {
        dogJump.setDepth(-1);
      },
      onComplete: () => {
        this.spawnDuck();
      }
    });
  }

  spawnDuck() {
    let ducks = ['black', 'red'];
    // TODO: random the ducks


    this.anims.create({
      key: 'duck_black_left',
      frames: [
        { key: 'duck_black_left0' },
        { key: 'duck_black_left1' },
        { key: 'duck_black_left2' }
      ],
      frameRate: 10,
      repeat: -1
    });

    let duck = this.add.sprite(GAME_WIDTH / 2, 400, 'duck_black_left0').play('duck_black_left');

    this.tweens.timeline({
      targets: duck,
      ease: 'Linear',
      duration: 2000,
      tweens: [
        {
          x: 600
        },
        {
          y: 500,
          offset: '-=1000'
        },
        {
          x: 100,
          offset: '-=1000'
        },
        {
          y: 100,
          offset: '-=1000'
        }
      ]

    });

  }

  hitDuck() {

  }

  missedShot() {

  }

  gameOver() {

  }

  levelFinished() {

  }
}