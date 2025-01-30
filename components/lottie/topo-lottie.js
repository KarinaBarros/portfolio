"use client";
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

const LottieAnimationTopo = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/lottie-topo.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className='animacao-topo'>
      {animationData && <Lottie loop animationData={animationData} play />}
    </div>
  );
};

export default LottieAnimationTopo;
