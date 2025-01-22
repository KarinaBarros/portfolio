import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/public/lottie-topo.json'; 
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationTopo = () => {
  

  return (
    
      
      <div className='animacao-topo'>
        <Lottie  loop
        animationData={animationData}
        play />
      </div>
      
    
  );
};

export default LottieAnimationTopo;