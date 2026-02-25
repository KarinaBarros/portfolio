import React, { useEffect, useState } from 'react';
import './header.css';
import HeaderText from './header_text';

const Header = ({ tema }) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setReady(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <header>
            <div className='header'>
                {(ready &&
                    <>
                        <HeaderText />
                        {(tema && <div className='container-center'>
                            <img className='avatar' src='/avatar.png' alt='Desenvolvedor' />
                            <video className='video' controls autoPlay loop muted>
                                <source src='/matrix_-_5442 (540p).mp4' type="video/mp4" />
                            </video>
                            <img src="/dev.png" className={`dev ${tema === 'dark' ? 'show' : 'hide'}`} />
                            <img src="/dev2.png" className={`dev ${tema === 'light' ? 'show' : 'hide'}`} />
                        </div>)}
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;








