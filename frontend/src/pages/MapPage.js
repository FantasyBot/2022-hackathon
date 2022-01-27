import GoogleMapReact from "google-map-react";
import { Autocomplete } from "@react-google-maps/api";

import { Row, Col, Form } from "react-bootstrap";

import HotelsList from "../components/HotelsList";

import useCoords from "../hooks/useCoords";
import useAutocomplete from "../hooks/useAutocomplete";
import MapMarker from "../components/UI/MapMarker";

const MapPage = () => {
  const { isLoading, places, filteredPlaces, currentCoordinates } = useCoords();

  const { onLoad, onPlaceChanged, searchRef } = useAutocomplete();

  const defaultCenter = {
    lat: 41.7151,
    lng: 44.8271,
  };

  return (
    <Row className="border rounded mt-2 py-2">
      <Col xs={12} md={4} className="mt-2">
        <Row style={{ overflowY: "scroll", height: "100vh" }}>
          <Col xs={12} className="py-2">
            <small className="text-muted">
              {" "}
              <i className="fas fa-search"></i> Find your hotels here:
            </small>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Form.Control
                ref={searchRef}
                type="search"
                placeholder="Type city name"
                className="me-auto my-2"
              />
            </Autocomplete>
          </Col>
          <Col>
            <HotelsList
              isLoading={isLoading}
              places={filteredPlaces.length > 0 ? filteredPlaces : places}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={8} className="mt-2 rounded" style={{ height: "100vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
          defaultCenter={defaultCenter}
          center={currentCoordinates} // current center of the map
          defaultZoom={13}
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
        >
          {places.map((place) => (
            <MapMarker
              key={place.name}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
            />
          ))}
        </GoogleMapReact>
      </Col>
    </Row>
  );
};

export default MapPage;
