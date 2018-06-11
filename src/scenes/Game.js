import Phaser from 'phaser';


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
    
    // TODO: Add animation by image sequence: http://labs.phaser.io/edit.html?src=src\animation\animation%20from%20png%20sequence.js
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

    const dogSniff = this.add.sprite(0, 530, 'dogsniff0').play('dogsniff');

    this.tweens.add({
      targets: dogSniff,
      x: 400,
      duration: 7000,
      ease: 'Power2',
      loop: 0,
      onComplete: () => {
        // Activate dog jumping sprite
      }
    });
  }

  missShot() {
    
  }
}