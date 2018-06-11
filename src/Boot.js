import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from './config/Constants';

// Scenes
import Preload from './scenes/Preload';
import Game from './scenes/Game';
import Menu from './scenes/Menu';

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  scene: [Preload, Game, Menu], // load scenes
  backgroundColor: '#6ABBFF'
};

new Phaser.Game(config);

// This is for preventing re-run multiple scenes
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}