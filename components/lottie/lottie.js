'use client';
import React from 'react';
import * as animationData from '@/public/animation.json'; 
import { useLottie } from "lottie-react";
import './lottie.css';
import '@/app/globals.css';

const LottieAnimation = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className='container-lottie'>
      <div className='container'>
      <p>Portfólio Karina Barros</p>
      <div className='animacao'>
        {View}
      </div>
      </div>
    </div>
  );
};

export default LottieAnimation;