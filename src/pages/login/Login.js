// styles
import "./Login.css";

// react
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// images
import eye from '../../assets/images/login/eye.png';
import eyeHide from '../../assets/images/login/eye_hide.png';

// json
import en from '../../assets/locales/en.json';

// services
import { UserService } from '../../service/index';

// external
import { Modal } from "react-bootstrap";

const Login = () => {
    const [isPasswordType, setIsPasswordType] = useState(true);
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const afterLoginTextRef = useRef();

    const [user, setUser] = useState({
        "username": "",
        "password": ""
    });
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [afterLoginText, setAfterLoginText] = useState('');

    const json = en.login_register;

    const handleClickPasswordEye = () => {
        setIsPasswordType(!isPasswordType);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const animateText = (textArray, index) => {
        if (index < textArray.length) {
            setTimeout(() => {
                setAfterLoginText(textArray[index]);
                animateText(textArray, index + 1);
            }, 5000);
        } else {
            setTimeout(() => {
                navigate("/play");
            }, 2000);
        }
    }

    const handleLoginAnimation = () => {
        setIsFadingOut(true);

        const textArray = [json.long_time, json.who_am_i, json.only_thing, json.be_careful, ""];
        animateText(textArray, 0);
    };

    const handleSubmit = async () => {
        const loginResult = await UserService.login(user);
        if (loginResult) {
            handleLoginAnimation();
        } else {
            usernameRef.current.style.borderColor = "red";
            passwordRef.current.style.borderColor = "red";
        }
    }

    return (<>
        <form className="login_container" onSubmit={() => { }}>
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
                                name="username"
                                type="text"
                                ref={usernameRef}
                                onChange={handleChange} />
                        </div>
                        <div className="login_modal_body_password">
                            <span className="login_modal_body_password_span">
                                {json.password}
                            </span>
                            <div className="login_modal_body_password_input_container">
                                <input className="login_modal_body_password_input"
                                    name="password"
                                    type={isPasswordType ? "password" : "text"}
                                    ref={passwordRef}
                                    onChange={handleChange} />
                                <button className="login_modal_body_password_button"
                                    onClick={handleClickPasswordEye}>
                                    <img className="login_modal_body_password_image"
                                        src={isPasswordType ? eye : eyeHide}
                                        alt={json.show_password} />
                                </button>
                            </div>
                        </div>
                        <div className="login_modal_body_submit">
                            <button className="login_modal_body_submit_button"
                                onClick={handleSubmit}>
                                {json.submit}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </form>
        {isFadingOut && (
            <div className="login_fade_out">
                <span key={afterLoginText} className={`login_fade_out_text ${isFadingOut ? 'login_fade_out_typing_animation' : ''}`} ref={afterLoginTextRef}>
                    {afterLoginText}
                </span>
            </div>
        )}
    </>);
}

export default Login;