import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/animations/loading-lottie.json'; 
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationLoading = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  },[])

  return (
    <div className='container-lottie-github'>
      <div className='container-github'>
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

export default LottieAnimationLoading;