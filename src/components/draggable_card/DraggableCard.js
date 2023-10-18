// styles
import './DraggableCard.css'

// react
import React from 'react';
import { useState } from 'react';

// images
import continueText from '../../assets/images/menu/texts/continue.png'

// external
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function DraggableCard({ id, text, textSelected, setTextSelected }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id });
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

    return (<>
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={`menu_cards 
            ${textSelected === text ? "menu_on_hover_card_mouse" : ""} 
            ${clickedCard ? "menu_on_click_card_mouse" : ""}`}
            id={`menu_${text === continueText ? "continue" : "options"}_card`}
            onMouseEnter={() => handleHoverCard(text)}
            onMouseLeave={() => handleExitCard()}
            onClick={() => handleClickCard(text)} />
    </>);
}
