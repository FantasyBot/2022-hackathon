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

  const user = false;

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
              <LinkContainer to={user ? 'profile/:username/cart' : `/profile/:username/myhotels`}>
                <Nav.Link>{user ? 'My Cart' : 'My Hotels'}</Nav.Link>
              </LinkContainer>
            </Nav>



            <NavDropdown title={"Temo Abesadze"} id="userName" >
              <LinkContainer to="/profile">
                <NavDropdown.Item>
                  Profile
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={() => console.log('Write logic for logout (cleanup localstorage)')}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
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