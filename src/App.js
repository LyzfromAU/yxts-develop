import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import LogIn from './LogIn';
import Map1 from './Map1';


function App() {

  const [scene, setScene] = useState('Map1');

  const CustomTag = scene;
   
  
  useEffect(() => { 
    
    
  }, []);
  return (
    <>
    {scene === 'LogIn' ? <LogIn /> : <Map1 />}
    </>
  );
}

export default App;
