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

  return (
    <div className="my-2">
      {/* <img
        src="backend/public/uploads/first_photo(ბაზიდან სურათის სახელი)"
        alt="test"
      /> */}
      {console.log("HomePage rendering")}

      <h3 className="text-center my-3">Currently available Hotels</h3>
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
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" variant="secondary" size="lg"></Spinner>
        </div>
      )}
    </div>
  );
};
export default HomePage;
