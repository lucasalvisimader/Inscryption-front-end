// styles
import './DroppableArea.css'

// react
import React, { useEffect, useRef, useState } from 'react';

// components
import ModalOptionsCard from '../modal_options_card/ModalOptionsCard';

// images
import slotHighlighted from '../../assets/images/menu/cards/slot_highlighted.png';
import slotMediumlighted from '../../assets/images/menu/cards/slot_mediumlighted.png';
import slot from '../../assets/images/menu/cards/slot.png';

// external
import { useDroppable } from '@dnd-kit/core';

export function DroppableArea(props) {
    const { setNodeRef } = useDroppable({ id: props.id });
    const inputCardRef = useRef();
    const [toggleBackground, setToggleBackground] = useState(false);

    const isOptionsCard = () => {
        return (props?.children && (props?.children[0].props.id === "menu_options_draggable") ? true : false);
    }

    useEffect(() => {
        let interval;
        if (props.startedDrag) {
            interval = setInterval(() => {
                setToggleBackground((prevToggle) => !prevToggle);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        }
    }, [props.startedDrag]);

    useEffect(() => {
        if (inputCardRef.current) {
            if (props.startedDrag) {
                inputCardRef.current.style.background = `url(${slotHighlighted})`;
            } else if (props.startedDrag === false) {
                inputCardRef.current.style.background = `url(${slotMediumlighted})`;
            } else {
                inputCardRef.current.style.background = `url(${slot})`;
            }
            inputCardRef.current.style.backgroundSize = "contain";
            inputCardRef.current.style.backgroundRepeat = "no-repeat";
        }
    }, [toggleBackground, props.startedDrag])

    return (<>
        <div className="droppable_menu_body_container" ref={setNodeRef}>
            <div className="droppable_menu_body">
                <div className={`${isOptionsCard() ? "droppable_menu_input_card_with_top_card" : ""}`}
                    id="droppable_menu_input_card"
                    ref={inputCardRef}>
                    {props.children}
                </div>
            </div>
        </div>
        <ModalOptionsCard show={isOptionsCard()} />
    </>);
}
