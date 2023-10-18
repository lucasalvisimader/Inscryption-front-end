// styles
import "./Menu.css"

// react
import { useState } from "react";

// images
import continueText from '../../assets/images/menu/texts/continue.png'
import optionsText from '../../assets/images/menu/texts/options.png'

// json
import en from '../../assets/locales/en.json'

const Menu = () => {
    const [textSelected, setTextSelected] = useState();
    const [clickedCard, setClickedCard] = useState(false);
    const json = en.menu;

    const handleHoverCard = (text) => {
        setTextSelected(text);
    }

    const handleClickCard = (text) => {
        setTextSelected(text);
        setClickedCard(true);
    }

    const handleExitCard = () => {
        setTextSelected();
        setClickedCard(false);
    }

    return (<>
        <div className="menu_container">
            <div className="menu_header">
                {textSelected &&
                    <img className="menu_card_text_selected" src={textSelected} alt={json.text_selected} />
                }
            </div>
            <div className="menu_body_container">
                <div className="menu_body">
                    <div id="menu_input_card" />
                </div>
            </div>
            <div className="menu_footer">
                <div className="menu_cards" id="menu_new_game_card" />
                <div className={`menu_cards 
                    ${textSelected === continueText ? "menu_on_hover_card_mouse" : ""} 
                    ${clickedCard ? "menu_on_click_card_mouse" : ""}`}
                    id="menu_continue_card"
                    onMouseEnter={() => handleHoverCard(continueText)}
                    onMouseLeave={() => handleExitCard()}
                    onClick={() => handleClickCard(continueText)} />
                <div className={`menu_cards 
                    ${textSelected === optionsText ? "menu_on_hover_card_mouse" : ""} 
                    ${clickedCard ? "menu_on_click_card_mouse" : ""}`}
                    id="menu_options_card"
                    onMouseEnter={() => handleHoverCard(optionsText)}
                    onMouseLeave={() => handleExitCard()}
                    onClick={() => handleClickCard(optionsText)} />
            </div>
        </div>
    </>);
}

export default Menu;
