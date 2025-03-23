// styles
import './DroppableAreaPlay.css';

// react
import { useMemo, useRef } from 'react';

// images
import cardSlot from '../../../assets/images/game/slots/card_slot.png';

// external
import { useDroppable } from '@dnd-kit/core';

export function DroppableAreaPlay({ id, children}) {
    const { setNodeRef } = useDroppable({ id });
    const inputCardRef = useRef();
    const styleDroppableAreaPlay = useMemo(() => ({
        background: `url(${cardSlot})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    }), []);

    return (<>
        <div className='droppable_play_body_container' ref={setNodeRef}>
            <div className='droppable_play_body'>
                <div className={`droppable_play_input_card`} ref={inputCardRef} style={styleDroppableAreaPlay}>
                    {children}
                </div>
            </div>
        </div>
    </>);
}