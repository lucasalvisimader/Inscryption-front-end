// styles
import './DraggableCard.css'

// react
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import NewGameCard from '../new_game_card/NewGameCard';

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

    const handleHoverCard = (text) => {
        setTextSelected(text);
        if (!isOnTop) {
            if (type !== "options") {
                const audioHover = new Audio(menuHoverCard);
                audioHover.play();
            }
        }
    }

    const handleClickCard = (text) => {
        setTextSelected(text);
    }

    const handleExitCard = () => {
        if (!isOnTop) {
            setTextSelected();
        }
    }

    useEffect(() => {
        if (isOnTop) {
            if (type !== "options") {
                const audioChosen = new Audio(menuChosenCard);
                audioChosen.play();
            }
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
    }, [textSelected])

    return (<>
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}
            className={`draggable_menu_cards
            ${(textSelected === text && !clickedCard) && "draggable_menu_on_hover_card_mouse"} 
            ${(clickedCard) && "draggable_menu_on_click_card_mouse"} 
            ${isOnTop ? "draggable_menu_top_card" : ""}`}
            id={`draggable_menu_${type}_card`}
            onMouseEnter={() => handleHoverCard(text)}
            onMouseLeave={() => handleExitCard()}
            onClick={() => handleClickCard(text)}>
            {isDisabled && (
                <NewGameCard setIsGlitchy={setIsGlitchy} />
            )}
        </div>
    </>);
}
