// styles
import './DraggableCardPlay.css';

// react
import { useState, useMemo } from 'react';

// translation
import { useTranslation } from 'react-i18next';

// external
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
// import { CardService } from '../../service/CardService';

export const DraggableCardPlay = ({ id, card }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, disabled: card.isDisabled });
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useTranslation();

    const fontSize = useMemo(() => `calc(1.3rem - ${card.name.length / 3}px)`, [card.name.length]);
    const style = useMemo(() => ({
        background: `url('/images/imageType/${card.imageType}.png')`,
        marginLeft: `calc(${card.lengthCard} * -0.16rem - 0.4vw)`,
        transform: CSS.Translate.toString(transform),
        transition: transform ? "none" : "transform 0.3s"
    }), [transform, card.imageType, card.lengthCard]);

    const toggleHover = (state) => setIsHovered(state);

    return (<>
         <div className={`draggable_card_play_container${isHovered ? '_active' : ''}`}
            ref={setNodeRef} style={style} {...listeners} {...attributes} 
            id={`draggable_card_play_container_${id}`} 
            onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)}
            >
            <div className='draggable_card_play_header'>
                <span className='draggable_card_play_name' style={{ fontSize }}>
                    {card.name}
                </span>
            </div>
            <img className='draggable_card_play_image' src={require(`../../../assets/images/card/image_type/${card.imageType.toLowerCase()}.png`)} alt={t('card_image')} />
            <div className='draggable_card_play_footer'>
                <span className='draggable_card_play_power'>
                    {card.power}
                </span>
                <span className='draggable_card_play_health'>
                    {card.health}
                </span>
            </div>
        </div>
    </>);
}