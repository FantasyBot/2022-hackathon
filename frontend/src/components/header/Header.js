import { Navbar, Container, Nav, NavDropdown, Stack, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import classes from './Header.module.css';
import useSearch from '../../hooks/useSearch';

const Header = () => {
  const {
    searchResults,
    enteredValue,
    searching,
    onReset,
    onChangeHandler,
    onSelectHandler
  } = useSearch();

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
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
                <NavDropdown.Item>Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form>
              <Stack direction="horizontal" gap={2}>
                <div className="position-relative">
                  <Form.Control
                    // onBlur={() => onBlurHandler()}
                    onChange={onChangeHandler}
                    value={enteredValue}
                    className="me-auto"
                    placeholder="Search..."
                  />
                  {
                    searching
                      ? <Spinner className={classes.spinner} animation="border" variant="secondary" />
                      : <span role="button" onClick={() => onReset()} className={classes.clear__search__input}><i className="fas fa-times"></i></span>
                  }
                  {searchResults && (
                    <ListGroup className={`position-absolute w-100 ${classes.listgroup}`}>
                      {
                        searchResults.map((r, idx) => (
                          <ListGroup.Item key={idx} role="button" onClick={() => onSelectHandler(idx)}>{r}</ListGroup.Item>
                        ))
                      }
                    </ListGroup>
                  )}
                </div>
                <Button type="submit" variant="outline-secondary">Search</Button>
                <div className="vr" />
              </Stack>
            </Form>
            <LinkContainer to="/login">
              <Nav.Link className="text-secondary">Sign In</Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  )
};


export default Header;



// import { LinkContainer } from 'react-router-bootstrap';
// import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';


















// import { LinkContainer } from 'react-router-bootstrap';
// import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

// const Header = () => {
//   return (
//     <header>
//       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//         <Container>
//           <LinkContainer to="/">
//             <Navbar.Brand>HOME</Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="me-auto">
//               <LinkContainer to="/hotels">
//                 <Nav.Link>Hotels</Nav.Link>
//               </LinkContainer>
//               <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//                 <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//                 <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//             <Nav>
//               <LinkContainer to="/login">
//                 <Nav.Link>Log In</Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="/register">
//                 <Nav.Link>Register</Nav.Link>
//               </LinkContainer>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   )
// };

// export default Header;