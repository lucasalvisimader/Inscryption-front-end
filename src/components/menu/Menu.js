// styles
import "./Menu.css"

// react
import { useState } from "react";

// images
import continueText from '../../assets/images/menu/texts/continue.png'
import optionsText from '../../assets/images/menu/texts/options.png'

const Menu = () => {
    const [textSelected, setTextSelected] = useState('');

    const handleHoverCard = (text) => {
        setTextSelected(text);
    }

    return (<>
        <div className="menu_container">
            <div className="menu_header">
                <img className="menu_card_text_selected" src={textSelected} />
            </div>
            <div className="menu_body_container">
                <div className="menu_body">
                    <div id="menu_input_card" />
                </div>
            </div>
            <div className="menu_footer">
                <div className="menu_cards" id="menu_new_game_card" />
                <div className="menu_cards" id="menu_continue_card"
                    onMouseEnter={() => handleHoverCard(continueText)}
                    onMouseLeave={() => handleHoverCard('')} />
                <div className="menu_cards" id="menu_options_card"
                    onMouseEnter={() => handleHoverCard(optionsText)}
                    onMouseLeave={() => handleHoverCard('')} />
            </div>
        </div>
    </>);
}

export default Menu;
