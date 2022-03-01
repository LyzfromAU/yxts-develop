import React from 'react';
import './Battle.css';
import { useEffect, useState } from 'react';
import './Battle.css';
const fs = window.require('fs');



function Battle() {

  const [turn, setTurn] = useState('');
  const [round, setRound] = useState(1);
  const [text, setText] = useState('');
  const skillset = JSON.parse(fs.readFileSync('./skillset.txt', {encoding:'utf8', flag:'r'}));
  const ultimates = skillset.ultimate;
  const darks = skillset.dark;
  const enemyPortrait = localStorage.getItem('currentNpcPortrait');
  const playerMaxHp = localStorage.getItem('maxHp');
  const playerMaxMp = localStorage.getItem('maxMp');
  const [playerHp, setPlayerHp] = useState(70);
  const [enemyHp, setEnemyHp] = useState(40);
  const [playerMp, setPlayerMp] = useState(30);



  const playerAttack = () => {

  }
  const playerHpBarStyles = {
      height: 20,
      width: 300,
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: '50px auto'
  }
  const enemyHpBarStyles = {
      height: 20,
      width: 300,
      backgroundColor: "red",
      borderRadius: 50,
      margin: '50px auto'
  }
  const playerHpBarFillerStyles = {
      height: '100%',
      width: `${playerHp}%`,
      backgroundColor: 'red'
  }
  const enemyHpBarFillerStyles = {
      height: '100%',
      width: `${100 - enemyHp}%`,
      backgroundColor: '#e0e0de'
  }
  const playerMpBarStyles = {
      height: 20,
      width: 300,
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: '50px auto'
  }
  const enemyMpBarStyles = {
      height: 20,
      width: 300,
      backgroundColor: "blue",
      borderRadius: 50,
      margin: '50px auto'
  }
  const playerMpBarFillerStyles = {
      height: '100%',
      width: `${playerMp}%`,
      backgroundColor: 'blue'
  }
  const enemyMpBarFillerStyles = {
      height: '100%',
      width: 0,
      backgroundColor: '#e0e0de'
  }
  


   
  
  useEffect(() => { 
    
  }, []);
  return (
    <div className='battle'>
      <div className='player-portrait'></div>
      <img src={enemyPortrait} alt="enemy" className='enemy-portrait' />
      <div className='battle-text'>

      </div>
      <div style={playerHpBarStyles} className='playerHp'>
          <div style={playerHpBarFillerStyles} className='playerFiller'>  
          </div>
      </div>
      <div style={enemyHpBarStyles} className='enemyHp'>
          <div style={enemyHpBarFillerStyles} className='playerFiller'>  
          </div>
      </div>
      <div style={playerMpBarStyles} className='playerMp'>
          <div style={playerMpBarFillerStyles} className='playerFiller'>  
          </div>
      </div>
      <div style={enemyMpBarStyles} className='enemyMp'>
          <div style={enemyMpBarFillerStyles} className='playerFiller'>  
          </div>
      </div>
      
    </div>
  );
}

export default Battle;