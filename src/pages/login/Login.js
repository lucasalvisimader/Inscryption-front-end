// styles
import "./Login.css";

// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// images
import eye from '../../assets/images/login/eye.png';
import eyeHide from '../../assets/images/login/eye_hide.png';

// json
import en from '../../assets/locales/en.json';

// external
import { Modal } from "react-bootstrap";

const Login = () => {
    const [isPasswordType, setIsPasswordType] = useState(true);
    const navigate = useNavigate();
    const json = en.login;

    const handleClickPasswordEye = () => {
        setIsPasswordType(!isPasswordType);
    }

    return (<>
        <div className="login_container">
            <Modal className="login_modal_container"
                contentClassName="modal_options_container_dialog"
                id="modal_options_card_container"
                size="lg"
                show={true}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={false}
                centered>
                <Modal.Body>
                    <div className="login_modal_greeting">
                        <span className="login_modal_greeting_span">
                            {json.good_luck}
                        </span>
                        <button className="login_modal_greeting_button"
                            onClick={() => navigate("/register")}>
                            {json.register}
                        </button>
                    </div>
                    <div className="login_modal_body_container">
                        <div className="login_modal_body_username">
                            <span className="login_modal_body_username_span">
                                {json.username}
                            </span>
                            <input className="login_modal_body_username_input"
                                type="text" />
                        </div>
                        <div className="login_modal_body_password">
                            <span className="login_modal_body_password_span">
                                {json.password}
                            </span>
                            <div className="login_modal_body_password_input_container">
                                <input className="login_modal_body_password_input"
                                    type={isPasswordType ? "password" : "text"} />
                                <button className="login_modal_body_password_button"
                                    onClick={handleClickPasswordEye}>
                                    <img className="login_modal_body_password_image"
                                        src={isPasswordType ? eye : eyeHide}
                                        alt={json.show_password} />
                                </button>
                            </div>
                        </div>
                        <div className="login_modal_body_submit">
                            <button className="login_modal_body_submit_button">
                                {json.submit}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    </>);
}

export default Login;