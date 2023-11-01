// styles
import './DraggableCardPlay.css';

// react
import { useEffect, useState } from 'react';

// json
import en from '../../assets/locales/en.json';

// external
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CardService } from '../../service/CardService';

export function DraggableCardPlay({ id, card, isOnHoverCardSacrificing, boardRef }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id, disabled: card.isDisabled });
    const [isHovered, setIsHovered] = useState(false);
    const [isActiveSacrificing, setIsActiveSacrificing] = useState(false);
    const [isClicked, setIsClicked] = useState({ key: '', is: false });
    const [offsetLeft, setOffSetLeft] = useState(0);
    const [offsetTop, setOffSetTop] = useState(0);

    const length = card.lengthCard;
    const style = {
        background: `url('/images/imageType/${card.imageType}.png')`,
        marginLeft: `calc(${length} * -0.16rem - 0.4vw)`,
        transform: CSS.Translate.toString(transform)
    }
    const json = en.play;

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (isOnHoverCardSacrificing) {
            setIsActiveSacrificing(true);
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (isOnHoverCardSacrificing) {
            setIsActiveSacrificing(false);
        }
    }

    const handleClick = async () => {
        const cost = await CardService.qtyCost(card.id);
        // console.log(cost.data)
        const cardContainer = document.getElementById(`draggable_card_play_container_${id}`);
        const bottomAnimationCard = offsetTop / 3;
        const leftAnimationCard = offsetLeft;

        if (!isClicked.is || (isClicked.is && (isClicked.key === id))) {

            if (!(isClicked.is)) {
                setIsClicked({ key: id, is: true });
                animateCardContainer(`-${leftAnimationCard}px`, 500, true);
                setTimeout(async () => {
                    cardContainer.style.right = `${offsetLeft}px`;
                    animateCardContainer(`-${bottomAnimationCard}px`, 250, false);

                    setTimeout(async () => {
                        cardContainer.style.bottom = `${offsetTop / 3}px`;
                    }, 250);
                }, 500);
            } else {
                setIsClicked({ key: '', is: false });
                animateCardContainer(`${bottomAnimationCard}px`, 500, false);
                setTimeout(async () => {
                    cardContainer.style.bottom = 0;
                    animateCardContainer(`${leftAnimationCard}px`, 250, true);

                    setTimeout(async () => {
                        cardContainer.style.right = 0;
                    }, 250);
                }, 500);
            }
        }
    }

    const animateCardContainer = (to, duration, isX) => {
        const cardContainer = document.getElementById(`draggable_card_play_container_${id}`);

        cardContainer.animate([
            { transform: 'translate(0)' },
            { transform: isX ? `translateX(${to})` : `translateY(${to})` }
        ], { duration: duration, iterations: 1 });
    }

    useEffect(() => {
        const board = boardRef.current?.getBoundingClientRect();
        const cardContainer = document.getElementById(`draggable_card_play_container_${id}`)?.getBoundingClientRect();

        setOffSetLeft(cardContainer?.left - board?.left);
        setOffSetTop(cardContainer?.top - board?.top);
    }, [id, boardRef])

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}
            className={`draggable_card_play_container${(isHovered) ? '_active' : ''} 
            ${(isActiveSacrificing) ? 'draggable_card_play_container_active_sacrificing' : ''}
            ${(isClicked) ? 'draggable_card_play_container_clicked' : ''}`}
            id={`draggable_card_play_container_${id}`}
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