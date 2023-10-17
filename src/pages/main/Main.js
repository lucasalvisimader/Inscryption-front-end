// css
import './Main.css';

// react
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// images
import title from '../../assets/images/others/title.png';
import titleSpade from '../../assets/images/others/title_spade.png';

// sounds
import titleTheme from '../../assets/songs/title_theme.wav';
import titleRattle from '../../assets/sounds/title_rattle.wav';

// components
import Menu from '../../components/menu/Menu'

// locales
import en from '../../assets/locales/en.json';

const Main = () => {
    const navigate = useNavigate();
    const containerRef = useRef();
    const audioRef = useRef();
    const isFirstAction = useRef(true);
    const [animationSpeed, setAnimationSpeed] = useState('');
    const [isInTitleScreen, setIsInTitleScreen] = useState(true);
    const titleThemeSong = new Audio(titleTheme);
    const json = en.main;

    const playClickSound = () => {
        if (isFirstAction.current) {
            const audio = new Audio(titleRattle);
            audio.play();
            isFirstAction.current = false;
        }
    }

    const enterMenu = () => {
        setIsInTitleScreen(false);
    }

    useEffect(() => {
        containerRef.current.focus();
        audioRef.current.play();
        const handleUserAction = () => {
            playClickSound();
            setAnimationSpeed('fast');
            setTimeout(() => {
                enterMenu();
            }, 2000);
        }

        document.addEventListener('click', handleUserAction);
        document.addEventListener('keydown', handleUserAction);

        return () => {
            document.removeEventListener('click', handleUserAction);
            document.removeEventListener('keydown', handleUserAction);
        }
    }, [navigate, titleThemeSong]);

    return (<>
        <div className={`main_container ${!isInTitleScreen ? 'main_blue_background' : ''}`} tabIndex={0} ref={containerRef}>
            <audio src={titleTheme} ref={audioRef} autoPlay loop />
            {(isInTitleScreen && (<>
                <div className='main_title_container'>
                    <img className={`main_title_image_spade_left`} src={titleSpade} alt={json.title_spade} />
                    <img className='main_title_image' src={title} alt={json.title} />
                    <img className={`main_title_image_spade_right`} src={titleSpade} alt={json.title_spade} />
                </div>
                <p className={`main_press_to_start_text main_press_to_start_text_${animationSpeed}`}>{json.press_to_start}</p>
            </>)) || (<Menu />)}
        </div>
    </>);
}

export default Main;