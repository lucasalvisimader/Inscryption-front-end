// styles
import './DraggableCardMenu.css'

// react
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import NewGameCard from '../new_game_card/NewGameCard';

// context
import { useAudio } from '../../context/AudioContext';

// sounds
import menuHoverCard from '../../assets/sounds/menu_hover_card.wav';
import menuChosenCard from '../../assets/sounds/menu_chosen_card.wav';

// external
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const DraggableCardMenu = ({props}) => {
    const id = props.id;
    const text = props.text;
    const type = props.type;
    const textSelected = props.textSelected;
    const setTextSelected = props.setTextSelected;
    const isDisabled = props.isDisabled;
    const isOnTop = props.isOnTop;
    const setIsGlitchy = props.setIsGlitchy;
    const setIsFadingOut = props.setIsFadingOut;
    const clickedCard = props.clickedCard;
    const navigate = useNavigate();
    const { volume } = useAudio();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        disabled: isDisabled
    });
    const style = { transform: CSS.Translate.toString(transform) }
    
    // This function handles with the hover of a card from below, when not on the center. This function makes a sound play when this condition is achieved.
    const handleHoverCard = (text) => {
        setTextSelected(text);
        if (!isOnTop) {
            const audioHover = new Audio(menuHoverCard);
            audioHover.volume = volume / 100 * 0.4;
            audioHover.play();
        }
    }

    // This use effect handles with the actions chosen by the user when put a card from below on the center area. It's also responsible by the sound that's played when chosen.
    useEffect(() => {
        if (isOnTop) {
            const audioChosen = new Audio(menuChosenCard);
            audioChosen.volume = volume / 100 * 0.2;
            audioChosen.play();
            setTimeout(() => {
                if (type === "continue") {
                    setIsFadingOut(true);
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500)
                } else if (type === "quit") {
                    window.open("about:blank", "_self");
                    window.close();
                }
            }, 500);
        }
    }, [])

    return (<>
        <div className={`draggable_menu_cards ${(textSelected === text && !clickedCard) && "draggable_menu_on_hover_card_mouse"} ${(clickedCard) && "draggable_menu_on_click_card_mouse"} ${isOnTop ? "draggable_menu_top_card" : ""}`}
            ref={setNodeRef} style={style} {...listeners} {...attributes} id={`draggable_menu_${type}_card`} onMouseEnter={() => handleHoverCard(text)}>
            {isDisabled && <NewGameCard setIsGlitchy={setIsGlitchy}/>}
        </div>
    </>);
}
