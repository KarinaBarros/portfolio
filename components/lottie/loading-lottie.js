import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/animations/loading-lottie.json'; 
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationLoading = () => {
  const [Lottie, setLottie] = useState(null);
  
    useEffect(() => {
      if (typeof window !== 'undefined'){
        import('react-lottie-player').then((module) => {
          setLottie(module.default); 
        });
      }
    }, []);

  return (
    <div className='container-lottie-github'>
      <div className='container-github'>
      <div className='animacao'>
        {Lottie && (
          <Lottie  loop
          animationData={animationData}
          play />
        )}
      </div>
      </div>
    </div>
  );
};

export default LottieAnimationLoading;