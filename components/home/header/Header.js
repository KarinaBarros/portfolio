import React, { useEffect, useState } from 'react';
import './header.css';
import HeaderText from './header_text';

const Header = ({ tema }) => {
    const [dev, setDev] = useState('');

    useEffect(() => {
        if (tema === 'dark') {
            setDev('/dev.png');
        }
        if (tema === 'light') {
            setDev('/dev2.png')
        }
        if (!tema) {
            setDev('/dev.png');
        }
    }, [tema])

    return (
        <header>
            <div className='header'>
                <HeaderText />
                <div className='container-center'>
                    <img className='avatar' src='/avatar.png' alt='Desenvolvedor' />
                    {dev && (
                        <video className='video' controls autoPlay loop muted>
                            <source src='/matrix_-_5442 (540p).mp4' type="video/mp4" />
                        </video>
                    )}
                    <img src={dev} alt='dev' className='dev'></img>
                </div>
            </div>
        </header>
    );
}

export default Header;








