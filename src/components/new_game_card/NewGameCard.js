// styles
import './NewGameCard.css';

// react
import { useState, useEffect, useRef } from 'react';

// context
import { useAudio } from '../../context/AudioContext';

// images
import imageCardPart1 from '../../assets/images/menu/cards/new_game/greyed_1.png';
import imageCardPart2 from '../../assets/images/menu/cards/new_game/greyed_2.png';
import imageCardPart3 from '../../assets/images/menu/cards/new_game/greyed_3.png';
import imageCardPart4 from '../../assets/images/menu/cards/new_game/greyed_4.png';
import imageCardPart5 from '../../assets/images/menu/cards/new_game/greyed_5.png';
import imageCardPart6 from '../../assets/images/menu/cards/new_game/greyed_6.png';
import imageCardPart7 from '../../assets/images/menu/cards/new_game/greyed_7.png';
import imageCardPart8 from '../../assets/images/menu/cards/new_game/greyed_8.png';
import imageCardPart9 from '../../assets/images/menu/cards/new_game/greyed_9.png';
import imageCardPart10 from '../../assets/images/menu/cards/new_game/greyed_10.png';

// sounds
import glitch from '../../assets/sounds/glitch.wav';

// json
import en from '../../assets/locales/en.json';

const NewGameCard = ({ setIsGlitchy }) => {
    const audioRef = useRef();
    const { volume } = useAudio();

    const [blurImage, setBlurImage] = useState(null);
    const [intervalId, setIntervalId] = useState(0);
    const setGlitchy = setIsGlitchy;
    const json = en.menu;

    const blurredImages = [
        imageCardPart1, imageCardPart2, imageCardPart3, imageCardPart4,
        imageCardPart5, imageCardPart6, imageCardPart7, imageCardPart8,
        imageCardPart9, imageCardPart10
    ];

    const handleClickNewCardDisabled = () => {
        const audioGlitch = new Audio(glitch);
        audioGlitch.volume = volume / 100;
        audioGlitch.play();
        setIsGlitchy(true);
        setTimeout(() => {
            setGlitchy(false);
        }, 250);
    }

    const setupInterval = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        const interval = Math.random() * 1000 + 250;
        const intervalFunc = () => {
            const randomIndex = Math.floor(Math.random() * 10);
            setBlurImage(randomIndex + 1);
            setTimeout(() => setBlurImage(0), interval);
        }
        setIntervalId(setInterval(intervalFunc, 500));
    }

    useEffect(() => {
        if (blurImage !== 0) {
            setupInterval();
            return () => {
                if (intervalId) {
                    clearInterval(intervalId);
                }
            }
        }
    }, [blurImage]);

    return (<>
        <div className='menu_card_new_game_images_container' ref={audioRef} onClick={handleClickNewCardDisabled}>
            {blurredImages.map((image, index) => (
                <img className={`menu_card_new_game_image ${blurImage === index + 1 ? 'menu_card_new_game_image_blur' : ''}`}
                    key={index}
                    src={image}
                    alt={json.new_game_card_part}
                    loading='lazy'
                />
            ))}
        </div>
    </>);
}

export default NewGameCard;