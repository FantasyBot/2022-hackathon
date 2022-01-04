import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { userLoggedOut } from "../../store/user";
import { resetApiCallState } from "../../store/apiCall";

// import classes from './Header.module.css';
// import useSearch from '../../hooks/useSearch';

const Header = () => {
  // const {
  //   searchResults,
  //   enteredValue,
  //   searching,
  //   onReset,
  //   onChangeHandler,
  //   onSelectHandler
  // } = useSearch();

  const {
    username = "",
    role = "",
    active = false,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("Removed token from localStorage. User has just logged out!");
    console.log("navigate", navigate);
    dispatch(userLoggedOut());
    dispatch(resetApiCallState());
    navigate("/");
  };

  return (
    <header>
      {console.log("Rendering Header")}

      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Notebooking</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              {username && (
                <LinkContainer
                  to={`/profile/${username}/${
                    active === "customer" ? "cart" : "myhotels"
                  }`}
                >
                  <Nav.Link>
                    {active === "customer" ? "My Cart" : "My Hotels"}
                  </Nav.Link>
                </LinkContainer>
              )}

              {active === "operator" && (
                <LinkContainer to={`/profile/${username}/addhotel`}>
                  <Nav.Link>Add hotel</Nav.Link>
                </LinkContainer>
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

            <LinkContainer to="/login">
              <Nav.Link className="text-secondary">
                <i className="far fa-user"></i>{" "}
                {username ? "Sign Out" : "Sign In"}
              </Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
