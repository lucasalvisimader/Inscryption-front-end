// styles
import './DraggableCard.css'

// react
import React from 'react';
import { useState } from 'react';

// images
import continueText from '../../assets/images/menu/texts/continue.png';
import optionsText from '../../assets/images/menu/texts/options.png'

// external
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function DraggableCard({ id, text, textSelected, setTextSelected, disable }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ 
        id: id,
        disabled: disable
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
        setTextSelected();
        setClickedCard(false);
    }

    const handleIdCard = () => {
        switch(text) {
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
            className={`droppable_menu_cards 
            ${textSelected === text ? "menu_on_hover_card_mouse" : ""} 
            ${clickedCard ? "menu_on_click_card_mouse" : ""}`}
            isDropDisabled={disable}
            id={`menu_${handleIdCard()}_card`}
            onMouseEnter={() => handleHoverCard(text)}
            onMouseLeave={() => handleExitCard()}
            onClick={() => handleClickCard(text)} />
    </>);
}
