// styles
import "./MenuOptions.css";

// react
import { useEffect, useState } from "react";

// images
import continueText from '../../../assets/images/menu/texts/continue.png';
import optionsText from '../../../assets/images/menu/texts/options.png';
import newGameText from '../../../assets/images/menu/texts/newgame_greyed.png';
import quitText from '../../../assets/images/menu/texts/quit.png';
import backgroundGlitch from '../../../assets/images/screen/background_new_game.gif';

// translation
import { useTranslation } from "react-i18next";

// external
import { DraggableCardMenu } from '../draggable_card_menu/DraggableCardMenu';
import { DroppableAreaMenu } from "../droppable_area_menu/DroppableAreaMenu";
import { DndContext } from '@dnd-kit/core';

const Menu = () => {
    const [textSelected, setTextSelected] = useState(null);
    const [parent, setParent] = useState(null);
    const [isGlitchy, setIsGlitchy] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [clickedCard, setClickedCard] = useState(false);
    const [startedDrag, setStartedDrag] = useState(null);
    const { t } = useTranslation();

    // This functions handle the action of the start of the dragging of a card.
    const handleDragStart = () => {
        setClickedCard(true);
        setStartedDrag(true);
    }
    
    // This functions handle the action of the end of the dragging of a card.
    const handleDragEnd = (result) => {
        setClickedCard(false);
        setStartedDrag(false);
        if (result.active && result.over) {
            setParent(result.active.id);
        } else {
            setParent(null);
        }
    }

    // This function gives all the information of the menu cards that are needed to render afterwards.
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

    // This function constructs the props that will be used to make the draggable cards.
    const generateDraggableCardProps = (card, name, isOnTop) => {
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

    // This function is the one responsible to make all the cards in the menu.
    const generateCard = (cardKey = [], isOnTop) => {
        return cardKey.map((name) => {
            const props = generateDraggableCardProps(cardData[name], name, isOnTop);
            return (<DraggableCardMenu key={props.id} className="menu_cards" props={props}/>);
        })
    }

    // This function is responsible for making the switch to know which card has to be shown in the cards from below.
    const switchGenerateCardFromBelow = () => {
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

    // This is the function responsible for updating the cards from below.
    const cardsFromBelow = () => {
        return switchGenerateCardFromBelow().map((card, index) => (
            <div className="menu_card" key={index}>
                {card}
            </div>
        ))
    }

    // This is the function responsible for updating the card chosen.
    const cardCenter = () => {
        if (parent) {
            const cardKey = parent.replace("menu_", "").replace("_draggable", "");
            const cardOnTop = generateCard([cardKey], true);
            return cardOnTop;
        }
        return null;
    }

    // This is the function that animates the cards entering from the right.
    const animateCards = () => {
        const menuCards = document.querySelectorAll(".menu_card");
        menuCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("menu_card_animate");
                card.classList.remove("menu_card");
            }, 500 * index);
        });
    }

    // This function calls the animation cards function to animate the cards every time a card comes back from the center.
    useEffect(() => {
        animateCards();
    }, [parent])

    return (<>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
            <div className="menu_container">
                <div className="menu_header">
                    {textSelected && <img className="menu_card_text_selected" src={textSelected} alt={t('text_selected')}/>}
                </div>
                <div className="menu_body_container">
                    <div className="menu_body">
                        <DroppableAreaMenu id="menu_droppable" startedDrag={startedDrag} setStartedDrag={setStartedDrag}>
                            {cardCenter()}
                        </DroppableAreaMenu>
                    </div>
                </div>
                <div className="menu_footer">
                    {cardsFromBelow()}
                </div>
                {isGlitchy && <img className="menu_card_new_game_image_glitch" src={backgroundGlitch} alt={t('background_glitch')}/>}
                {isFadingOut && <div className="menu_card_fade_out"/>}
            </div>
        </DndContext>
    </>);
}

export default Menu;