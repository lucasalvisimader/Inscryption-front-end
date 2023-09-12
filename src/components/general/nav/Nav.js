import { Dropdown, Nav } from 'react-bootstrap';
import "./Nav.css";
import { UserService } from '../../../service';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Navbar() {
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchUser() {
            try {
                if (Cookies.get("JWT")) {
                    const userResponse = await UserService.getUser();
                    if (userResponse) {
                        setUser(userResponse.data);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, []);

    async function deleteAccount() {
        async function fetchDelete() {
            try {
                await UserService.remove(user.id);
            } catch (error) {
                console.error(error);
            }
        }
        fetchDelete();
    }

    function exitAccount() {
        Cookies.remove("JWT");
        window.location.href = "/";
    }
    console.log(user)

    return (
        <Nav id="nav">
            <Nav.Item className='title'>Inscryption Trump</Nav.Item>
            {!(user.authorities) ? (
                <>
                    <Nav.Link className='login' href="login">
                        Login
                    </Nav.Link>
                    <Dropdown>
                        <Dropdown.Toggle className='register_dropdown' variant="success" id="dropdown-basic">
                            Register
                            <Dropdown.Menu>
                                <Dropdown.Item href="User-register">
                                    User
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Toggle>
                    </Dropdown>
                </>
            ) : (
                <>
                    {user.authorities[0] === "ADMIN" ? (
                    <>
                        <Nav.Item>
                            <Dropdown>
                                    <Dropdown.Toggle className='register_dropdown' variant="success" id="dropdown-basic">
                                        Register
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="Card-register">
                                                Card
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Toggle>
                            </Dropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <Dropdown>
                                <Dropdown.Toggle className='show_dropdown' variant="success" id="dropdown-basic">
                                    Show
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="Show-all-cards">
                                        All cards
                                    </Dropdown.Item>
                                    <Dropdown.Item href="Show-one-card">
                                        One card
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                    </>) : user.authorities[0] === "PLAYER" ? (
                    <Nav.Link className='play' href="play">
                        Play
                    </Nav.Link>) : null}
                    <Nav.Item>
                        <button className='exit_account' onClick={exitAccount}>
                            Exit Account
                        </button>
                    </Nav.Item>
                    {user.authorities[0] === "PLAYER" ? (
                        <button className='delete_account' onClick={deleteAccount}>
                            Delete Account
                        </button>
                    ) : null}
                </>
            )}
        </Nav>
    );
}

export default Navbar;
