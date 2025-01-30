"use client";
import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/public/loading-lottie.json'; 
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationLoading = () => {
  

  return (
    <div className='container-lottie-github'>
      <div className='container-github'>
      <div className='animacao'>
        <Lottie  loop
        animationData={animationData}
        play />
      </div>
      </div>
    </div>
  );
};

export default LottieAnimationLoading;