import GoogleMapReact from "google-map-react";
import { Autocomplete } from "@react-google-maps/api";

import { Row, Col, Stack, Button, Form } from "react-bootstrap";

import HotelsList from "../components/HotelsList";

import useCoords from "../hooks/useCoords";
import useAutocomplete from "../hooks/useAutocomplete";

const MapPage = () => {
  const {
    // dispatch,
    // gotNewCoordinates,
    // gotNewBounds,
    isLoading,
    places,
    filteredPlaces,
    currentCoordinates,
  } = useCoords();

  const { onLoad, onPlaceChanged, searchRef } = useAutocomplete();

  const defaultCenter = {
    lat: 41.7151,
    lng: 44.8271,
  };

  return (
    <Row>
      <Col xs={12} md={4}>
        {/* <h1>List should be here</h1>
        {isLoading ? <h2>Loading...</h2> : null} */}
        <HotelsList
          isLoading={isLoading}
          places={filteredPlaces.length > 0 ? filteredPlaces : places}
        />
      </Col>
      <Col xs={12} md={8}>
        <Row>
          <Col xs={12} className="my-2">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Stack direction="horizontal" gap={3} className="mb-2">
                <Form.Control
                  ref={searchRef}
                  type="search"
                  placeholder="Search city..."
                  className="me-auto"
                />
                <Button variant="secondary">Submit</Button>
              </Stack>
            </Autocomplete>
          </Col>
          <Col xs={12} style={{ height: "85vh" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              }}
              defaultCenter={defaultCenter}
              center={currentCoordinates} // current center of the map
              defaultZoom={14}
              margin={[50, 50, 50, 50]}
              options={""}
              // onChange={(e) => {
              //   console.log("e.marginBounds", e.marginBounds);
              //   dispatch(
              //     gotNewCoordinates({ lat: e.center.lat, lng: e.center.lng })
              //   );
              //   dispatch(
              //     gotNewBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
              //   );
              //   // setCoordinates({ lat: e.center.lat, lng: e.center.lng });
              //   // setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
              // }}
              // onChildClick={(child) => {
              //   console.log({ child });
              //   setChildClicked(child);
              // }}
            ></GoogleMapReact>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MapPage;
