import { Navigate } from "react-router-dom";

import { Row, Col, Card } from "react-bootstrap";

import { useFetchMyHotels } from "../hooks/fetchHotels";
import useResetApiCallState from "../hooks/useResetApiCallState";

import CustomSpinner from "../components/UI/CustomSpinner";
import logo from "../assets/images/hotels.jpg";

const MyHotels = () => {
  const { username, callBegin, results } = useFetchMyHotels();
  useResetApiCallState();

  const myHotels = (
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
  );

  if (!username) {
    console.log("Not authorized!");
    return <Navigate replace to="/" />;
  }

  return (
    <div className="my-3">
      {console.log("MyHotels rendering")}
      <h3 className="my-3">{`${username}'s hotels:`}</h3>
      {callBegin && <CustomSpinner />}
      {myHotels}
    </div>
  );
};

export default MyHotels;
