// styles
import './NewGameCard.css';

// images
import imageCardPart1 from '../../assets/images/menu/new_game/greyed_1.png';
import imageCardPart2 from '../../assets/images/menu/new_game/greyed_2.png';
import imageCardPart3 from '../../assets/images/menu/new_game/greyed_3.png';
import imageCardPart4 from '../../assets/images/menu/new_game/greyed_4.png';
import imageCardPart5 from '../../assets/images/menu/new_game/greyed_5.png';
import imageCardPart6 from '../../assets/images/menu/new_game/greyed_6.png';
import imageCardPart7 from '../../assets/images/menu/new_game/greyed_7.png';
import imageCardPart8 from '../../assets/images/menu/new_game/greyed_8.png';
import imageCardPart9 from '../../assets/images/menu/new_game/greyed_9.png';
import imageCardPart10 from '../../assets/images/menu/new_game/greyed_10.png';

// json
import en from '../../assets/locales/en.json';

const NewGameCard = () => {
    const json = en.menu;

    return (<>
        <div className='menu_card_new_game_images_container'>
            <img className='menu_card_new_game_image' src={imageCardPart1} alt={json.new_game_card_part} />
            <img className='menu_card_new_game_image' src={imageCardPart2} alt={json.new_game_card_part} />
            <img className='menu_card_new_game_image' src={imageCardPart3} alt={json.new_game_card_part} />
            <img className='menu_card_new_game_image' src={imageCardPart4} alt={json.new_game_card_part} />
            <img className='menu_card_new_game_image' src={imageCardPart5} alt={json.new_game_card_part} />
            <img className='menu_card_new_game_image' src={imageCardPart6} alt={json.new_game_card_part} />
            <img className='menu_card_new_game_image' src={imageCardPart7} alt={json.new_game_card_part} />
            <img className='menu_card_new_game_image' src={imageCardPart8} alt={json.new_game_card_part} />
            <img className='menu_card_new_game_image' src={imageCardPart9} alt={json.new_game_card_part} />
            <img className='menu_card_new_game_image' src={imageCardPart10} alt={json.new_game_card_part} />
        </div>
    </>);
}

export default NewGameCard;