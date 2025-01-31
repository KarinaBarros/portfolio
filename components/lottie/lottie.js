import React, { useEffect, useState } from 'react';
import animationData from '@/animations/animation.json'; 
import './lottie.css';
import '@/app/globals.css';


const LottieAnimation = () => {
  const [Lottie, setLottie] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined'){
      import('react-lottie-player').then((module) => {
        setLottie(module.default); 
      });
    }
  }, []);
  
  

  return (
    <div className='container-lottie'>
      <div className='container'>
      <p>Portfólio Karina Barros</p>
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

export default LottieAnimation;