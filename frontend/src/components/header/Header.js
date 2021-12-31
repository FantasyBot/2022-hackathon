import { useSelector } from 'react-redux';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
// import { Navbar, Container, Nav, NavDropdown, Stack, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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

  const { username = '', role = "", active = false } = useSelector(state => state.user);


  return (
    <header>
      {console.log('Rendering Header')}

      <Navbar bg="light" variant="light" expand="lg">
        <Container>

          <LinkContainer to="/">
            <Navbar.Brand>
              Notebooking
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              {
                username && (
                  <LinkContainer to={role === "customer" ? `profile/${username}/cart` : role === "operator" ? `/profile/${username}/myhotels` : null}>
                    {role && role === "customer" && <Nav.Link>My Cart</Nav.Link>}
                    {role && role === "operator" && <Nav.Link>My Hotels</Nav.Link>}
                    {/* <Nav.Link>{user ? 'My Cart' : 'My Hotels'}</Nav.Link> */}
                  </LinkContainer>
                )
              }
            </Nav>

            {
              username && (
                <NavDropdown title={username} id="userName" >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      {username}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={() => console.log('Write logic for logout (cleanup localstorage)')}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )
            }

            <LinkContainer to="/login">
              <Nav.Link className="text-secondary"><i className="far fa-user"></i> Sign In</Nav.Link>
            </LinkContainer>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  )
};


export default Header;