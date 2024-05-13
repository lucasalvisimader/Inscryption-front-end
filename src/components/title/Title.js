// css
import './Title.css';

// react
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// images
import title from '../../assets/images/others/title.png';
import titleSpade from '../../assets/images/others/title_spade.png';

// sounds
import titleRattle from '../../assets/sounds/title_rattle.wav';

// locales
import en from '../../assets/locales/en.json';

// context
import { useAudio } from '../../context/AudioContext';

const Title = ({setIsInTitleScreen, audioRef}) => {
    const navigate = useNavigate();
    const { volume } = useAudio();
    const json = en.main;

    const isFirstAction = useRef(true);
    const spadeLeftRef = useRef();
    const titleRef = useRef();
    const spadeRightRef = useRef();
    const subtitleRef = useRef();

    const [animationSpeed, setAnimationSpeed] = useState('');

    const playClickSound = () => {
        if (isFirstAction.current) {
            const audio = new Audio(titleRattle);
            audio.volume = volume / 100;
            audio.play();
            isFirstAction.current = false;
        }
    }

    const enterMenu = () => {
        setIsInTitleScreen(false);
    }

    useEffect(() => {
        const handleUserAction = () => {
            audioRef.current.play();
            playClickSound();
            setAnimationSpeed('fast');
            setTimeout(() => {
                if (spadeLeftRef.current && titleRef.current && spadeRightRef.current && subtitleRef.current) {
                    spadeLeftRef.current.id = "main_title_image_spade_left_animation";
                    titleRef.current.id = "main_title_image_animation";
                    spadeRightRef.current.id = "main_title_image_spade_right_animation";
                    subtitleRef.current.id = "main_press_to_start_text_animation"
                }
                setTimeout(() => {
                    enterMenu();
                }, 500);
            }, 1500);
        }
        document.addEventListener('click', handleUserAction);
        document.addEventListener('keydown', handleUserAction);

        return () => {
            document.removeEventListener('click', handleUserAction);
            document.removeEventListener('keydown', handleUserAction);
        }
    }, [navigate]);

    return (<>
        <div className='main_title_container'>
            <img className={`main_title_image_spade_left`} src={titleSpade} alt={json.title_spade} ref={spadeLeftRef} />
            <img className='main_title_image' src={title} alt={json.title} ref={titleRef} />
            <img className={`main_title_image_spade_right`} src={titleSpade} alt={json.title_spade} ref={spadeRightRef} />
        </div>
        <p className={`main_press_to_start_text main_press_to_start_text_${animationSpeed}`} ref={subtitleRef}>
            {json.press_to_start}
        </p>
    </>)
}

export default Title;