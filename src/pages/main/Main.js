// css
import './Main.css';

// react
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// sounds
import titleTheme from '../../assets/songs/title_theme.wav';

// components
import Menu from '../../components/menu/Menu'
import Title from '../../components/title/Title'

// context
import { useAudio } from '../../context/AudioContext';

const Main = () => {
    const navigate = useNavigate();
    const containerRef = useRef();
    const audioRef = useRef();
    const { volume } = useAudio()

    const [isInTitleScreen, setIsInTitleScreen] = useState(true);

    useEffect(() => {
        containerRef.current.focus();
    }, [navigate])

    useEffect(() => {
        const setAudioVolume = () => {
            if (audioRef.current) {
                audioRef.current.volume = volume / 100;
            }
        };
        setAudioVolume();
    }, [volume]);

    return (<>
        <div className={`main_container ${!isInTitleScreen ? 'main_blue_background' : ''}`} tabIndex={0} ref={containerRef}>
            <audio src={titleTheme} ref={audioRef} autoPlay loop />
            {(isInTitleScreen && (<Title setIsInTitleScreen={setIsInTitleScreen} audioRef={audioRef}/>)) || (<Menu />)}
        </div>
    </>);
}

export default Main;