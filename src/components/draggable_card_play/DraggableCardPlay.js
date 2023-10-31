// styles
import './DraggableCardPlay.css';

// react
import { useState } from 'react';

// json
import en from '../../assets/locales/en.json';

// external
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CardService } from '../../service/CardService';

export function DraggableCardPlay({ id, card, isOnHoverCardSacrificing }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id, disabled: card.isDisabled });
    const [isHovered, setIsHovered] = useState(false);
    const [isActiveSacrificing, setIsActiveSacrificing] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isUp, setIsUp] = useState(false);

    const length = card.lengthCard;
    const style = {
        background: `url('/images/imageType/${card.imageType}.png')`,
        marginLeft: `calc(${length} * -0.16rem - 0.4vw)`,
        transform: CSS.Translate.toString(transform),
    }
    const json = en.play;

    const handleMouseEnter = () => {
        if (!card.isDisabled) {
            setIsHovered(true);
        } else if (isOnHoverCardSacrificing) {
            setIsActiveSacrificing(true);
        }
    }

    const handleMouseLeave = () => {
        if (!card.isDisabled) {
            setIsHovered(false);
        } else if (isOnHoverCardSacrificing) {
            setIsActiveSacrificing(false);
        }
    }

    const handleClick = async () => {
        const cost = await CardService.qtyCost(card.id);
        console.log(cost.data)
        if (!(isClicked || isUp)) {
            setIsClicked(true);
            setTimeout(() => {
                setIsUp(true);
            }, 300);
        } else {
            setIsUp(false);
            setTimeout(() => {
                setIsClicked(false);
            }, 300);
        }
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}
            className={`draggable_card_play_container${(isHovered) ? '_active' : ''} 
            ${(isActiveSacrificing) ? 'draggable_card_play_container_active_sacrificing' : ''}
            ${(isClicked) ? 'draggable_card_play_container_clicked' : ''}
            ${(isUp) ? 'draggable_card_play_container_up' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}>
            <div className='draggable_card_play_header'>
                <span className='draggable_card_play_name' style={{ fontSize: `calc(1rem - ${card.name.length / 3}px` }}>
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