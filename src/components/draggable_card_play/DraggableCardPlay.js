// styles
import './DraggableCardPlay.css';

// react
import { Fragment } from 'react';

// json
import en from '../../assets/locales/en.json';

// external
import {v4 as uuidV4} from 'uuid';

export function DraggableCardPlay(card) {
    const json = en.play;
    const cardStyle = { backgroundImage: `url('/images/imageType/${card?.imageType}.png')` };

    return (<Fragment key={uuidV4()}>
        <div className='draggable_card_play_container' style={cardStyle}>
            <img className='draggable_card_play_image'
            src={require(`../../assets/images/card/image_type/${card.imageType.toLowerCase()}.png`)}
            alt={json.card_image} />
        </div>
    </Fragment>);
}