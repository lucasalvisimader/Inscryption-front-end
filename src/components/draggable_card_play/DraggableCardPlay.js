// styles
import './DraggableCardPlay.css';

// react
import { useState } from 'react';

// json
import en from '../../assets/locales/en.json';

// external
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function DraggableCardPlay({ id, card }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id, disabled: card.isDisabled });
    const [isHovered, setIsHovered] = useState(false);

    const length = card.lengthCard;
    const style = {
        background: `url('/images/imageType/${card.imageType}.png')`,
        marginLeft: `calc(${length} * -0.16rem - 0.4vw)`,
        transform: CSS.Translate.toString(transform)
    }
    const json = en.play;

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}
            className={`draggable_card_play_container${isHovered ? '_hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className='draggable_card_play_header'>
                <span className='draggable_card_play_name' style={{fontSize: `calc(1.1rem - ${card.name.length / 2}px`}}>
                    {card.name}
                </span>
            </div>
            <img className='draggable_card_play_image'
                src={require(`../../assets/images/card/image_type/${card.imageType.toLowerCase()}.png`)}
                alt={json.card_image} />
            <div className='draggable_card_play_footer'>
                <span className='draggable_card_play_power'>
                    {card.power}
                </span>
                <span className='draggable_card_play_health'>
                    {card.health}
                </span>
            </div>
        </div>
    );
}