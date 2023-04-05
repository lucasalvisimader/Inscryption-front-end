import {Nav} from 'react-bootstrap';
import {Dropdown} from 'react-bootstrap';
import "./Nav.css";

function Navbar() {
  return (
    <Nav id="nav">
      <Nav.Item className='title'>Inscryption Trump</Nav.Item>
      <Nav.Item>
        <Nav.Link className='login' href="login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle className='register_dropdown' variant="success" id="dropdown-basic">Register</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="User-register">User</Dropdown.Item>
            <Dropdown.Item href="Card-register">Card</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle className='show_dropdown' variant="success" id="dropdown-basic">Show</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="Show-all-cards">All cards</Dropdown.Item>
            <Dropdown.Item href="Show-one-card">One card</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle className='play_dropdown' variant="success" id="dropdown-basic">Play</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="Play-computer">Computer</Dropdown.Item>
            <Dropdown.Item href="Play-player">Player</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;