import {Dropdown} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import "./Nav.css";
import { UserService } from '../../service';
import Cookies from 'js-cookie';

function Navbar(props) {
  async function deleteAccount() {
    const [user] = await Promise.all([
      UserService.listLogin(props.username, props.password)
    ]);
    UserService.remove(user.data.id);
    Cookies.set('isAdmin', false);
    Cookies.set('isLoggedIn', false);
    Cookies.set('username', '');
    Cookies.set('password', '');
    window.location.reload();
  }

  if (props.isAdmin) {
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
  } else if (props.isLoggedIn) {
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
        <Nav.Item>
          <Nav.Item>
            <button className='deleteAccount' onClick={deleteAccount}>Delete Account</button>
          </Nav.Item>
        </Nav.Item>
      </Nav>
    );
  } else {
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
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      </Nav>
    );
  }
}

export default Navbar;