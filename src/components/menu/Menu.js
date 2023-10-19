// styles
import "./Menu.css"

// react
import { useState } from "react";

// images
import continueText from '../../assets/images/menu/texts/continue.png'
import optionsText from '../../assets/images/menu/texts/options.png'

// json
import en from '../../assets/locales/en.json'

// external
import { DraggableCard } from '../draggable_card/DraggableCard';
import { DroppableArea } from "../droppable_area/DroppableArea";
import { DndContext } from '@dnd-kit/core';

const Menu = () => {
    const [textSelected, setTextSelected] = useState(null);
    const [parent, setParent] = useState(null);

    const json = en.menu;

    const handleDragEnd = (result) => {
        console.log(result)
        if (result.active && result.over) {
            setParent(result.active.id);
        } else {
            setParent(null);
        }
    }

    const handleClickCard = () => {
        setParent(null);
    }

    const cardData = {
        new_game: {
            id: "menu_new_game_draggable",
            text: "",
            type: "new_game",
            isDisabled: true
        },
        continue: {
            id: "menu_continue_draggable",
            text: continueText,
            type: "continue",
        },
        options: {
            id: "menu_options_draggable",
            text: optionsText,
            type: "options",
        },
    };

    const generateCard = (cardKey) => {
        const card = cardData[cardKey];
        return (
            <DraggableCard className="menu_cards"
                id={card.id}
                text={card.text}
                type={card.type}
                textSelected={textSelected}
                setTextSelected={setTextSelected}
                onClick={handleClickCard}
                disable={card.isDisabled}
            />
        );
    }

    const card_new_game = () => {
        <div className="menu_cards" id="menu_new_game_card" />
        return (
            generateCard("new_game")
        );
    }

    const card_continue = () => {
        return (
            generateCard("continue")
        );
    }

    const card_options = () => {
        return (
            generateCard("options")
        );
    }

    const cardsFromBelow = () => {
        switch (parent) {
            case "menu_continue_draggable":
                return <>
                    {card_new_game()}
                    {card_options()}
                </>
            case "menu_options_draggable":
                return <>
                    {card_new_game()}
                    {card_continue()}
                </>
            case "menu_new_game_draggable":
                return <>
                    {card_continue()}
                    {card_options()}
                </>
            default:
                return <>
                    {card_new_game()}
                    {card_continue()}
                    {card_options()}
                </>
        }
    }

    const cardsFromAbove = () => {
        switch (parent) {
            case "menu_continue_draggable":
                return <>
                    {card_continue()}
                </>
            case "menu_options_draggable":
                return <>
                    {card_options()}
                </>
            case "menu_new_game_draggable":
                return <>
                    {card_new_game()}
                </>
            default:
                return;
        }
    }

    return (<>
        <DndContext onDragEnd={handleDragEnd} >
            <div className="menu_container">
                <div className="menu_header">
                    {textSelected && (
                        <img className="menu_card_text_selected" src={textSelected} alt={json.text_selected} />
                    )}
                </div>
                <div className="menu_body_container">
                    <div className="menu_body">
                        <DroppableArea id="menu_droppable">
                            {cardsFromAbove()}
                        </DroppableArea>
                    </div>
                </div>
                <div className="menu_footer">
                    {cardsFromBelow()}
                </div>
            </div>
        </DndContext>
    </>);
}

export default Menu;
