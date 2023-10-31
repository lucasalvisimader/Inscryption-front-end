// styles
import './DroppableAreaPlay.css';

// react
import { useRef, useEffect } from 'react';

// images
import cardSlot from '../../assets/images/game/slots/card_slot.png';
import cardQueue from '../../assets/images/game/slots/card_queue_slot.png';

// external
import { useDroppable } from '@dnd-kit/core';

export function DroppableAreaPlay(props) {
    const { setNodeRef } = useDroppable({ id: props.id });
    const inputCardRef = useRef();

    useEffect(() => {
        if (inputCardRef.current) {
            inputCardRef.current.style.background = `url(${!(props.enemyUpComing) ? cardSlot : cardQueue})`;
            inputCardRef.current.style.backgroundSize = "contain";
            inputCardRef.current.style.backgroundRepeat = "no-repeat";
        }
    }, [props.startedDrag]);

    return (<>
        <div className="droppable_play_body_container" ref={setNodeRef}>
            <div className="droppable_play_body">
                <div className={`droppable_play_${props.isInverted ? 'inverted_' : ''}input_card`}
                    ref={inputCardRef}>
                    {props.children}
                </div>
            </div>
        </div>
    </>);
}