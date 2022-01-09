import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { userLoggedOut } from "../../store/slices/user";
import { resetApiCallState } from "../../store/slices/apiCall";
import { resetHotelsState } from "../../store/slices/hotels";

// import classes from './Header.module.css';
// import useSearch from '../../hooks/useSearch';

const Header = () => {
  const { username, role } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("Removed token from localStorage. User has just logged out!");

    dispatch(userLoggedOut());
    dispatch(resetApiCallState());
    dispatch(resetHotelsState());
    navigate("/");
  };

  return (
    <header>
      {console.log("Header Rendering")}

      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Notebooking</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {username && (
                <>
                  <LinkContainer
                    to={`/profile/${username}/${
                      role === "user" ? "cart" : "myhotels"
                    }`}
                  >
                    <Nav.Link>
                      {role === "user" ? "My Cart" : "My Hotels"}
                    </Nav.Link>
                  </LinkContainer>
                  {role === "operator" && (
                    <>
                      <LinkContainer to={`/profile/${username}/addhotel`}>
                        <Nav.Link>Add hotel</Nav.Link>
                      </LinkContainer>

                      <LinkContainer
                        to={`/profile/${username}/my-reservations`}
                      >
                        <Nav.Link>My Reservations</Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                </>
              )}
            </Nav>

            {username && (
              <NavDropdown title={username} id="userName">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>{username}</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {!username && (
              <LinkContainer to="/login">
                <Nav.Link className="text-secondary">
                  <i className="far fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
