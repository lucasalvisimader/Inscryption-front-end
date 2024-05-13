// styles
import "./Menu.css"

// react
import { useEffect, useState } from "react";

// images
import continueText from '../../assets/images/menu/texts/continue.png';
import optionsText from '../../assets/images/menu/texts/options.png';
import newGameText from '../../assets/images/menu/texts/newgame_greyed.png';
import quitText from '../../assets/images/menu/texts/quit.png';
import backgroundGlitch from '../../assets/images/screen/background_new_game.gif';

// json
import en from '../../assets/locales/en.json';

// external
import { DraggableCard } from '../draggable_card/DraggableCard';
import { DroppableArea } from "../droppable_area/DroppableArea";
import { DndContext } from '@dnd-kit/core';

const Menu = () => {
    const [textSelected, setTextSelected] = useState(null);
    const [parent, setParent] = useState(null);
    const [isGlitchy, setIsGlitchy] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [clickedCard, setClickedCard] = useState(false);
    const [startedDrag, setStartedDrag] = useState(null);

    const json = en.menu;

    const handleDragStart = () => {
        setClickedCard(true);
        setStartedDrag(true);
    }

    const handleDragEnd = (result) => {
        setClickedCard(false);
        setStartedDrag(false);
        if (result.active && result.over) {
            setParent(result.active.id);
        } else {
            setParent(null);
        }
    }

    const cardData = {
        new_game: {
            id: "menu_new_game_draggable",
            text: newGameText,
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
        },
        quit: {
            id: "menu_quit_draggable",
            text: quitText,
            type: "quit"
        }
    }

    const generateProps = (card, name, isOnTop) => {
        return {
            id: card.id,
            key: name,
            text: card.text,
            type: card.type,
            textSelected: textSelected,
            setTextSelected: setTextSelected,
            onClick: () => setParent(null),
            clickedCard: clickedCard,
            isDisabled: card.isDisabled,
            isOnTop: isOnTop,
            setIsGlitchy: setIsGlitchy,
            setIsFadingOut: setIsFadingOut
        }
    }

    const generateCard = (cardKey = [], isOnTop) => {
        return cardKey.map((name) => {
            const props = generateProps(cardData[name], name, isOnTop);
            return (
                <DraggableCard key={props.id} className="menu_cards" props={props} />
            );
        })
    }

    const cardsFromBelow = () => {
        switch (parent) {
            case "menu_continue_draggable":
                return generateCard(["new_game", "options", "quit"]);
            case "menu_options_draggable":
                return generateCard(["new_game", "continue", "quit"]);
            case "menu_new_game_draggable":
                return generateCard(["continue", "options", "quit"]);
            case "menu_quit_draggable":
                return generateCard(["new_game", "continue", "options"]);
            default:
                return generateCard(["new_game", "continue", "options", "quit"]);
        }
    }

    const cardFromAbove = () => {
        if (parent) {
            const cardKey = parent.replace("menu_", "").replace("_draggable", "");
            const cardOnTop = generateCard([cardKey], true);
            return cardOnTop;
        }
        return null;
    }

    const animateCards = () => {
        const menuCards = document.querySelectorAll(".menu_card");
        menuCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("menu_card_animate");
                card.classList.remove("menu_card");
            }, 500 * index);
        });
    }

    useEffect(() => {
        animateCards();
    }, [parent])

    return (<>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
            <div className="menu_container">
                <div className="menu_header">
                    {textSelected && (
                        <img className="menu_card_text_selected" src={textSelected} alt={json.text_selected} />
                    )}
                </div>
                <div className="menu_body_container">
                    <div className="menu_body">
                        <DroppableArea id="menu_droppable" startedDrag={startedDrag} setStartedDrag={setStartedDrag}>
                            {cardFromAbove()}
                        </DroppableArea>
                    </div>
                </div>
                <div className="menu_footer">
                    {cardsFromBelow().map((card, index) => (
                        <div className="menu_card" key={index}>
                            {card}
                        </div>
                    ))}
                </div>
                {isGlitchy && (
                    <img className="menu_card_new_game_image_glitch" src={backgroundGlitch} alt={json.background_glitch} />
                )}
                {isFadingOut && (
                    <div className="menu_card_fade_out" />
                )}
            </div>
        </DndContext>
    </>);
}

export default Menu;