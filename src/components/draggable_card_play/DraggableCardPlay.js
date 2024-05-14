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

export const DraggableCardPlay = (props) => {
    const id = props.id;
    const card = props.card;
    const boardRef = props.boardRef;
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id, disabled: card.isDisabled });
    const [isHovered, setIsHovered] = useState(false);
    const [offsetLeft, setOffSetLeft] = useState(0);
    const [offsetTop, setOffSetTop] = useState(0);
    const [clickedCard, setClickedCard] = useState({key:'', is: false});
    const length = card.lengthCard;
    const style = {background: `url('/images/imageType/${card.imageType}.png')`, marginLeft: `calc(${length} * -0.16rem - 0.4vw)`, transform: CSS.Translate.toString(transform)}
    const json = en.play;

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const handleClick = async () => {
        const cost = await CardService.qtyCost(card.id);
        const cardContainer = document.getElementById(`draggable_card_play_container_${id}`);
        const bottomAnimationCard = offsetTop / 3;
        const leftAnimationCard = offsetLeft;

        if ((!clickedCard.is) || ((clickedCard.is && clickedCard.key === id))) {
            if (!(clickedCard.is)) {
                setClickedCard({ key: id, is: true });
                animateCardContainer(`-${leftAnimationCard}px`, 500, true);
                setTimeout(async () => {
                    cardContainer.style.right = `${offsetLeft}px`;
                    animateCardContainer(`-${bottomAnimationCard}px`, 250, false);

                    setTimeout(async () => {
                        cardContainer.style.bottom = `${offsetTop / 3}px`;
                    }, 250);
                }, 500);
            } else {
                setClickedCard({ key: '', is: false });
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
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={`draggable_card_play_container${(isHovered) ? '_active' : ''} ${(clickedCard.is) ? 'draggable_card_play_container_clicked' : ''}`}
            id={`draggable_card_play_container_${id}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}onClick={handleClick}>
            <div className='draggable_card_play_header'>
                <span className='draggable_card_play_name' style={{ fontSize: `calc(1rem - ${card.name.length / 3}px` }}>
                    {card.name}
                </span>
            </div>
            <img className='draggable_card_play_image' src={require(`../../assets/images/card/image_type/${card.imageType.toLowerCase()}.png`)} alt={json.card_image} />
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