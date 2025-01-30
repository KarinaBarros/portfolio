"use client";
import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/public/animation.json'; 
import './lottie.css';
import '@/app/globals.css';

const LottieAnimation = () => {
  

  return (
    <div className='container-lottie'>
      <div className='container'>
      <p>Portfólio Karina Barros</p>
      <div className='animacao'>
        <Lottie  loop
        animationData={animationData}
        play />
      </div>
      </div>
    </div>
  );
};

export default LottieAnimation;