
import React, { useEffect, useRef } from 'react';
import './header_text.css';
import '@/app/globals.css'

const HeaderText = () => {
  const tituloRef = useRef();
  const paragrafoRef = useRef();

  useEffect(() => {
    if (paragrafoRef.current) {
      typeWriter(paragrafoRef.current);
    }

    setTimeout(() => {
      if (tituloRef.current) {
        typeWriter(tituloRef.current);
      }
    }, 3000);

    const blink2TimeoutId = setTimeout(() => {
      const textElement = document.querySelector('.text');
      textElement && textElement.classList.add('hide-blink2');
    }, 8000);

    const timeoutId = setTimeout(() => {
      const textElement = document.querySelector('.text');
      textElement && textElement.classList.add('hide-blink');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(blink2TimeoutId);
    };
  }, []);

  function typeWriter(elemento) {
    const textoArray = elemento.innerText.split('');
    elemento.innerText = '';
    elemento.style.opacity = 1;
    textoArray.forEach((letra, i) => {
      setTimeout(() => {
        if (elemento) {
          elemento.innerText += letra;
        }
      }, 75 * i);
    });
  }

  return (
    <div className='text'>
      <p className='animation-title' ref={paragrafoRef}>Olá, sou Karina Barros!</p>
      <h1 className='animation-p' ref={tituloRef}>Desenvolvedora Full-Stack.</h1>
    </div>
  );
};

export default HeaderText;