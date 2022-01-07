import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { fetchAllHotels } from "../store/actions/fetchHotels";

import {
  Row,
  Col,
  Card,
  Spinner,
  // Form,
  // Stack,
  // Spinner,
  // ListGroup,
  // Button,
} from "react-bootstrap";

import logo from "../assets/images/hotels.jpg";
// import useSearch from "../hooks/useSearch";
// import classes from "./HomePage.module.css";

const HomePage = () => {
  // const {
  //   searchResults,
  //   enteredValue,
  //   searching,
  //   onReset,
  //   onChangeHandler,
  //   onSelectHandler,
  // } = useSearch();

  // const onSubmit = async () => {
  //   try {
  //     const { data } = await axios.post("/upload", {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const { allHotels } = useSelector((state) => state.hotels);
  console.log("allHotels", allHotels);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("HomePage effect");
    dispatch(fetchAllHotels());
  }, [dispatch]);

  return (
    <div className="my-2">
      {console.log("HomePage rendering")}
      <h3 className="text-center my-3">Currently available Hotels</h3>

      {/* <Form>
        <Stack
          className="justify-content-center my-3"
          direction="horizontal"
          gap={2}
        >
          <div className="position-relative">
            <Form.Control
              // onBlur={() => onBlurHandler()}
              onChange={onChangeHandler}
              value={enteredValue}
              className="me-auto"
              placeholder="Search..."
            />
            {searching ? (
              <Spinner
                className={classes.spinner}
                animation="border"
                variant="secondary"
              />
            ) : (
              <span
                role="button"
                onClick={() => onReset()}
                className={classes.clear__search__input}
              >
                <i className="fas fa-times"></i>
              </span>
            )}
            {searchResults && (
              <ListGroup
                className={`position-absolute w-100 ${classes.listgroup}`}
              >
                {searchResults.map((r, idx) => (
                  <ListGroup.Item
                    key={idx}
                    role="button"
                    onClick={() => onSelectHandler(idx)}
                  >
                    {r}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <Button type="submit" variant="outline-primary">
            Search
          </Button>
          <div className="vr" />
        </Stack>
      </Form> */}
      {allHotels.length > 0 && (
        <Row xs={1} md={3} className="g-4">
          {allHotels.map((hotel, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img
                  variant="top"
                  src={hotel.first_photo}
                  alt={hotel.first_photo}
                />
                {/* <Card.Header>Header</Card.Header> */}
                <Card.Body>
                  <Card.Title>{hotel.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {hotel.description}
                  </Card.Subtitle>
                  <Card.Text>
                    Email: {hotel.email}
                    <br />
                    Price: {hotel.price}
                    <br />
                    Discount price: {hotel.discount_price}
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                <Card.Footer>{hotel.location}</Card.Footer>
              </Card>

              {/* <Card>
                  <Card.Img variant="top" src={logo} />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </Card.Text>
                  </Card.Body>
                </Card> */}
            </Col>
          ))}
        </Row>
      )}
      {allHotels.length === 0 && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" size="lg"></Spinner>
        </div>
      )}
    </div>
  );
};
export default HomePage;
