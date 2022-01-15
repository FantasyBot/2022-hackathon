import { Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import useResetApiCallState from "../hooks/useResetApiCallState";
import { useFetchAllHotels } from "../hooks/fetchHotels";

import CustomSpinner from "../components/UI/CustomSpinner";

import logo from "../assets/images/hotels.jpg";
// import hotel2 from "../assets/images/hotel-2.jpg";
// import hotel3 from "../assets/images/hotel-3.jpg";

const HomePage = () => {
  const { results, callBegin } = useFetchAllHotels();
  useResetApiCallState();

  const content = (
    <Row xs={1} md={3} className="g-4">
      {results.map((hotel, idx) => (
        <Col key={idx}>
          <LinkContainer to={`/hotels/${hotel.name}`}>
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
          </LinkContainer>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="my-2">
      {/* <img src="../../../backend/public/uploads/random.jpg" alt="test" /> */}
      {console.log("HomePage rendering")}

      <h3 className="my-3 my-4 fw-light">Currently available Hotels</h3>
      {callBegin ? <CustomSpinner /> : null}
      {content}
    </div>
  );
};
export default HomePage;
