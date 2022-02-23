import React from 'react';
import Phaser from 'phaser';
import './App.css';

function App() {

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    this.load.image("mario-tiles", "assets/test-tileset.png");
  }

  function create ()
  {
    const level = [
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
      [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0 ],
      [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0 ],
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
      [  0,   0,   0,  14,  13,  14,   0,   0,   0,   0,   0 ],
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
      [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15 ],
      [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15 ],
      [ 35,  36,  37,   0,   0,   0,   0,   0,  15,  15,  15 ],
      [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ]
    ];
  
    // When loading from an array, make sure to specify the tileWidth and tileHeight
    const map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64 });
    const tiles = map.addTilesetImage("mario-tiles");
    const layer = map.createLayer(0, tiles, 0, 0);
    player = this.physics.add.sprite(400, 350, "atlas", "misa-front");
    cursors = this.input.keyboard.createCursorKeys();
  }

  function update(time, delta) {
    const speed = 175;
    // Stop any previous movement from the last frame
    player.body.setVelocity(0);
  
    // Horizontal movement
    if (cursors.left.isDown) {
      player.body.setVelocityX(-100);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(100);
    }
  
    // Vertical movement
    if (cursors.up.isDown) {
      player.body.setVelocityY(-100);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(100);
    }
  
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);
  }
  return (
    <div className="App" id="game">
      <div className="testui">shit</div>
      
    </div>
  );
}

export default App;
