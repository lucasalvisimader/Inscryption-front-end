// styles
import './DraggableCard.css'

// react
import React, { useEffect } from 'react';

// external
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import NewGameCard from '../new_game_card/NewGameCard';

export function DraggableCard({ id, text, type, textSelected, setTextSelected, isDisabled, isOnTop, setIsGlitchy, clickedCard }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        disabled: isDisabled
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    }

    const handleHoverCard = (text) => {
        setTextSelected(text);
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
        if (isOnTop && type === "quit") {
            window.open("about:blank", "_self");
            window.close();
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
