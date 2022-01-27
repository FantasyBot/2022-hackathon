import { Navigate } from "react-router-dom";

import { Row, Col, Card } from "react-bootstrap";

import { useFetchMyHotels } from "../hooks/fetchHotels";
import useResetApiCallState from "../hooks/useResetApiCallState";

import CustomSpinner from "../components/UI/CustomSpinner";

const MyHotels = () => {
  const { username, callBegin, results } = useFetchMyHotels();
  useResetApiCallState();

  const myHotels = (
    <Row xs={1} md={3} className="g-4">
      {results.map((hotel, idx) => (
        <Col key={idx}>
          <Card style={{height: "450px"}}>
            <Card.Img
              style={{height: "200px", objectFit: "cover"}}
              variant="top"
              src={`data:image/jpeg;base64,${hotel.first_photo}`}
              alt={hotel.first_photo}
            />
            <Card.Body>
              <Card.Title className="text-secondary">{hotel.name}</Card.Title>
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
      <h3 className="my-4 text-center text-secondary">{`${username}'s hotels`}</h3>
      {callBegin && <CustomSpinner />}
      {myHotels}
    </div>
  );
};

export default MyHotels;
