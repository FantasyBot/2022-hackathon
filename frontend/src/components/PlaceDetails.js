import { Card, Col } from "react-bootstrap";

const PlaceDetails = ({ place }) => {
  const { name, location, price, discount_price, email, phone, first_photo } =
    place;

  const standartPrice = Number(price);
  const discountedPrice = Number(discount_price);
  const discountPercentage = (
    ((standartPrice - discount_price) / standartPrice) *
    100
  ).toFixed(2);
  // console.log(discountPercentage);

  return (
    <Col className="my-3">
      <Card className="p-1">
        <Card.Img variant="top" src={`data:image/jpeg;base64,${first_photo}`} />
        <Card.Header></Card.Header>
        <Card.Body>
          <Card.Title className="fs-3 text-warning text-center">
            {name}
          </Card.Title>
          <div className="d-flex justify-content-between mb-2">
            <small>Standart price</small>
            <small>{standartPrice} GEL</small>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <small className="text-success"> Discounted price</small>
            <small className="text-success fw-bold">
              {discountedPrice} GEL (-{discountPercentage}%)
            </small>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <small>
              <i className="far fa-envelope-open"></i> Email
            </small>
            <small>{email}</small>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <small>
              <i className="fas fa-phone"></i> Phone
            </small>
            <small>{phone}</small>
          </div>

          {/* <Card.Text>{description}</Card.Text> */}
        </Card.Body>
        <Card.Footer>
          <small>
            <i className="fas fa-map-marker-alt"></i> {location}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default PlaceDetails;
