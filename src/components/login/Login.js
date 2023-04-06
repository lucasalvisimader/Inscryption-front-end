// import { UserService } from '../../service/UserService';
import {Button, Form} from 'react-bootstrap';
// import { useState, useRef, useEffect } from 'react';
// import Select from 'react-select';
import "./Login.css";

function Login() {
  function getLogin() {
    alert("Name: " + document.getElementById("name").value + 
    "\nPassword: " + document.getElementById("password").value)
    // "\nTypeUser: " + userRef.current.value)
  }

  // const userRef = useRef();

  // const [userOptions, setUserOptions] = useState([]);

  // useEffect(() => {
  //   UserService.getUsers()
  //     .then(response => {
  //       setUserOptions(response.data.map(user => ({
  //         value: user,
  //         label: user
  //       }))
  //     )}).catch(e => {
  //       console.log(e);
  //     })
  // }, [])

  return (
    <Form id="login" onSubmit={getLogin}>
      {/* <Form.Group className="mb-3">
        <Form.Label>User</Form.Label>
        <Select ref={userRef} required 
        placeholder="user" options={userOptions}
        onChange={(option) => 
        userRef.current.value = option.value}/>
      </Form.Group> */}
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