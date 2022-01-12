import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
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

  const privateRoutes = (
    <React.Fragment>
      {role === "operator" ? (
        <LinkContainer to={`/product/${username}/add-hotel`}>
          <Nav.Link>Add hotel</Nav.Link>
        </LinkContainer>
      ) : null}

      <LinkContainer to={`/profile/${username}/reservations`}>
        <Nav.Link>
          {role === "user" ? "My Reservations" : "Hotel Reservations"}
        </Nav.Link>
      </LinkContainer>
    </React.Fragment>
  );

  const nav = (
    <Nav className="me-auto">
      {username ? (
        <React.Fragment>
          <LinkContainer
            to={`/profile/${username}/${role === "user" ? "cart" : "myhotels"}`}
          >
            <Nav.Link>My {role === "user" ? "Cart" : "Hotels"}</Nav.Link>
          </LinkContainer>
          {privateRoutes}
        </React.Fragment>
      ) : null}
    </Nav>
  );

  const logoutAndUserProfile = username ? (
    <React.Fragment>
      <NavDropdown title={username} id="userName">
        <LinkContainer to={`/profile/${username}`}>
          <NavDropdown.Item>My profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    </React.Fragment>
  ) : null;

  const signIn = !username ? (
    <LinkContainer to="/login">
      <Nav.Link className="text-secondary">
        <i className="far fa-user"></i> Sign In
      </Nav.Link>
    </LinkContainer>
  ) : null;

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
            {nav}
            {logoutAndUserProfile}
            {signIn}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
