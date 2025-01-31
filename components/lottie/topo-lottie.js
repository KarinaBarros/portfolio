import React, { useEffect, useState } from 'react';
import animationData from '@/animations/lottie-topo.json';
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationTopo = () => {
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
    <div className='animacao-topo'>
      {Lottie && (
        <Lottie loop
          animationData={animationData}
          play />
      )}
    </div>
  );
};

export default LottieAnimationTopo;