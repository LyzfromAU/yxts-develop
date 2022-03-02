import React from 'react';
import './Battle.css';
import { useEffect, useState } from 'react';
import './Battle.css';
import allNpc from './data/npc';
import allSkills from './data/skill';
const fs = window.require('fs');



function Battle() {

  const [turn, setTurn] = useState('');
  const [round, setRound] = useState(1);
  const [text, setText] = useState('');
  const skills = JSON.parse(fs.readFileSync('./skillset.txt', {encoding:'utf8', flag:'r'})).skill;
  const [playerHp, setPlayerHp] = useState(70);
  const [enemyHp, setEnemyHp] = useState(40);
  const [playerMp, setPlayerMp] = useState(30);
  const player = {
      maxHp: localStorage.getItem('maxHp'),
      maxMp: localStorage.getItem('maxMp'),
      ap: localStorage.getItem('ap'),
      crit: localStorage.getItem('crit'),
      critDmg: localStorage.getItem('critDmg'),
      defence: localStorage.getItem('defence'),
      evade: localStorage.getItem('evade'),
      echo: localStorage.getItem('echo'),
      name: localStorage.getItem('name')
  }
  const enemy = allNpc.find(npc => npc.id == localStorage.getItem('currentNpc'));
  const normalAttackSkill = allSkills.find(x => x.id == localStorage.getItem('currentNormalAttackSkill'));
  



  const playerAttack = () => {
    if(Math.random() < enemy.evade/100) {
        setText(`${player.name}使出${normalAttackSkill.name}攻击${enemy.name}，但是${enemy.name}${enemy.evadeText}`)
    } else {
        if(Math.random() < player.crit/100) {
            setText(`${player.name}使出${normalAttackSkill.name}攻击${enemy.name}，对${enemy.name}造成${(normalAttackSkill.baseDmgRate*player.ap + normalAttackSkill.baseDmgConst)*((1 + normalAttackSkill.growth)**skills.find(x => x.id == localStorage.getItem('currentNormalAttackSkill')).level)*player.critDmg}点暴击伤害`);
        } else {
            setText(`${player.name}使出${normalAttackSkill.name}攻击${enemy.name}，对${enemy.name}造成${(normalAttackSkill.baseDmgRate*player.ap + normalAttackSkill.baseDmgConst)*((1 + normalAttackSkill.growth)**skills.find(x => x.id == localStorage.getItem('currentNormalAttackSkill')).level)}点伤害`);
        }
    }

  }
  const playerBreath = () => {

  }
  const playerUseConcealed = () => {

  }
  const playerUltimate = () => {

  }
  const playerFlee = () => {

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
      <div className="fight-option-section">
          <button className="btn-fight-option" onClick={playerAttack}>攻击</button>
          <button className="btn-fight-option" onClick={playerBreath}>吸气</button>
          <button className="btn-fight-option" onClick={playerUseConcealed}>暗器</button>
          <button className="btn-fight-option" onClick={playerUltimate}>绝招</button>
          <button className="btn-fight-option" onClick={playerFlee}>逃跑</button>
      </div>
      
    </div>
  );
}

export default Battle;