// styles
import "./ModalOptionsCard.css"

// react
import { useState } from "react";

// images
import languageText from '../../assets/images/menu/texts/language.png';
import minusEnable from '../../assets/images/menu/options/minus_enable.png';
import minusDisable from '../../assets/images/menu/options/minus_disable.png';
import plusEnable from '../../assets/images/menu/options/plus_enable.png';
import plusDisable from '../../assets/images/menu/options/plus_disable.png';
import volumeOptionEnable from '../../assets/images/menu/options/sound_icon_enable.png';
import volumeOptionDisable from '../../assets/images/menu/options/sound_icon_disable.png';

// context
import { useAudio } from '../../context/AudioContext';

// json
import en from '../../assets/locales/en.json';

// external
import { Modal } from "react-bootstrap";

const ModalOptionsCard = ({ show }) => {
    const languageOptions = en.languages;
    const [selectedOption, setSelectedOption] = useState(0);
    const [languageChosen, setLanguageChosen] = useState(languageOptions[selectedOption]);
    const [volumeChosen, setVolumeChosen] = useState(6);

    const { volume, setVolume } = useAudio();
    const json = en.menu;

    const volumeOptions = () => {
        return [...Array(6)].map((_, i) => (
            <img className="modal_options_card_volume_icon"
                key={i}
                src={volumeChosen > i ? volumeOptionEnable : volumeOptionDisable}
                alt={`Volume Option ${i}`}
            />
        ));
    }

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

    const handleChangeMainVolume = (isNext) => {
        if (isNext) {
            if (volume + (100 / 6) < 100) {
                setVolume(volume + (100 / 6));
            } else {
                setVolume(100);
            }
            setVolumeChosen(volumeChosen < 6 ? volumeChosen + 1 : 6);
        } else {
            if (volume - (100 / 6) > 0) {
                setVolume(volume - (100 / 6));
            } else {
                setVolume(0);
            }
            setVolumeChosen(volumeChosen > 0 ? volumeChosen - 1 : 0);
        }
    }

    return (<>
        <Modal className="modal_options_card_container"
            contentClassName="modal_options_container_dialog"
            id="modal_options_card_container"
            size="lg"
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            centered>
            <Modal.Body>
                <div className="modal_options_card_language_container">
                    <img className="modal_options_card_language_text" src={languageText} alt={json.language_text} />
                    <div className="modal_options_card_language_container_options">
                        <img className="modal_options_card_button" src={minusEnable} alt={json.minus_button}
                            onClick={() => handleChangeLanguage(false)} />
                        <span className="modal_options_card_language_chosen">
                            {languageChosen}
                        </span>
                        <img className="modal_options_card_button" src={plusEnable} alt={json.plus_button}
                            onClick={() => handleChangeLanguage(true)} />
                    </div>
                </div>
                <div className="modal_options_card_main_volume_container">
                    <span className="modal_options_card_main_volume_text">
                        {json.main_volume}
                    </span>
                    <div className="modal_options_card_language_container_options">
                        <img className="modal_options_card_button" src={minusEnable} alt={json.minus_button}
                            onClick={() => handleChangeMainVolume(false)} />
                        <div className="modal_options_card_volume_options">
                            {volumeOptions()}
                        </div>
                        <img className="modal_options_card_button" src={plusEnable} alt={json.plus_button}
                            onClick={() => handleChangeMainVolume(true)} />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>);
}

export default ModalOptionsCard;