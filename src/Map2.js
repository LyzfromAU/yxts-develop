import React from 'react';
import Phaser from 'phaser';
import './App.css';
import { useEffect, useState } from 'react';
import allNpc from './data/npc';
import allQuests from './data/quest';
const fs = window.require('fs');


function Map2(props) {

  const [currentNpc, setCurrentNpc] = useState({name: 'fake', location: [30, 210]});
  const [testui, setTestui] = useState('shit');
  const [menu, setMenu] = useState(false);
  const [gameMain, setGameMain] = useState({});
  const [chat, setChat] = useState(false);
  const [desc, setDesc] = useState(false);
  const [fixedX, setFixedX] = useState(30);
  const [fixedY, setFixedY] = useState(210);
  const [questAsk, setQuestAsk] = useState('');
  const [questAns, setQuestAns] = useState('');
  const [questProgress, setQuestProgress] = useState('');
  const [quest, setQuest] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [reward, setReward] = useState([]);
   
  var npcList = allNpc.filter(npc => npc.map === 2);
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
    parent: 'game2',
  };
  
  

  let player;
  let cursors;
  var self;

  function preload ()
  {
    this.load.image("mario-tiles", "assets/tileset1.png");
    for (var i = 0; i < npcList.length; i++) {
      this.load.image(npcList[i].name, npcList[i].image);
    };
    this.load.spritesheet('mummy', 'assets/04_G.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('exit', 'assets/104.png');
  }

  function create ()
  {
    const level = [
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
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
    player = this.physics.add.sprite(parseInt(localStorage.getItem('sceneSwitchX')), parseInt(localStorage.getItem('sceneSwitchY')), 'mummy').setScale(1);
    
    cursors = this.input.keyboard.createCursorKeys();
    console.log(cursors);
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
    self = this;
    setGameMain(self);
    const enterKey = this.input.keyboard.addKey('Enter');
    enterKey.on('down', function() {
      if (findNearestNpc(player.x, player.y) != null){
        setCurrentNpc(findNearestNpc(player.x, player.y));
        localStorage.setItem('currentNpc', findNearestNpc(player.x, player.y).id)
        setMenu(true);
        self.scene.pause();
      }
    })
    player.setCollideWorldBounds(true);
    

    //set up areas for map switch
    let healthGroup = this.physics.add.staticGroup({
        key: 'exit',
        // frameQuantity: 10,
        immovable: true
    });
    
    var children = healthGroup.getChildren();

    children[0].setPosition(180, 0);
    children[0].setSize(120, 60);
    children[0].setOrigin(0, 0);
    children[0].visible = false;
    

    healthGroup.refresh();

    this.physics.add.overlap(player, healthGroup, spriteHitHealth);


    
    
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

  }

  function update(time, delta) {
    const speed = 3;
    // Stop any previous movement from the last frame
    player.body.setVelocity(0);
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
  var game;
  function spriteHitHealth(){
    if (player.y < 70){
      localStorage.setItem('sceneSwitchX', player.x);
      localStorage.setItem('sceneSwitchY', 720 - player.y -30);
      game.destroy();
      props.setscene('Map1'); 
    }
    
  }
  const menuStyles = {
        top: `${fixedY}px`,
        left: `${fixedX}px`
  }

  useEffect(() => {
    // const script = document.createElement('script');
    // script.src = "../script.js";
    // script.async = true;
    // document.body.appendChild(script);
    game = new Phaser.Game(config);
    
    fs.stat('./test.txt', function(e, stat){
        if(e == null){
            setTestui(JSON.parse(fs.readFileSync('./test.txt', {encoding:'utf8', flag:'r'})).name);
        } else if(e.code == 'ENOENT') {
            setTestui(JSON.parse(fs.readFileSync('./build/test.txt', {encoding:'utf8', flag:'r'})).name);
        } else {
            console.log('some other error');
        }
    })
    
    
  }, []);

  useEffect(()=>{
    if(currentNpc.location[1] > 420) {
      setFixedY(currentNpc.location[1] - 260);
    } else {
      setFixedY(currentNpc.location[1]);
    }
    if(currentNpc.location[0] > 900) {
      setFixedX(currentNpc.location[0] - 140);
    } else {
      setFixedX(currentNpc.location[0]);
    }
  },[currentNpc])

  function handleMenuBtnClick(e){
      if(e.target.id === 'chat') {
        setMenu(false);
        setChat(true);  
      } else if (e.target.id === 'description') {
        setMenu(false);
        setDesc(true);
      } else if (e.target.id === 'fight') {
        setMenu(false);
        gameMain.scene.resume();
      } else if (e.target.id === 'quest') {
        var rand = Math.floor(Math.random() * currentNpc.options.filter(option=>option.key === 'quest')[0].quest.length);
        setQuestAsk(currentNpc.options.filter(option=>option.key === 'quest')[0].quest[rand].ask);
        setQuestAns(currentNpc.options.filter(option=>option.key === 'quest')[0].quest[rand].ans);
        var rand1 = Math.random() + 0.5;
        var rand2 = Math.random() + 0.5;
        var rand3 = Math.random() + 0.5;
        var questIdentifier = allQuests[currentNpc.options.filter(option=>option.key === 'quest')[0].questId - 1];
        setReward([rand1 * questIdentifier.pt, rand2 * questIdentifier.money, rand3 * questIdentifier.money]);
        setQuestProgress('ask');
        setQuest(true);
        setMenu(false);
      }
  }

  function handleChatClick(){
    setChat(false);
    gameMain.scene.resume();
  }
  function handleDescClick(){
    setDesc(false);
    gameMain.scene.resume();
  }
  const containerStyles = {
      height: 20,
      width: '50%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: '50px auto'
  }

  const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: 'blue',
      borderRadius: 'inherit',
      textAlign: 'right'
  }
  var questInterval;
  function handleYes(){
    setQuestProgress('ing');
    questInterval = setInterval(()=>{
      setCompleted(completed=>completed + 20);
    }, 800);
  }

  useEffect(()=>{
    if(completed === 100){
      clearInterval(questInterval);
      setQuestProgress('ans');
      setCompleted(0);
    }
  }, [completed]);

  function handleNo(){
    setQuest(false);
    setQuestProgress('');
    gameMain.scene.resume();
  }

  function handleQuestClick(){
    if(questProgress === 'ans') {
      setQuest(false);
      setCheckout(true);
    }
  }
  
  

  return (
    <div className="App" id="game2">
      <div className="testui" id="trash">{testui}</div>
      {menu ? <div className='menu' style={menuStyles}>
          {currentNpc.options != null ? currentNpc.options.map((option)=>{
            return (<button key={option.key} id={option.key} className="menu-btn" onClick={(e)=>handleMenuBtnClick(e)}>{option.text}</button>)
          }) : null}
      </div> : null}
      {chat ? <div className='chat' onClick={handleChatClick}>
        {currentNpc.options != null ? currentNpc.options.filter(option=>option.key === 'chat')[0].content : null}
      </div> : null}
      {desc ? <div className='chat' onClick={handleDescClick}>
        {currentNpc.options != null ? currentNpc.options.filter(option=>option.key === 'description')[0].content : null}
      </div> : null}
      {quest ? <div className='chat' onClick={handleQuestClick}>
        {questProgress === 'ask' ? questAsk : null}
        {questProgress === 'ans' ? questAns : null}
        {questProgress === 'ing' ? <div><div style={containerStyles}>
                                    <div style={fillerStyles}>
                                        
                                    </div>
                                </div><div>干活中....</div></div> : null}
      </div> : null}
      {questProgress === 'ask' ? <div className='yes-or-no'>
        <button className='menu-btn' onClick={handleYes}>是</button>
        <button className='menu-btn' onClick={handleNo}>否</button>
      </div> : null}
      {/* <div className='checkout'>
        <div>任务获得</div>
        <div>{`潜能： ${reward[0]}点`}</div>
        <div>{`金币： ${reward[1]}`}</div>
        <div>{`实战经验： ${reward[2]}点`}</div>
      </div> */}
    </div>
  );
}

export default Map2;
