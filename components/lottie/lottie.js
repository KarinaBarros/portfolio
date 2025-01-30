"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Importação dinâmica do Next.js
import "./lottie.css";
import "@/app/globals.css";

// Importa o Lottie de forma dinâmica, desativando o SSR
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const LottieAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/animation.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Erro ao carregar animação:", error));
  }, []);

  if (!animationData) return <p>Carregando animação...</p>;

  return (
    <div className="container-lottie">
      <div className="container">
        <p>Portfólio Karina Barros</p>
        <div className="animacao">
          <Lottie loop animationData={animationData} play />
        </div>
      </div>
    </div>
  );
};

export default LottieAnimation;