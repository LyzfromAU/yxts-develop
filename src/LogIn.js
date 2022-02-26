import React from 'react';
import { useState, useEffect } from 'react';
import './LogIn.css';
const fs = window.require('fs');


function LogIn(props) {

    const [name, setName] = useState('');
    const [player, setPlayer] = useState({});
    const [homepageVisible, setHomepageVisible] = useState(true);
    const [registerVisible, setRegisterVisible] = useState(false);
    const [continueEnable, setContinueEnable] = useState(true);
    const [progressBarVisible, setProgressBarVisible] = useState(false);
    const [completed, setCompleted] = useState(0);
    const nullPlayerJson = {
        name: '',
        level: 1
    }
    function newGame(){
        if (player.name !=''){
            if (window.confirm("确定要删除已有角色并开始新游戏吗？")) {
                fs.writeFile('./test.txt', JSON.stringify(nullPlayerJson), function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
                setHomepageVisible(false);
                setRegisterVisible(true);
            } 
        } else {
            setHomepageVisible(false);
            setRegisterVisible(true);
        }
    }

    function startGame(){
        if(name.length > 0 && name.length < 7) {
            fs.writeFile('./test.txt', JSON.stringify({...nullPlayerJson, name: name}), function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
            setRegisterVisible(false);
            setProgressBarVisible(true);
            setInterval(()=>{
                setCompleted(completed=>completed + 20);
            }, 600);
            setTimeout(()=>{
               props.setscene('Map1'); 
            }, 3000);
            
        } else {
            alert('请输入名字，最多6个字');
        }
        
    }

    function resumeGame(){
        props.setscene('Map1');
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

    // const labelStyles = {
    //     padding: 5,
    //     color: 'white',
    //     fontWeight: 'bold'
    // }

    useEffect(()=>{
        const data = JSON.parse(fs.readFileSync('./test.txt', {encoding:'utf8', flag:'r'}));
        setPlayer(data);
        if(data.name === ''){
            setContinueEnable(false);
        }

    },[])
    return (
        <div className='login-page'>
            <div className='homepage-title'>钻石英雄坛说</div>
            {homepageVisible ? <div>
                <button onClick={newGame} className="btn-start">新游戏</button><br></br>
                <button className="btn-start" onClick={resumeGame} disabled={continueEnable ? false : true}>继续游戏</button>
            </div> : null}
            {registerVisible ? <div className='register-section'>
                <div>
                    <label className='homepage-label'>请输入名字</label>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="name-input" />
                </div>
                <button onClick={startGame} className="btn-start">开始游戏</button>
            </div> : null}
            {progressBarVisible ? <div style={containerStyles}>
                                    <div style={fillerStyles}>
                                        {/* <span style={labelStyles}>{`${completed}%`}</span> */}
                                    </div>
                                </div> : null}
        </div>
    )
}

export default LogIn
