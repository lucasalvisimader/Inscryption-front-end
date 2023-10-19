// styles
import "./ModalOptionsCard.css"

// react
import { useState } from "react";

// json
import en from '../../assets/locales/en.json'

// external
import { Modal } from "react-bootstrap";

const ModalOptionsCard = ({ show }) => {
    const languageOptions = en.languages;
    const [selectedOption, setSelectedOption] = useState(0);
    const [languageChosen, setLanguageChosen] = useState(languageOptions[selectedOption]);

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
            id="modal_options_card_container"
            size="sm"
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            centered>
            <Modal.Body>
                <label>Aあ</label>
                <div className="modal_options_card_language_container">
                    <button className="modal_options_card_button"
                        onClick={() => handleChangeLanguage(false)}>
                        {'<'}
                    </button>
                    <span className="modal_options_card_language_chosen">
                        {languageChosen}
                    </span>
                    <button className="modal_options_card_button"
                        onClick={() => handleChangeLanguage(true)}>
                        {'>'}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    </>);
}

export default ModalOptionsCard;