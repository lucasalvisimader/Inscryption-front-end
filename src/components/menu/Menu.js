// styles
import "./Menu.css"

const Menu = () => {

    return (<>
        <div className="menu_container">
            <div className="menu_header">

            </div>
            <div className="menu_body_container">
                <div className="menu_body">
                    <div id="menu_input_card" />
                </div>
            </div>
            <div className="menu_footer">
                <div className="menu_cards" id="menu_new_game_card" />
                <div className="menu_cards" id="menu_continue_card" />
                <div className="menu_cards" id="menu_options_card" />
            </div>
        </div>
    </>);
}

export default Menu;
