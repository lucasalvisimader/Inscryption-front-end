import {Button, Form} from 'react-bootstrap';
import {UserService} from '../../../service';
import {useState} from 'react';
import "./Login.css";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
        e.preventDefault()
        try {
            await UserService.login({username: username, password: password})
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form id="login">
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control id="name" name='name' type="text"
                              placeholder="Name" value={username} onChange={(event) => setUsername(event.target.value)}
                              required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control id="password" name='password' type="password"
                              placeholder="Password" value={password}
                              onChange={(event) => setPassword(event.target.value)} required/>
            </Form.Group>
            <Button id='button_login' variant="primary" onClick={(e) => handleLogin(e)}>
                Submit
            </Button>
        </Form>
    );
}

export default Login;