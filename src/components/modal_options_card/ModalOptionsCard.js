// styles
import "./ModalOptionsCard.css"

// react
import { useState } from "react";

// images
import languageText from '../../assets/images/menu/texts/language.png'
import minusEnable from '../../assets/images/menu/options/minus_enable.png'
import minusDisable from '../../assets/images/menu/options/minus_disable.png'
import plusEnable from '../../assets/images/menu/options/plus_enable.png'
import plusDisable from '../../assets/images/menu/options/plus_disable.png'

// json
import en from '../../assets/locales/en.json'

// external
import { Modal } from "react-bootstrap";

const ModalOptionsCard = ({ show }) => {
    const languageOptions = en.languages;
    const [selectedOption, setSelectedOption] = useState(0);
    const [languageChosen, setLanguageChosen] = useState(languageOptions[selectedOption]);

    const json = en.menu;

    const handleChangeLanguage = (isNext) => {
        let newSelectedOption;

        if (isNext) {
            newSelectedOption = selectedOption < 2 ? selectedOption + 1 : 0;
        } else {
            newSelectedOption = selectedOption > 0 ? selectedOption - 1 : 2;
        }

        setSelectedOption(newSelectedOption);
        setLanguageChosen(languageOptions[newSelectedOption]);
    }

    return (<>
        <Modal className="modal_options_card_container"
            contentClassName="modal_options_container_dialog"
            id="modal_options_card_container"
            size="md"
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            centered>
            <Modal.Body>
                <img className="modal_options_card_language_text" src={languageText} alt={json.language_text}/>
                <div className="modal_options_card_language_container">
                    <img className="modal_options_card_button" src={minusEnable} alt={json.minus_button}
                        onClick={() => handleChangeLanguage(false)} />
                    <span className="modal_options_card_language_chosen">
                        {languageChosen}
                    </span>
                    <img className="modal_options_card_button" src={plusEnable} alt={json.plus_button}
                        onClick={() => handleChangeLanguage(true)} />
                </div>
            </Modal.Body>
        </Modal>
    </>);
}

export default ModalOptionsCard;