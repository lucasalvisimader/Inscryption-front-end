import {Button, Form} from 'react-bootstrap';
import "./Login.css";

function Login() {
  function getLogin(event) {
    event.preventDefault();
    alert("Email: " + document.getElementById("name").value + 
    "\nPassword: " + document.getElementById("password").value)
  }

  return (
    <Form id="login" onSubmit={getLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control id="name" type="text" placeholder="Name" required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control id="password" type="password" placeholder="Password" required/>
      </Form.Group>
      <Button id='button_login' variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;