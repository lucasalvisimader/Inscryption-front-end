// styles
import "./Menu.css"

// react
import { useState } from "react";

// images
import continueText from '../../assets/images/menu/texts/continue.png';
import optionsText from '../../assets/images/menu/texts/options.png';
import newGame from '../../assets/images/menu/texts/newgame_greyed.png';

// json
import en from '../../assets/locales/en.json';

// external
import { DraggableCard } from '../draggable_card/DraggableCard';
import { DroppableArea } from "../droppable_area/DroppableArea";
import { DndContext } from '@dnd-kit/core';

const Menu = () => {
    const [textSelected, setTextSelected] = useState(null);
    const [parent, setParent] = useState(null);

    const json = en.menu;

    const handleDragEnd = (result) => {
        if (result.active && result.over) {
            setParent(result.active.id);
        } else {
            setParent(null);
        }
    }

    const cardData = {
        new_game: {
            id: "menu_new_game_draggable",
            text: newGame,
            type: "new_game",
            isDisabled: "true"
        },
        continue: {
            id: "menu_continue_draggable",
            text: continueText,
            type: "continue"
        },
        options: {
            id: "menu_options_draggable",
            text: optionsText,
            type: "options"
        }
    }

    const generateCard = (cardKey = [], isOnTop) => {
        return cardKey.map((name) => {
            const card = cardData[name];
            return (
                <DraggableCard className="menu_cards"
                    id={card.id}
                    key={name}
                    text={card.text}
                    type={card.type}
                    textSelected={textSelected}
                    setTextSelected={setTextSelected}
                    onClick={() => setParent(null)}
                    isDisabled={card.isDisabled}
                    isOnTop={isOnTop}
                />
            );
        })
    }

    const cardsFromBelow = () => {
        switch (parent) {
            case "menu_continue_draggable":
                return generateCard(["new_game", "options"]);
            case "menu_options_draggable":
                return generateCard(["new_game", "continue"]);
            case "menu_new_game_draggable":
                return generateCard(["continue", "options"]);
            default:
                return generateCard(["new_game", "continue", "options"]);
        }
    }

    const cardFromAbove = () => {
        if (parent) {
            const cardKey = parent.replace("menu_", "").replace("_draggable", "");
            return generateCard([cardKey], true);
        }
        return null;
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
                            {cardFromAbove()}
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
