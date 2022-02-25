import React from 'react';
import Phaser from 'phaser';
import './App.css';
import { useEffect, useState } from 'react';
const fs = window.require('fs');
const path = window.require('path');


function Map1() {

  const [testui, setTestui] = useState('shit');
   
  var npcList = [
    {
      name: '段誉',
      image: 'assets/12.png',
      location: [150, 150]
    },
    {
      name: '穆念慈',
      image: 'assets/28.png',
      location: [330, 570]
    },
    {
      name: '武三通',
      image: 'assets/29.png',
      location: [810, 390]
    }
    
  ];
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

  

  let player;
  let cursors;

  function preload ()
  {
    this.load.image("mario-tiles", "assets/tileset1.png");
    for (var i = 0; i < npcList.length; i++) {
      this.load.image(npcList[i].name, npcList[i].image);
    };
    this.load.spritesheet('mummy', 'assets/04_G.png', { frameWidth: 32, frameHeight: 48 });
  }

  function create ()
  {
    const level = [
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1] 
    ];
  
    // When loading from an array, make sure to specify the tileWidth and tileHeight
    const map = this.make.tilemap({ data: level, tileWidth: 60, tileHeight: 60 });
    const tiles = map.addTilesetImage("mario-tiles");
    const layer = map.createLayer(0, tiles, 0, 0);
    player = this.physics.add.sprite(30, 210, 'mummy').setScale(1);
    cursors = this.input.keyboard.createCursorKeys();
    for (var i = 0; i < npcList.length; i++) {
      this.add.image(npcList[i].location[0], npcList[i].location[1], npcList[i].name).setScale(0.5);
      this.make.text({
        x: npcList[i].location[0],
        y: npcList[i].location[1] - 30,
        text: npcList[i].name,
        origin: { x: 0.5, y: 0.5 },
        style: {
            font: 'bold 18px Arial',
            fill: 'blue',
        },
      });
    };
    this.physics.add.collider(player, layer);
    layer.setCollisionBetween(1, 1);
    const enterKey = this.input.keyboard.addKey('Enter');
    enterKey.on('down', function() {
      if (findNearestNpc(player.x, player.y) != null){
        alert(findNearestNpc(player.x, player.y).name);
      }
    })
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
  }

  function findNearestNpc(x, y){
    return npcList.filter(npc => Math.sqrt((npc.location[0] - x)**2 + (npc.location[1] - y)**2) <= 100)[0];
  }
  
  useEffect(() => {
    // const script = document.createElement('script');
  
    // script.src = "../script.js";
    // script.async = true;
  
    // document.body.appendChild(script);
    
    const game = new Phaser.Game(config);
    let testJson = {
      name: 'cnm',
      level: 23
    }
    let pathname = path.join(__dirname, 'test.txt');
    console.log(pathname);
    fs.writeFile('./test.txt', JSON.stringify(testJson), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    
    
    
  
    // return () => {
    //   document.body.removeChild(script);
    // }
    
  }, []);
  return (
    <div className="App" id="game">
      <div className="testui" id="trash">{testui}</div>
      
    </div>
  );
}

export default Map1;
