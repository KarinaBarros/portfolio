"use client";
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationLoading = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/loading-lottie.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className='container-lottie-github'>
      <div className='container-github'>
        <div className='animacao'>
          {animationData && <Lottie loop animationData={animationData} play />}
        </div>
      </div>
    </div>
  );
};

export default LottieAnimationLoading;
