// styles
import './DroppableAreaPlay.css';

// react
import { useRef } from 'react';

// images
import cardSlot from '../../../assets/images/game/slots/card_slot.png';

// external
import { useDroppable } from '@dnd-kit/core';

export function DroppableAreaPlay(props) {
    const card = props.children;
    const id = props.id;
    const { setNodeRef } = useDroppable({ id: id });
    const inputCardRef = useRef();
    const styleDroppableAreaPlay = {background: `url(${cardSlot})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}

    return (<>
        <div className='droppable_play_body_container' ref={setNodeRef}>
            <div className='droppable_play_body'>
                <div className={`droppable_play_input_card`} ref={inputCardRef} style={styleDroppableAreaPlay}>
                    {card}
                </div>
            </div>
        </div>
    </>);
}