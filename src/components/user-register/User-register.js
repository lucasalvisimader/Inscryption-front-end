import {Button, Form} from 'react-bootstrap';
import "./User-register.css";

function UserRegister() {
    function validatePassword() {
        if(document.getElementById("password").value !== document.getElementById("confirm_password").value) {
            document.getElementById("confirm_password").setCustomValidity("Passwords don't match");
        } else {
            document.getElementById("confirm_password").setCustomValidity('');
        }
        getRegistration();
    }

    function getRegistration(event) {
        event.preventDefault();
        alert("Email: " + document.getElementById("email").value + 
        "\nPassword: " + document.getElementById("password").value)
    }

    return (
        <Form id="login">
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" min="8">
            <Form.Label>Password</Form.Label>
            <Form.Control id="password" type="password" placeholder="Password" minLength='8' required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control id="confirm_password" type="password" placeholder="Password" minLength='8' required/>
        </Form.Group>
        <Button id='user_register_button' variant="primary" type="submit" onClick={validatePassword}>
            Submit
        </Button>
        </Form>
    );
}

export default UserRegister;