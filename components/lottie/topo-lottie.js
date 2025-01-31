import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/animations/lottie-topo.json'; 
import './lottie.css';
import '@/app/globals.css';

const LottieAnimationTopo = () => {
  const[client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  },[])

  return (
      <div className='animacao-topo'>
        {client && (
          <Lottie  loop
          animationData={animationData}
          play />
        )}
      </div>
  );
};

export default LottieAnimationTopo;