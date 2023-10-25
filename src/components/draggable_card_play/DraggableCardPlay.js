// styles
import './DraggableCardPlay.css';

// react
import { useState, useRef } from 'react';

// json
import en from '../../assets/locales/en.json';

export function DraggableCardPlay(card) {
    const [isHovered, setIsHovered] = useState(false);
    const length = card.length;
    const cardStyle = {
        backgroundImage: `url('/images/imageType/${card.imageType}.png')`,
        marginLeft: `calc(${length} * -0.16rem - 0.4vw)`
    }
    const json = en.play;

    const containerRef = useRef();

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <div className={`draggable_card_play_container${isHovered ? '_hovered' : ''}`}
            ref={containerRef}
            style={cardStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <img className='draggable_card_play_image'
                src={require(`../../assets/images/card/image_type/${card.imageType.toLowerCase()}.png`)}
                alt={json.card_image} />
        </div>
    );
}