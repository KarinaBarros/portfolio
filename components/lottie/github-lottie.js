import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/public/github.json'; 
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationGithub = () => {
  

  return (
    <div className='container-lottie-github'>
      <div className='container-github'>
      <p>Carregando...</p>
      <div className='animacao'>
        <Lottie  loop
        animationData={animationData}
        play />
      </div>
      </div>
    </div>
  );
};

export default LottieAnimationGithub;