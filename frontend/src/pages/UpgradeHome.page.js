import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

import { Image, Card, Row, Col, Form, Button } from "react-bootstrap";

import useAutocomplete from "../hooks/useAutocomplete";
import useRandomHotels from "../hooks/useRandomHotels";
import logo from "../assets/images/www.jpg";

// pic src: "https://www.behance.net/gallery/101990779/RIVER-FRONT-Hotel-Resort/modules/587441533"

const UpgradeHomePage = () => {
  const { onLoad, onPlaceChanged, searchRef } = useAutocomplete();
  const [enteredCity, setEnteredCity] = useState("");

  const navigate = useNavigate();

  const { isLoading, randomHotels } = useRandomHotels(enteredCity);
  console.log({ isLoading, randomHotels });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchRef.current.value);

    if (searchRef.current.value) {
      navigate("/map");
    } else {
      console.log("Search bar is empty! Please enter a city!");
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler} className="mt-2">
        {console.log("Rendering")}
        <Image
          fluid
          rounded
          src={logo}
          alt="home cover"
          style={{ width: "100%", filter: "brightness(80%)" }}
        />
        <Card className="mx-3 mx-md-5 p-4" style={{ marginTop: "-110px" }}>
          <Row>
            <Col xs={12} sm={6}>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <Form.Control
                  ref={searchRef}
                  onChange={(e) => setEnteredCity(e.target.value)}
                  value={enteredCity}
                  type="search"
                  placeholder="Find a city..."
                />
              </Autocomplete>
            </Col>
            <Col xs={12} sm={3}>
              <Form.Control
                type="date"
                className="me-auto"
                placeholder="Add your item here..."
              />
            </Col>

            <Col xs={12} sm={3}>
              <Button
                variant="secondary"
                type="Submit"
                // style={{ width: "100%" }}
                className="w-100 text-light"
              >
                Search
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
      <Row xs={1} md={3} className="mt-4">
        {isLoading && (
          <Col className="my-4">
            <h1 className="text-center">Loading...</h1>
          </Col>
        )}
        {!isLoading &&
          randomHotels.length > 0 &&
          randomHotels.map((place) => {
            const { name, location, price, discount_price, email, phone } =
              place;

            const standartPrice = Number(price);
            const discountedPrice = Number(discount_price);
            const discountPercentage = (
              ((standartPrice - discount_price) / standartPrice) *
              100
            ).toFixed(2);

            return (
              <Col key={place.name} className="my-3">
                <Card
                  style={{ borderRadius: "4px", height: 295 }}
                  className="p-2"
                >
                  <Card.Body>
                    <Card.Title className="fs-3 text-center text-secondary mb-4">
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
                  </Card.Body>
                  <Card.Footer>
                    <small>
                      <i className="fas fa-map-marker-alt"></i> {location}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default UpgradeHomePage;
