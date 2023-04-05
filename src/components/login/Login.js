import {Button, Form} from 'react-bootstrap';
import "./Login.css";

function Login() {
  function getLogin() {
    alert("Email: " + document.getElementById("email").value + 
    "\nPassword: " + document.getElementById("password").value)
  }

  return (
    <Form id="login">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control id="email" type="email" placeholder="Enter email" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control id="password" type="password" placeholder="Password" required/>
      </Form.Group>
      <Button id='button_login' variant="primary" type="submit" onClick={getLogin}>
        Submit
      </Button>
    </Form>
  );
}

export default Login;