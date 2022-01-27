import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { userLoggedOut } from "../../store/slices/user";
import { resetApiCallState } from "../../store/slices/apiCall";
import { resetHotelsState } from "../../store/slices/hotels";

import brandLogo from "../../assets/images/logo.svg";

// import classes from './Header.module.css';
// import useSearch from '../../hooks/useSearch';

const Header = () => {
  const username = useSelector((state) => state.user.username);
  const role = useSelector((state) => state.user.role);

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
        <Nav.Link>{role === "operator" ? "Hotel Reservations" : null}</Nav.Link>
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
      {role === "operator" && <Badge bg="success">{role}</Badge>}
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

      <Navbar variant="dark" expand="lg" style={{ background: "#548CA8" }}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className=" fs-4">
              <img
                src={brandLogo}
                alt="Hotel Midnight brand logo"
                style={{ width: "60px", height: "60px", marginLeft: "-15px" }}
              />
              Hotel Midnight
            </Navbar.Brand>
          </LinkContainer>

          {/* <LinkContainer to="/">
            <Navbar.Brand className="text-success fs-4">
              <Image
                style={{ width: 72, height: 50 }}
                src={logo}
                alt="navbarbrand"
              />
            </Navbar.Brand>
          </LinkContainer> */}

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
