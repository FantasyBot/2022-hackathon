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
import { resetApiCallState } from "../store/slices/apiCall";
// import useSearch from "../hooks/useSearch";
// import classes from "./HomePage.module.css";

const HomePage = () => {
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
  const { username } = useSelector((state) => state.user);

  console.log("allHotels", allHotels);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("HomePage effect");

    // Fix
    if (allHotels.length === 0) dispatch(fetchAllHotels());

    return () => dispatch(resetApiCallState());
  }, [dispatch, allHotels.length]);

  return (
    <div className="my-2">
      {console.log("HomePage rendering")}

      {allHotels.length > 0 && (
        <>
          <h3 className="text-center my-3">Currently available Hotels</h3>
          <Row xs={1} md={3} className="g-4">
            {allHotels.map((hotel, idx) => (
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
        </>
      )}
      {allHotels.length === 0 && username && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" size="lg"></Spinner>
        </div>
      )}
    </div>
  );
};
export default HomePage;
