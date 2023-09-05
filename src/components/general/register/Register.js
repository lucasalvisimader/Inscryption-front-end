import { UserService } from '../../../service';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import "./Register.css";

function Register() {
    const [user, setUser] = useState({
        "name": "",
        "password": "",
        "cards": []
    });
    
    const updateUser = (event) => {
        setUser({...user, [event.target.name] : event.target.value})
    }
    
    const submitUser = async (e) => {
        e.preventDefault()
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm_password").value;

        if(password !== confirmPassword) {
            document.getElementById("confirm_password").setCustomValidity("Passwords don't match");
        } else {
            document.getElementById("confirm_password").setCustomValidity('');

            try {
                await UserService.save(user);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <Form id="login">
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control id="name" type="text" placeholder="Name" 
                name='name' onChange={updateUser} value={user.name} required/>
            </Form.Group>
            <Form.Group className="mb-3" min="8">
                <Form.Label>Password</Form.Label>
                <Form.Control id="password" type="password" placeholder="Password" 
                name='password' onChange={updateUser} value={user.password} minLength='8' required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control id="confirm_password" type="password" placeholder="Password" 
                minLength='8' required/>
            </Form.Group>
            <Button id='user_register_button' variant="primary" type="submit" onClick={(e) => submitUser(e)}>
                Submit
            </Button>
        </Form>
    );
}

export default Register;