import { Row, Col, Card, Form, Stack, Spinner, ListGroup, Button } from 'react-bootstrap';
import logo from '../assets/images/hotels.jpg';
import useSearch from '../hooks/useSearch';
import classes from './HomePage.module.css';


const HomePage = () => {

  const {
    searchResults,
    enteredValue,
    searching,
    onReset,
    onChangeHandler,
    onSelectHandler
  } = useSearch();

  return (
    <div>
      <h1>File uploads</h1>

      <form action="/upload" method="POST" encType="multipart/form-data">
        <input
          type="file"
          name="multiImages"
          accept="image/*"
          multiple
          required
        />
        <input type="submit" value="Upload" />
      </form>
      <br />
      {/* <img src="/static/uploads/myImage-1640608007631.jpg" alt="Backend" /> */}

      <Form>
        <Stack className="justify-content-center my-3" direction="horizontal" gap={2}>
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
            {
              searchResults && (
                <ListGroup className={`position-absolute w-100 ${classes.listgroup}`}>
                  {
                    searchResults.map((r, idx) => (
                      <ListGroup.Item key={idx} role="button" onClick={() => onSelectHandler(idx)}>{r}</ListGroup.Item>
                    ))
                  }
                </ListGroup>
              )}
          </div>
          <Button type="submit" variant="outline-primary">Search</Button>
          <div className="vr" />
          <Button type="button" variant="outline-secondary">Search</Button>
        </Stack>
      </Form>

      <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </div>
  );
};
export default HomePage;
