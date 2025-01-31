import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/animations/lottie-topo.json'; 
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationTopo = () => {
  const [Lottie, setLottie] = useState(null);
  
    useEffect(() => {
      if (typeof window !== 'undefined'){
        import('react-lottie-player').then((module) => {
          setLottie(module.default); 
        });
      }
    }, []);

  return (
      <div className='animacao-topo'>
        {Lottie && (
          <Lottie  loop
          animationData={animationData}
          play />
        )}
      </div>
  );
};

export default LottieAnimationTopo;