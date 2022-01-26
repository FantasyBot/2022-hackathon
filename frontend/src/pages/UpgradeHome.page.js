import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

import {
  Image,
  Card,
  Row,
  Col,
  Container,
  Stack,
  Form,
  Button,
} from "react-bootstrap";

import logo from "../assets/images/www.jpg";

// pic src: "https://www.behance.net/gallery/101990779/RIVER-FRONT-Hotel-Resort/modules/587441533"

const UpgradeHomePage = ({ setCoordinates }) => {
  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoC) => {
    // console.log("here");
    setAutoComplete(autoC);
  };
  console.log({ autoComplete });

  const onPlaceChanged = () => {
    console.log("Changed");

    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();

    console.log({ lat, lng });
    setCoordinates({ lat, lng });
  };

  return (
    <Form className="my-2">
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
                type="search"
                placeholder="Search place..."
                // className="me-auto"
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
              variant="warning"
              type="Submit"
              // style={{ width: "100%" }}
              className="w-100 text-light"
            >
              Search
            </Button>
          </Col>
        </Row>
      </Card>
      {/* <Card className="p-2 p-md-4 mx-5 " style={{ marginTop: "-100px" }}>
        <Stack direction="horizontal" gap={3} className="my-2">
          <Form.Control
            type="search"
            className="me-auto"
            placeholder="Search"
          />
          <Form.Control
            type="date"
            className="me-auto"
            placeholder="Add your item here..."
          />
          <Button variant="secondary">Submit</Button>
          <div className="vr" />
          <Button variant="outline-success" type="Submit">
            Search
          </Button>
        </Stack>
      </Card> */}
    </Form>
  );
  // <div className="mt-2">

  // {
  /* <Card className="p-3 mt-2">
        <Form>
          <Row>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text>Where</Form.Text>
                <Form.Control type="search" placeholder="Search" />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text>When</Form.Text>
                <Form.Control type="date" placeholder="Choose date" />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Button variant="outline-success" type="submit">
                F I N D
              </Button>
            </Col>
          </Row>
        </Form>
      </Card> */
};
// </div>
// };

export default UpgradeHomePage;
