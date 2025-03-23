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

export const DraggableCardPlay = (props) => {
    const id = props.id;
    const card = props.card;
    // const boardRef = props.boardRef;
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id, disabled: card.isDisabled });
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useTranslation();
    const length = card.lengthCard;

    const style = useMemo(() => ({
        background: `url('/images/imageType/${card.imageType}.png')`,
        marginLeft: `calc(${length} * -0.16rem - 0.4vw)`,
        transform: CSS.Translate.toString(transform),
        transition: transform ? "none" : "transform 0.3s"
    }), [transform, card.imageType, length]);

    // This function handles the event when a user hovers a card.
    const handleMouseEnter = () => {
        setIsHovered(true);
    }
    
    // This function handles the event when a user don't hover a card anymore.
    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (<>
        <div className={`draggable_card_play_container${(isHovered) ? '_active' : ''}`}
            // ${(clickedCard.is) ? 'draggable_card_play_container_clicked' : ''}`}
            ref={setNodeRef} style={style} {...listeners} {...attributes} id={`draggable_card_play_container_${id}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
            // onClick={handleClick}
            >
            <div className='draggable_card_play_header'>
                <span className='draggable_card_play_name' style={{ fontSize: `calc(1rem - ${card.name.length / 3}px` }}>
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