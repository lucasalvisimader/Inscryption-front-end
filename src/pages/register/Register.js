// styles
import './Register.css';

// react
import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

// images
import eye from '../../assets/images/login/eye.png';
import eyeHide from '../../assets/images/login/eye_hide.png';

// translation
import { useTranslation } from 'react-i18next';

// services
import { UserService } from '../../service';

// external
import { Modal } from "react-bootstrap";

const Register = () => {
    const navigate = useNavigate();
    const [isPasswordType, setIsPasswordType] = useState(true);
    const [isConfirmPasswordType, setIsConfirmPasswordType] = useState(true);
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { t } = useTranslation();

    const handleClickPasswordEye = () => {
        setIsPasswordType(!isPasswordType);
    }

    const handleClickConfirmPasswordEye = () => {
        setIsConfirmPasswordType(!isConfirmPasswordType);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        console.log(user)
        const userRegister = { "username": user.username, "password": user.password }
        console.log(userRegister)
        const loginResult = await UserService.save(userRegister);
        if (loginResult) {
            navigate("/login");
        } else {
            usernameRef.current.style.borderColor = "red";
            passwordRef.current.style.borderColor = "red";
            confirmPasswordRef.current.style.borderColor = "red";
        }
    }

    return (<>
        <form className="register_container" onSubmit={handleSubmit}>
            <Modal className="register_modal_container" contentClassName="modal_options_container_dialog" id="modal_options_card_container" size="lg" show={true} aria-labelledby="contained-modal-title-vcenter" backdrop={false} centered>
                <Modal.Body>
                    <div className="register_modal_greeting">
                        <span className="register_modal_greeting_span">
                            {t('good_luck')}
                        </span>
                        <button className="register_modal_greeting_button" onClick={() => navigate("/login")}>
                            {t('login')}
                        </button>
                    </div>
                    <div className="register_modal_body_container">
                        <div className="register_modal_body_username">
                            <span className="register_modal_body_username_span">
                                {t('username')}
                            </span>
                            <input className="register_modal_body_username_input" type="text" name="username" ref={usernameRef} value={user.username} onChange={handleChange}/>
                        </div>
                        <div className="register_modal_body_password">
                            <span className="register_modal_body_password_span">
                                {t('password')}
                            </span>
                            <div className="register_modal_body_password_input_container">
                                <input className="register_modal_body_password_input" type={isPasswordType ? "password" : "text"} name="password" ref={passwordRef} value={user.password} onChange={handleChange}/>
                                <button className="register_modal_body_password_button" onClick={handleClickPasswordEye}>
                                    <img className="register_modal_body_password_image" src={isPasswordType ? eye : eyeHide} alt={t('show_password')}/>
                                </button>
                            </div>
                        </div>
                        <div className="register_modal_body_password">
                            <span className="register_modal_body_password_span">
                                {t('confirm_password')}
                            </span>
                            <div className="register_modal_body_password_input_container">
                                <input className="register_modal_body_password_input" type={isConfirmPasswordType ? "password" : "text"} name="confirmPassword" ref={confirmPasswordRef} value={user.confirmPassword} onChange={handleChange}/>
                                <button className="register_modal_body_password_button" onClick={handleClickConfirmPasswordEye}>
                                    <img className="register_modal_body_password_image" src={isConfirmPasswordType ? eye : eyeHide} alt={t('show_confirm_password')}/>
                                </button>
                            </div>
                        </div>
                        <div className="register_modal_body_submit">
                            <button className="register_modal_body_submit_button" type='submit' onClick={handleSubmit}>
                                {t('submit')}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </form>
    </>);
}

export default Register;