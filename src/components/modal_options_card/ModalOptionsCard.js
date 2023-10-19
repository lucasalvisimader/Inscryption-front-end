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
    const [selectedOption, setSelectedOption] = useState(languageOptions[0]);

    const handleChangeLanguage = () => {
        
    }

    return (<>
        <Modal className="modal_options_card_container"
            id="main_modal"
            size="sm"
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            centered>
            <Modal.Body>
                <label>Aあ</label>
                <div className="modal_options_card_language_container">
                    <button>{'<'}</button>
                    <div>{selectedOption}</div>
                    <button>{'>'}</button>
                </div>
            </Modal.Body>
        </Modal>
    </>);
}

export default ModalOptionsCard;