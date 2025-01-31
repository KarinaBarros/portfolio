import React, { useEffect, useState } from 'react';
import animationData from '@/animations/github.json';
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationGithub = () => {
  const [Lottie, setLottie] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      import('react-lottie-player').then((module) => {
        setLottie(module.default);
      });
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className='container-lottie-github'>
      <div className='container-github'>
        <p>Carregando...</p>
        <div className='animacao'>
          {Lottie && (
            <Lottie loop
              animationData={animationData}
              play />
          )}
        </div>
      </div>
    </div>
  );
};

export default LottieAnimationGithub;