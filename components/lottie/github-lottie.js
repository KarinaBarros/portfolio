import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/animations/github.json'; 
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationGithub = () => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  },[])

  return (
    <div className='container-lottie-github'>
      <div className='container-github'>
      <p>Carregando...</p>
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

export default LottieAnimationGithub;