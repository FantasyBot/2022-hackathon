import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

// import { LinkContainer } from "react-router-bootstrap";

import { fetchAllHotels } from "../store/actions/fetchHotels";

import {
  Row,
  Col,
  Card,
  Spinner,
  // Carousel,
  // Image,
  // Form,
  // Stack,
} from "react-bootstrap";

import logo from "../assets/images/hotels.jpg";
// import hotel2 from "../assets/images/hotel-2.jpg";
// import hotel3 from "../assets/images/hotel-3.jpg";

import { resetApiCallState } from "../store/slices/apiCall";
import { LinkContainer } from "react-router-bootstrap";

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

  const {
    allHotels: { fetched, newHotel, results },
  } = useSelector((state) => state.hotels);

  const { callBegin } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("HomePage effect");

    if (!fetched || (fetched && newHotel)) {
      console.log(
        "fetched ->",
        fetched,
        "newHotel ->",
        newHotel,
        "So fetch will start!"
      );
      dispatch(fetchAllHotels());
    } else {
      console.log(
        "fetched ->",
        fetched,
        "newHotel ->",
        newHotel,
        "So fetch won't happen! X"
      );
    }
  }, [dispatch, fetched, newHotel]);

  useEffect(() => {
    return () => {
      console.log("Cleanup homepage");
      dispatch(resetApiCallState());
    };
  }, [dispatch]);

  const spinner = (
    <div className="d-flex justify-content-center my-4">
      <Spinner animation="border" variant="secondary" size="lg"></Spinner>
    </div>
  );

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

      <h3 className="text-center my-3">Currently available Hotels</h3>
      {callBegin ? spinner : null}
      {content}
    </div>
  );
};
export default HomePage;
