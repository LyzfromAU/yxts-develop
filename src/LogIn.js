import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './LogIn.css';
const fs = window.require('fs');





function LogIn(props) {

    const [player, setPlayer] = useState({});
    const [continueEnable, setContinueEnable] = useState(true);
    const nullPlayerJson = {
        name: '',
        level: 1
    }

    var initialData = {};
    function newGame(){
        if (player.name !=''){
            
                props.setscene('NameInput');    
            
        } else {
            props.setscene('NameInput');
        }
    }

    

    function resumeGame(){
        props.setscene('Map1');
    }

    
    useEffect(()=>{
        fs.stat('./test.txt', function(e, stat){
            if(e == null){
                setPlayer(JSON.parse(fs.readFileSync('./test.txt', {encoding:'utf8', flag:'r'})));
            } else if(e.code == 'ENOENT') {
                setPlayer(JSON.parse(fs.readFileSync('./build/test.txt', {encoding:'utf8', flag:'r'})));
            } else {
                console.log('some other error');
            }
        })
        
           

    },[])

    useEffect(()=>{
        if(player.name === ''){
            setContinueEnable(false);
        }
    }, [player])
    
    return (
        <div className='login-page'>
            <div className='homepage-title'>钻石英雄坛说</div>
            <div>
                <button onClick={newGame} className="btn-start">新游戏</button><br></br>
                <button className="btn-start" onClick={resumeGame} disabled={continueEnable ? false : true}>继续游戏</button>
            </div>  
        </div>
    )
}

export default LogIn
