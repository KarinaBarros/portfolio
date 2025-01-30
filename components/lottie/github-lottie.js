"use client";
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationGithub = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/github.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className='container-lottie-github'>
      <div className='container-github'>
        <p>Carregando...</p>
        <div className='animacao'>
          {animationData && <Lottie loop animationData={animationData} play />}
        </div>
      </div>
    </div>
  );
};

export default LottieAnimationGithub;
