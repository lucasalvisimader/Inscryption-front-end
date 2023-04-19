import {Button, Form} from 'react-bootstrap';
import { UserService } from '../../service';
import { useState } from 'react';
import Cookies from 'js-cookie';
import "./Login.css";

function Login(props) {

  // const [user, setUser] = useState({
  //   "name" : "",
  //   "password": ""
  // });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const updateUser = (event) => {
  //   setUser({...user, [event.target.name] : event.target.value})
  // }

  async function handleLogin() {
    try {
      const [loginResponse] = await Promise.all([
        UserService.listLogin(username, password)
      ]);
      if (loginResponse.data.id === 1) {
        Cookies.set('isAdmin', true);
        props.setIsAdmin(true);
      } else {
        Cookies.set('isAdmin', false);
        props.setIsAdmin(false);
      }
      Cookies.set('isLoggedIn', true);
      props.setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form id="login" onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control id="name" name='name' type="text"
         placeholder="Name" value={username} onChange={(event) => setUsername(event.target.value)} required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control id="password" name='password' type="password"
         placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
      </Form.Group>
      <Button id='button_login' variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;