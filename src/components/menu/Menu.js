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

    const card_continue = () => {
        return (
            <DraggableCard className="menu_cards"
                id="continue_draggable"
                text={continueText}
                type="continue"
                textSelected={textSelected}
                setTextSelected={setTextSelected}
                onClick={handleClickCard}
            />
        );
    }

    const card_options = () => {
        return (
            <DraggableCard className="menu_cards"
                id="options_draggable"
                text={optionsText}
                type="options"
                textSelected={textSelected}
                setTextSelected={setTextSelected}
                onClick={handleClickCard}
            />
        );
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
                        <DroppableArea id="droppable">
                            {/* card de cima */}
                            {parent && (
                                parent === "continue_draggable" ? card_continue() : card_options()
                            )}
                        </DroppableArea>
                    </div>
                </div>
                <div className="menu_footer">
                    {/* card de baixo */}
                    {parent ? (
                        parent === "continue_draggable" ? card_options() : card_continue()
                    ) : (<>
                        {card_continue()}
                        {card_options()}
                    </>)}
                </div>
            </div>
        </DndContext>
    </>);
}

export default Menu;
