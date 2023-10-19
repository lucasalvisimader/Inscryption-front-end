// styles
import "./ModalOptionsCard.css"

// react
import { useRef, useState } from "react";

// external
import { Modal } from "react-bootstrap";
import Select from "react-select/dist/declarations/src/Select";

const ModalOptionsCard = ({ show }) => {
    const sigilsRef = useRef();

    const [selectedOptions, setSelectedOptions] = useState([]);

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
                <h4>Centered Modal</h4>
                <div >
                    <div>-</div>
                    <Select ref={sigilsRef}
                        id="sigils"
                        isMulti required name='sigilsTypes'
                        data-test="sigils"
                        value={selectedOptions}
                        onChange={() => setSelectedOptions(selectedOptions)}
                        classNamePrefix="select"
                        options={sigilOptions} />
                    <div>+</div>
                </div>
            </Modal.Body>
        </Modal>
    </>);
}

export default ModalOptionsCard;