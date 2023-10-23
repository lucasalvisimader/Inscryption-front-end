// styles
import './DraggableCard.css'

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

export function DraggableCard({ id, text, type, textSelected, setTextSelected, isDisabled, isOnTop, setIsGlitchy, setIsFadingOut, clickedCard }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        disabled: isDisabled
    });
    const style = { transform: CSS.Translate.toString(transform) }

    const navigate = useNavigate();
    const { volume } = useAudio();

    const handleHoverCard = (text) => {
        setTextSelected(text);
        if (!isOnTop) {
            const audioHover = new Audio(menuHoverCard);
            audioHover.volume = volume / 100 * 0.4;
            audioHover.play();
        }
    }

    useEffect(() => {
        if (isOnTop) {
            const audioChosen = new Audio(menuChosenCard);
            audioChosen.volume = volume / 100 * 0.2;
            audioChosen.play();
            setTimeout(() => {
                if (type === "continue") {
                    setIsFadingOut(true);
                    setTimeout(() => {
                        navigate("/play");
                    }, 1500)
                } else if (type === "quit") {
                    window.open("about:blank", "_self");
                    window.close();
                }
            }, 500);
        }
    }, [])

    return (<>
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}
            className={`draggable_menu_cards
            ${(textSelected === text && !clickedCard) && "draggable_menu_on_hover_card_mouse"} 
            ${(clickedCard) && "draggable_menu_on_click_card_mouse"} 
            ${isOnTop ? "draggable_menu_top_card" : ""}`}
            id={`draggable_menu_${type}_card`}
            onMouseEnter={() => handleHoverCard(text)}>
            {isDisabled && (
                <NewGameCard setIsGlitchy={setIsGlitchy} />
            )}
        </div>
    </>);
}
