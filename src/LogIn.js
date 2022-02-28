import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './LogIn.css';
const fs = window.require('fs');





function LogIn(props) {

    const [player, setPlayer] = useState({});
    const [continueEnable, setContinueEnable] = useState(true);
    const [name, setName] = useState('');
    const [registerVisible, setRegisterVisible] = useState(false);
    const [homepageVisible, setHomepageVisible] = useState(true);
    const [progressBarVisible, setProgressBarVisible] = useState(false);
    const [completed, setCompleted] = useState(0);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popup, setPopup] = useState('确认删除已经存在的角色并创建新角色吗？');
    const [canceBtnVisible, setCanceBtnVisible] = useState(true);

    const nullPlayerJson = {
        name: '',
        level: 1
    }
    const initSkillsetJson = {
        ultimate: [
            
        ],
        fist: [
            {
                name: '基本拳脚',
                level: 1
            }
        ],
        sword: [
            {
                name: "基本剑法",
                level: 1
            }
        ],
        dark: [

        ],
        evade: [
            {
                name: "基本轻功",
                level: 1
            }
        ],
        defend: [
            {
                name: "基本招架",
                level: 1
            }
        ]
    }

    function newGame(){
        if (player.name !=''){
            setPopupVisible(true);        
        } else {
            setRegisterVisible(true);
            setHomepageVisible(false);
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
    let loadingInterval;
    function startGame(){
        if(name.length > 0 && name.length < 7) {
            fs.writeFile('./test.txt', JSON.stringify({...nullPlayerJson, name: name}), function (err) {
                if (err) throw err;
            });
            fs.writeFile('./skillset.txt', JSON.stringify(initSkillsetJson), function (err) {
                if (err) throw err;
            });
            setRegisterVisible(false);
            setProgressBarVisible(true);
            loadingInterval = setInterval(()=>{
                setCompleted(completed=>completed + 20);
            }, 600);
            
        } else {
            setPopup('请输入名字，推荐使用汉字，最多6个字符');
            setPopupVisible(true);
            setCanceBtnVisible(false);
        }
        
    }

    function handleConfirm(){
        if(canceBtnVisible) {
            setPopupVisible(false);
            setRegisterVisible(true);
            setHomepageVisible(false);
            fs.writeFile('./test.txt', JSON.stringify(nullPlayerJson), function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        } else {
            setPopupVisible(false);
        }
    }

    function handleCancel(){
        setPopupVisible(false);
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
    useEffect(()=>{
        if(completed === 100){
            clearInterval(loadingInterval);
            props.setscene('Map1');
        }
    }, [completed])
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
            <div className={popupVisible ? 'popup' : 'display-none'}>
                <div>
                    {popup}
                </div>
                <div className='flex-row'>
                    <button onClick={handleConfirm} className='btn-confirm'>确认</button>
                    <button className={canceBtnVisible ? 'btn-confirm' : 'display-none'} onClick={handleCancel}>取消</button>
                </div>
            </div>
        </div>
    )
}

export default LogIn
