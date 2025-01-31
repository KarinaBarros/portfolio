import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/animations/animation.json'; 
import './lottie.css';
import '@/app/globals.css';

const LottieAnimation = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  },[])
  

  return (
    <div className='container-lottie'>
      <div className='container'>
      <p>Portfólio Karina Barros</p>
      <div className='animacao'>
        {client && (
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