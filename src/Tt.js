import React from 'react';
import { useState } from 'react';
import './LogIn.css';
const fs = window.require('fs');


function Tt(props){

    const [name, setName] = useState('');
    const nullPlayerJson = {
        name: '',
        level: 1
    }

    const startGame = () => {
        if(name.length > 0 && name.length < 7) {
            fs.writeFile('./test.txt', JSON.stringify({...nullPlayerJson, name: name}), function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            
            // setInterval(()=>{
            //     setCompleted(completed=>completed + 20);
            // }, 600);
            // setTimeout(()=>{
            //    props.setscene('Map1'); 
            // }, 3000);
            
        } else {
            alert('请输入名字，最多6个字');
        }
    }
    
    return(
        <div className='login-page'>
            <div className='homepage-title'>钻石英雄坛说</div>
            <div className='register-section'>
                <div>
                    <label className='homepage-label'>请输入名字</label>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="name-input" />
                </div>
                <button onClick={startGame} className="btn-start">开始游戏</button>
            </div>
            
        </div>
    )
};

export default Tt