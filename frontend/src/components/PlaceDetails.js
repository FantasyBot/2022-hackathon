import { Card, Col } from "react-bootstrap";

const PlaceDetails = ({ place }) => {
  const {
    name,
    location,
    city,
    latitude,
    longitude,
    price,
    discount_price,
    email,
    phone,
    description,
    first_photo,
  } = place;

  const standartPrice = Number(price);
  const discountedPrice = Number(discount_price);
  const discountPercentage = (
    ((standartPrice - discount_price) / standartPrice) *
    100
  ).toFixed(2);
  console.log(discountPercentage);

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={`data:image/jpeg;base64,${first_photo}`} />
        <Card.Header></Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <h3>Standart price: {standartPrice}</h3>
          <h1>
            Discounted price: {discountedPrice} (- {discountPercentage})
          </h1>

          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          Location: {location}
          <br />
          Email: {email}
          <br />
          Phone: {phone}
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default PlaceDetails;
