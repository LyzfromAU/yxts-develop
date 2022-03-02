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
  const skills = JSON.parse(fs.readFileSync('./skillset.txt', {encoding:'utf8', flag:'r'})).skills;
  const [playerHp, setPlayerHp] = useState(0);
  const [enemyHp, setEnemyHp] = useState(0);
  const [playerMp, setPlayerMp] = useState(0);
  const [playerDmgDisplay, setPlayerDmgDisplay] = useState('');
  const [enemyDmgDisplay, setEnemyDmgDisplay] = useState('');
  const [isCrit, setIsCrit] = useState(false);
  const [isEvaded, setIsEvaded] = useState(false);
  const [isCritEnemy, setIsCritEnemy] = useState(false);
  const [isEvadedEnemy, setIsEvadedEnemy] = useState(false);
  const [optionVisible, setOptionVisible] = useState(true);
  const player = {
      maxHp: localStorage.getItem('maxHp'),
      maxMp: localStorage.getItem('maxMp'),
      ap: localStorage.getItem('ap'),
      crit: localStorage.getItem('crit'),
      critDmg: localStorage.getItem('critDmg'),
      defence: localStorage.getItem('defence'),
      echo: localStorage.getItem('echo'),
      name: localStorage.getItem('name')
  }
  const enemy = allNpc.find(npc => npc.id == localStorage.getItem('currentNpc'));
  const normalAttackSkill = allSkills.find(x => x.id == localStorage.getItem('currentNormalAttackSkill'));
  const lightSkill = allSkills.find(x => x.id == localStorage.getItem('currentLightSkill'));
  



  const playerAttack = () => {
    setOptionVisible(false);
    if(Math.random() < enemy.evade/100) {
        setText(`你使出${normalAttackSkill.name}攻击${enemy.name}，但是${enemy.name}${enemy.evadeText}`);
        setIsEvaded(true);
    } else {
        if(Math.random() < player.crit/100) {
            var rand = Math.random()*0.4 + 0.8;
            var dmg = ((normalAttackSkill.baseDmgRate*player.ap + normalAttackSkill.baseDmgConst)*((1 + normalAttackSkill.growth)**skills.find(x => x.id == localStorage.getItem('currentNormalAttackSkill')).level)*player.critDmg/100*rand).toFixed(0);
            setText(`你使出${normalAttackSkill.name}攻击${enemy.name}，对${enemy.name}造成${dmg}点暴击伤害`);
            setEnemyDmgDisplay(`-${dmg}`);
            setIsCrit(true);
            setEnemyHp(enemyHp - dmg);
        } else {
            var rand = Math.random()*0.4 + 0.8;
            var dmg = ((normalAttackSkill.baseDmgRate*player.ap + normalAttackSkill.baseDmgConst)*((1 + normalAttackSkill.growth)**skills.find(x => x.id == localStorage.getItem('currentNormalAttackSkill')).level)*rand).toFixed(0);
            setText(`你使出${normalAttackSkill.name}攻击${enemy.name}，对${enemy.name}造成${dmg}点伤害`);
            setEnemyDmgDisplay(`-${dmg}`);
            setEnemyHp(enemyHp - dmg);
        }
    }
    setTimeout(()=>{
        setEnemyDmgDisplay('');
        setIsCrit(false);
        setIsEvaded(false);
    }, 800);
    setTimeout(()=>{
        enemyAttack();
    }, 2000);

  }
  const playerBreath = () => {

  }
  const playerUseConcealed = () => {

  }
  const playerUltimate = () => {

  }
  const playerFlee = () => {

  }

  const enemyAttack = () => {
    if (enemyHp/enemy.maxHp < enemy.emergencySkill[0].percentage/100) {
        var enemyEmergency = allSkills.find(x => x.id == enemy.emergencySkill[0].id);
        var rand = Math.random()*0.4 + 0.8;
        var dmg = (enemy.ap*enemyEmergency.baseDmgRate + enemyEmergency.baseDmgConst)*((1 + enemyEmergency.growth)**255).toFixed(0);
        setText(`${enemy.name}情急之下使出${enemyEmergency.name}，对你造成${dmg}点伤害`);
        setPlayerDmgDisplay(`-${dmg}`);
        setIsCritEnemy(true);
        if (playerHp - dmg >= 0){
            setPlayerHp(playerHp - dmg);
        } else {
            setPlayerHp(0);
        }
    } else {
        var playerEvade = lightSkill.baseEvadeRate*((1 + lightSkill.growth)**skills.find(x => x.id == localStorage.getItem('currentLightSkill')).level)/100
        if(Math.random() < playerEvade) {
            setText(`${enemy.name}${enemy.attackText}，但是${player.name}使出${lightSkill.name}躲开了`);
            setIsEvadedEnemy(true);
        } else {
            if(Math.random() < enemy.crit/100) {
                var rand = Math.random()*0.4 + 0.8;
                var dmg = (enemy.ap*enemy.critDmg/100*rand).toFixed(0);
                setText(`${enemy.name}${enemy.attackText}，对你造成${dmg}点暴击伤害`);
                setPlayerDmgDisplay(`-${dmg}`);
                setIsCritEnemy(true);
                if (playerHp - dmg >= 0){
                    setPlayerHp(playerHp - dmg);
                } else {
                    setPlayerHp(0);
                }
                
            } else {
                var rand = Math.random()*0.4 + 0.8;
                var dmg = (enemy.ap*rand).toFixed(0);
                setText(`${enemy.name}${enemy.attackText}，对你造成${dmg}点伤害`);
                setPlayerDmgDisplay(`-${dmg}`);
                if (playerHp - dmg >= 0){
                    setPlayerHp(playerHp - dmg);
                } else {
                    setPlayerHp(0);
                }
            }
        }
    }
    
    setTimeout(()=>{
        setPlayerDmgDisplay('');
        setIsCritEnemy(false);
        setIsEvadedEnemy(false);
    }, 800);
    setTimeout(()=>{
        setText('');
        setOptionVisible(true);
    }, 2000);
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
      width: `${playerHp*100/player.maxHp}%`,
      backgroundColor: 'red'
  }
  const enemyHpBarFillerStyles = {
      height: '100%',
      width: `${100 - enemyHp*100/enemy.maxHp}%`,
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
    setPlayerHp(player.maxHp);
    setPlayerMp(player.maxMp);
    setEnemyHp(enemy.maxHp);
  }, []);
  return (
    <div className='battle'>
      <div className='player-portrait'></div>
      <img src={enemy.image} alt="enemy" className='enemy-portrait' />
      <div className='battle-text'>
          {text}
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
      {optionVisible ? <div className="fight-option-section">
          <button className="btn-fight-option" onClick={playerAttack}>攻击</button>
          <button className="btn-fight-option" onClick={playerBreath}>吸气</button>
          <button className="btn-fight-option" onClick={playerUseConcealed}>暗器</button>
          <button className="btn-fight-option" onClick={playerUltimate}>绝招</button>
          <button className="btn-fight-option" onClick={playerFlee}>逃跑</button>
      </div> : null}
      {(enemyDmgDisplay != '') && (!isEvaded) ? <div className={isCrit ? 'enemy-dmg-display-crit' : 'enemy-dmg-display'}>
        {enemyDmgDisplay}
      </div> : null}
      {(playerDmgDisplay != '') && (!isEvadedEnemy) ? <div className={isCritEnemy ? 'player-dmg-display-crit' : 'player-dmg-display'}>
        {playerDmgDisplay}
      </div> : null}
      
      
    </div>
  );
}

export default Battle;