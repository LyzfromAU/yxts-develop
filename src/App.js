import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import LogIn from './LogIn';
import Map1 from './Map1';
import Battle from './Battle';
import Map2 from './Map2';


function App() {

  const [scene, setScene] = useState('LogIn');

  let sceneTag;

  switch(scene) {
    case 'LogIn':
      sceneTag = <LogIn scene={scene} setscene={setScene} />
      break;
    case 'Map1':
      sceneTag = <Map1 scene={scene} setscene={setScene} />
      break;
    case 'Map2':
      sceneTag = <Map2 scene={scene} setscene={setScene} />
      break;
    case 'Battle':
      sceneTag = <Battle scene={scene} setscene={setScene} />
      break;
    default:
      console.log('doing nothing')
  }
   
  
  useEffect(() => { 
    
    
  }, []);
  return (
    <>
    {sceneTag}
    </>
  );
}

export default App;
