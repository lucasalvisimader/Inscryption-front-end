// styles
import './DraggableCardPlay.css';

// react
import { useState, useMemo } from 'react';

// translation
import { useTranslation } from 'react-i18next';

// external
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';


export const DraggableCardPlay = ({ id, card }) => {
    const CardHeader = ({ name, fontSize }) => (
        <div className={`draggable_card_play_header`}>
            <span className='draggable_card_play_name' style={{ fontSize }}>
                {name}
            </span>
        </div>
    );
    
    const CardImage = ({ imageType, altText }) => (
        <img className='draggable_card_play_image' 
            src={require(`../../../assets/images/card/others/${imageType.toLowerCase()}.png`)} 
            alt={altText} 
        />
    );
    
    const CardFooter = ({ power, health }) => (
        <div className={`draggable_card_play_footer ${isHovered ? 'draggable_card_play_footer_active' : ''}`}>
            <span className='draggable_card_play_power'>{power}</span>
            <span className='draggable_card_play_health'>{health}</span>
        </div>
    );
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, disabled: card.isDisabled });
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useTranslation();

    const fontSize = useMemo(() => `calc(1.1rem - ${card.name.length / 3}px)`, [card.name.length]);
    const style = useMemo(() => ({
        background: `url('/images/backgrounds/${card.imageType}.png')`,
        marginLeft: `calc(${card.lengthCard >= 15 ? 15 + (0.02 * card.lengthCard) : card.lengthCard} * -0.25rem - 0.4vw)`,
        transform: CSS.Translate.toString(transform),
        transition: transform ? "none" : "transform 0.3s"
    }), [transform, card.imageType, card.lengthCard]);

    const toggleHover = (state) => setIsHovered(state);

    return (
        <div className={`draggable_card_play_container${isHovered ? '_active' : ''}`}
            ref={setNodeRef} style={style} 
            {...listeners} {...attributes} 
            id={`draggable_card_play_container_${id}`} 
            onMouseEnter={() => toggleHover(true)} 
            onMouseLeave={() => toggleHover(false)}
        >
            <CardHeader name={card.name} fontSize={fontSize} />
            <CardImage imageType={card.imageType} altText={t('card_image')} />
            <CardFooter power={card.power} health={card.health} />
        </div>
    );
}