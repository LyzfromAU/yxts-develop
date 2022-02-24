import React from 'react';
import Phaser from 'phaser';
import './App.css';

function App() {

  const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    parent: 'game',
  };

  const game = new Phaser.Game(config);

  let player;
  let cursors;

  function preload ()
  {
    this.load.image("mario-tiles", "assets/scene1big.png");
    this.load.spritesheet('mummy', 'assets/04_G.png', { frameWidth: 32, frameHeight: 48 });
  }

  function create ()
  {
    const level = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15, 16, 17],
      [18, 19, 20, 21, 22, 23, 24, 25, 26],
      [27, 28, 29, 30, 31, 32, 33, 34, 35],
      [36, 37, 38, 39, 40, 41, 42, 43, 44],
      [45, 46, 47, 48, 49, 50, 51, 52, 53]
    ];
  
    // When loading from an array, make sure to specify the tileWidth and tileHeight
    const map = this.make.tilemap({ data: level, tileWidth: 60, tileHeight: 60 });
    const tiles = map.addTilesetImage("mario-tiles");
    const layer = map.createLayer(0, tiles, 0, 0);
    player = this.physics.add.sprite(500, 300, 'mummy').setScale(1);
    cursors = this.input.keyboard.createCursorKeys();
    const walkDownAnim = this.anims.create({
        key: 'walk-down',
        frames: this.anims.generateFrameNumbers('mummy', { frames: [1, 2, 3, 0] }),
        frameRate: 16
    });
    const walkUpAnim = this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('mummy', { frames: [13, 14, 15, 12] }),
      frameRate: 16
    });
    const walkLeftAnim = this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('mummy', { frames: [5, 6, 7, 4] }),
      frameRate: 16
    });
    const walkRightAnim = this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('mummy', { frames: [9, 10, 11, 8] }),
      frameRate: 16
    });

    // sprite.play({ key: 'walk', repeat: Infinity });
  }

  function update(time, delta) {
    const speed = 3;
    // Stop any previous movement from the last frame
    player.body.setVelocity(0);
    // // Horizontal movement
    if (cursors.left.isDown) {
      player.body.setVelocityX(-100*speed);
      !player.anims.isPlaying && player.anims.play('walk-left', true);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(100*speed);
      !player.anims.isPlaying && player.anims.play('walk-right', true);
    }
  
    // Vertical movement
    if (cursors.up.isDown) {
      player.body.setVelocityY(-100*speed);
      !player.anims.isPlaying && player.anims.play('walk-up', true);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(100*speed);
      !player.anims.isPlaying && player.anims.play('walk-down', true);
    }
  
    // // Normalize and scale the velocity so that player can't move faster along a diagonal
    // player.body.velocity.normalize().scale(speed);
  }
  return (
    <div className="App" id="game">
      <div className="testui">shit</div>
      
    </div>
  );
}

export default App;
