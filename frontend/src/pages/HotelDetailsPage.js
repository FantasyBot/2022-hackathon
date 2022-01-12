import { Card, Spinner } from "react-bootstrap";
import useHotelDetails from "../hooks/useHotelDetails";

import logo from "../assets/images/hotel-2.jpg";

// {
//   "message": "SUCCESS",
//   "hotel_info": {
//     "name": "Temoda",
//     "location": "dsdasd",
//     "phone": "995598000000",
//     "first_photo": "images-1641541061703.jpg",
//     "second_photo": "images-1641541061706.jpg",
//     "third_photo": "images-1641541061715.jpg",
//     "fourth_photo": "images-1641541061729.jpg"
//   }
// }

const HotelDetailsPage = () => {
  const hotel = useHotelDetails();

  const spinner = (
    <div className="d-flex justify-content-center my-4">
      <Spinner animation="border" variant="secondary" size="lg"></Spinner>
    </div>
  );

  const content = (
    <Card>
      <Card.Img
        variant="top"
        // src={hotel.first_photo}
        src={logo}
        alt={hotel.first_photo}
      />
      <Card.Header>Hotel details</Card.Header>
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
  );

  if (!hotel) return spinner;

  return content;
};

export default HotelDetailsPage;
