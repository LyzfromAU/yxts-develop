import React from 'react';
import './Battle.css';
import { useEffect, useState } from 'react';
const fs = window.require('fs');



function Battle() {

  const [turn, setTurn] = useState('');
  const [round, setRound] = useState(1);
  const [text, setText] = useState('');
  const skillset = JSON.parse(fs.readFileSync('./skillset.txt', {encoding:'utf8', flag:'r'}));
  const ultimates = skillset.ultimate;
  const darks = skillset.dark;
  


   
  
  useEffect(() => { 
    setPlayer
    
  }, []);
  return (
    <>
    {sceneTag}
    </>
  );
}

export default Battle;