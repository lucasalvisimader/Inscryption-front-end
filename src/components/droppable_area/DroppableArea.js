// styles
import './DroppableArea.css'

// react
import React from 'react';

// components
import ModalOptionsCard from '../modal_options_card/ModalOptionsCard';

// external
import { useDroppable } from '@dnd-kit/core';

export function DroppableArea(props) {
    const { setNodeRef } = useDroppable({ id: props.id });

    const isOptionsCard = () => {
        return (props?.children && (props?.children[0].props.id === "menu_options_draggable") ? true : false);
    }

    return (<>
        <div className="droppable_menu_body_container" ref={setNodeRef}>
            <div className="droppable_menu_body">
                <div className={isOptionsCard() ? "droppable_menu_input_card_with_top_card" : ""} id="droppable_menu_input_card">
                    {props.children}
                </div>
            </div>
        </div>
        <ModalOptionsCard show={isOptionsCard()} />
    </>);
}
