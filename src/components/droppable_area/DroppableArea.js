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
    const [isOptionsCard, setIsOptionsCard] = useState(false);

    // This use effect is responsible for toggling the background image attribute from the droppable area each 750ms.
    useEffect(() => {
        let interval;
        if (props.startedDrag) {
            interval = setInterval(() => {
                setToggleBackground((prevToggle) => !prevToggle);
            }, 750);
        }
        return () => {
            clearInterval(interval);
        }
    }, [props.startedDrag]);

    // This use effect is used to change the background image.
    useEffect(() => {
        if (inputCardRef.current) {
            if (props.startedDrag && !toggleBackground) {
                inputCardRef.current.style.background = `url(${slotHighlighted})`;
            } else if (props.startedDrag === false) {
                inputCardRef.current.style.background = `url(${slotMediumlighted})`;
            } else {
                inputCardRef.current.style.background = `url(${slot})`;
            }
            inputCardRef.current.style.backgroundSize = "contain";
            inputCardRef.current.style.backgroundRepeat = "no-repeat";
        }
    }, [toggleBackground, props.startedDrag]);

    // This use effect is used to make the options modal show or disappear.
    useEffect(() => {
        setIsOptionsCard(props?.children && (props?.children[0].key === "menu_options_draggable") ? true : false);
    }, [props]);

    return (<>
        <div className="droppable_menu_body_container" ref={setNodeRef}>
            <div className="droppable_menu_body">
                <div className={`${isOptionsCard ? "droppable_menu_input_card_with_top_card" : ""}`} id="droppable_menu_input_card" ref={inputCardRef}>
                    {props.children}
                </div>
            </div>
        </div>
        <ModalOptionsCard show={isOptionsCard} />
    </>);
}
