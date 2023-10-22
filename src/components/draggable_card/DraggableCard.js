// styles
import './DraggableCard.css'

// react
import React, { useState } from 'react';

// images
import continueText from '../../assets/images/menu/texts/continue.png';
import optionsText from '../../assets/images/menu/texts/options.png'

// external
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import NewGameCard from '../new_game_card/NewGameCard';

export function DraggableCard({ id, text, textSelected, setTextSelected, isDisabled, isOnTop, setIsGlitchy }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        disabled: isDisabled
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    }
    const [clickedCard, setClickedCard] = useState(false);

    const handleHoverCard = (text) => {
        setTextSelected(text);
    }

    const handleClickCard = (text) => {
        setTextSelected(text);
        setClickedCard(true);
    }

    const handleExitCard = () => {
        if (!isOnTop) {
            setTextSelected();
        }
        setClickedCard(false);
    }

    const handleIdCard = () => {
        switch (text) {
            case continueText:
                return "continue";
            case optionsText:
                return "options";
            default:
                return "new_game";
        }
    }

    return (<>
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}
            className={`draggable_menu_cards
            ${(textSelected === text) ? "draggable_menu_on_hover_card_mouse" : ""} 
            ${clickedCard ? "draggable_menu_on_click_card_mouse" : ""}
            ${isOnTop ? "draggable_menu_top_card" : ""}`}
            id={`draggable_menu_${handleIdCard()}_card`}
            onMouseEnter={() => handleHoverCard(text)}
            onMouseLeave={() => handleExitCard()}
            onClick={() => handleClickCard(text)}>
            {isDisabled && (
                <NewGameCard setIsGlitchy={setIsGlitchy} />
            )}
        </div>
    </>);
}
