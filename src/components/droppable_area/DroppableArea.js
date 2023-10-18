// styles
import './DroppableArea.css'

// react
import React from 'react';

// external
import { useDroppable } from '@dnd-kit/core';

export function DroppableArea(props) {
    const { isOver, setNodeRef } = useDroppable({ id: props.id });
    const style = {
        opacity: isOver ? 1 : 1,
    }

    return (<>
        <div className="droppable_menu_body_container" ref={setNodeRef} style={style}>
            <div className="droppable_menu_body">
                <div id="menu_input_card">
                    {props.children}
                </div>
            </div>
        </div>
    </>);
}
