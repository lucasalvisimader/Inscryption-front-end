// styles
import './Register.css';

// react
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// images
import eye from '../../assets/images/login/eye.png';
import eyeHide from '../../assets/images/login/eye_hide.png';

// json
import en from '../../assets/locales/en.json';

// external
import { Modal } from "react-bootstrap";

const Register = () => {
    const [isPasswordType, setIsPasswordType] = useState(true);
    const [isConfirmPasswordType, setIsConfirmPasswordType] = useState(true);
    const navigate = useNavigate();
    const json = en.login_register;

    const handleClickPasswordEye = () => {
        setIsPasswordType(!isPasswordType);
    }

    const handleClickConfirmPasswordEye = () => {
        setIsConfirmPasswordType(!isConfirmPasswordType);
    }

    return (<>
        <div className="register_container">
            <Modal className="register_modal_container"
                contentClassName="modal_options_container_dialog"
                id="modal_options_card_container"
                size="lg"
                show={true}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={false}
                centered>
                <Modal.Body>
                    <div className="register_modal_greeting">
                        <span className="register_modal_greeting_span">
                            {json.good_luck}
                        </span>
                        <button className="register_modal_greeting_button"
                            onClick={() => navigate("/login")}>
                            {json.login}
                        </button>
                    </div>
                    <div className="register_modal_body_container">
                        <div className="register_modal_body_username">
                            <span className="register_modal_body_username_span">
                                {json.username}
                            </span>
                            <input className="register_modal_body_username_input"
                                type="text" />
                        </div>
                        <div className="register_modal_body_password">
                            <span className="register_modal_body_password_span">
                                {json.password}
                            </span>
                            <div className="register_modal_body_password_input_container">
                                <input className="register_modal_body_password_input"
                                    type={isPasswordType ? "password" : "text"} />
                                <button className="register_modal_body_password_button"
                                    onClick={handleClickPasswordEye}>
                                    <img className="register_modal_body_password_image"
                                        src={isPasswordType ? eye : eyeHide}
                                        alt={json.show_password} />
                                </button>
                            </div>
                        </div>
                        <div className="register_modal_body_password">
                            <span className="register_modal_body_password_span">
                                {json.confirm_password}
                            </span>
                            <div className="register_modal_body_password_input_container">
                                <input className="register_modal_body_password_input"
                                    type={isConfirmPasswordType ? "password" : "text"} />
                                <button className="register_modal_body_password_button"
                                    onClick={handleClickConfirmPasswordEye}>
                                    <img className="register_modal_body_password_image"
                                        src={isConfirmPasswordType ? eye : eyeHide}
                                        alt={json.show_confirm_password} />
                                </button>
                            </div>
                        </div>
                        <div className="register_modal_body_submit">
                            <button className="register_modal_body_submit_button">
                                {json.submit}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    </>);
}

export default Register;