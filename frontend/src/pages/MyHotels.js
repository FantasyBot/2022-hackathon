import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { Row, Col, Card, Spinner } from "react-bootstrap";

import { fetchMyHotels } from "../store/actions/fetchHotels";
import { resetApiCallState } from "../store/slices/apiCall";

import logo from "../assets/images/hotels.jpg";

const MyHotels = () => {
  const { username } = useSelector((state) => state.user);
  const { callBegin } = useSelector((state) => state.apiCall);
  const {
    myHotels: { fetched, results },
  } = useSelector((state) => state.hotels);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("MyHotels effect");
    if (username && !fetched) {
      console.log(`fetched is ${fetched} so we WILL START fetching MyhHotels!`);
      dispatch(fetchMyHotels());
    } else {
      console.log(
        `fetched is ${fetched} or user was not signed in, so we WON'T start fetching MyhHotels!`
      );
    }
  }, [dispatch, fetched, username]);

  useEffect(() => {
    return () => {
      console.log("Cleanup MyHotels");
      dispatch(resetApiCallState());
    };
  }, [dispatch]);

  if (!username) {
    console.log("Not authorized!");
    return <Navigate replace to="/" />;
  }

  return (
    <div className="my-3">
      {console.log("MyHotels rendering")}

      <h3 className="my-3">{`${username}'s hotels:`}</h3>
      <Row xs={1} md={3} className="g-4">
        {results.map((hotel, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                variant="top"
                // src={hotel.first_photo}
                src={logo}
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
          </Col>
        ))}
      </Row>

      {callBegin && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" size="lg"></Spinner>
        </div>
      )}
    </div>
  );
};

export default MyHotels;
