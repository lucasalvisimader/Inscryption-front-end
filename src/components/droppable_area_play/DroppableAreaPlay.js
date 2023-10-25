// styles
import './DroppableAreaPlay.css';

// external
import { useDroppable } from '@dnd-kit/core';

export function DroppableAreaPlay(props) {
    const { setNodeRef } = useDroppable({ id: props.id });

    return (<>
        <div ref={setNodeRef}>
            <p>aaaaaaaaaaaa</p>
        </div>
    </>);
}