// css
import './Main.css';

// react
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// images
import inscryptionTitle from '../../assets/images/others/inscryption_title.png'

// locales
import en from '../../assets/locales/en.json';

const Main = () => {
    const navigate = useNavigate();
    const divRef = useRef();
    const [animationSpeed, setAnimationSpeed] = useState('');

    const json = en.main;

    useEffect(() => {
        divRef.current.focus();

        const handleUserAction = () => {
            setAnimationSpeed('fast');
            setTimeout(() => {
                navigate('/menu');
            }, 1000);
        };

        document.addEventListener('click', handleUserAction);
        document.addEventListener('keydown', handleUserAction);

        return () => {
            document.removeEventListener('click', handleUserAction);
            document.removeEventListener('keydown', handleUserAction);
        };
    }, [navigate]);

    return (
        <div className='main_container' tabIndex={0} ref={divRef}>
            <img className='main_title_image' src={inscryptionTitle} alt={json.title} />
            <p className={`main_press_to_start_text ${animationSpeed}`}>{json.press_to_start}</p>
        </div>
    );
}

export default Main;