// styles
import "./ModalOptionsCard.css"

// react
import { useState } from "react";

// images
import languageText from '../../assets/images/menu/texts/language.png';
import arrowEnable from '../../assets/images/menu/options/arrow_enable.png';
import arrowDisable from '../../assets/images/menu/options/arrow_disable.png';
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

    // This function returns the images that serve to show the level of volume the game is set in.
    const volumeOptions = () => {
        return [...Array(6)].map((_, i) => <img className="modal_options_card_volume_icon" key={i} src={volumeChosen > i ? volumeOptionEnable : volumeOptionDisable} alt={`Volume Option ${i}`}/>);
    }

    // This function is responsible by handling with the events when the language is changed.
    const handleChangeLanguage = (e, isPlus) => {
        let newSelectedOption;
        newSelectedOption = isPlus ? (selectedOption < 2 ? selectedOption + 1 : 0) : (selectedOption > 0 ? selectedOption - 1 : 2);
        setSelectedOption(newSelectedOption);
        setLanguageChosen(languageOptions[newSelectedOption]);
        e.target.src = arrowDisable;
        setTimeout(() => {
            e.target.src = arrowEnable;
        }, 100);
    }

    // This function is responsible by handling with the events when the master volume is changed.
    const handleChangeMainVolume = (e, isPlus) => {
        const extremeVolume = isPlus ? 100 : 0;
        const sumOrSubtraction = isPlus ? (volume + (100 / 6)) : (volume - (100 / 6));
        if ((sumOrSubtraction < extremeVolume && isPlus) || (sumOrSubtraction > extremeVolume && !isPlus)) {
            setVolume(sumOrSubtraction);
        } else {
            setVolume(extremeVolume);
        }
        isPlus ? setVolumeChosen(volumeChosen < 6 ? volumeChosen + 1 : 6) : setVolumeChosen(volumeChosen > 0 ? volumeChosen - 1 : 0);
        e.target.src = (e.target.alt === json.minus_button) ? minusDisable : plusDisable;
        setTimeout(() => {
            e.target.src = (e.target.alt === json.minus_button) ? minusEnable : plusEnable;
        }, 100);
    }

    return (<>
        <Modal className="modal_options_card_container" contentClassName="modal_options_container_dialog" id="modal_options_card_container" size="lg" show={show} aria-labelledby="contained-modal-title-vcenter" backdrop={false} centered>
            <Modal.Body>
                <div className="modal_options_card_language_container">
                    <img className="modal_options_card_language_text" src={languageText} alt={json.language_text} />
                    <div className="modal_options_card_language_container_options">
                        <img className="modal_options_card_button" src={arrowEnable} alt={json.minus_button} onClick={(e) => handleChangeLanguage(e, false)} />
                        <span className="modal_options_card_language_chosen">
                            {languageChosen}
                        </span>
                        <img className="modal_options_card_button_inverted" src={arrowEnable} alt={json.plus_button} onClick={(e) => handleChangeLanguage(e, true)} />
                    </div>
                </div>
                <div className="modal_options_card_main_volume_container">
                    <span className="modal_options_card_main_volume_text">
                        {json.main_volume}
                    </span>
                    <div className="modal_options_card_language_container_options">
                        <img className="modal_options_card_button" src={minusEnable} alt={json.minus_button} onClick={(e) => handleChangeMainVolume(e, false)} />
                        <div className="modal_options_card_volume_options">
                            {volumeOptions()}
                        </div>
                        <img className="modal_options_card_button" src={plusEnable} alt={json.plus_button} onClick={(e) => handleChangeMainVolume(e, true)} />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>);
}

export default ModalOptionsCard;