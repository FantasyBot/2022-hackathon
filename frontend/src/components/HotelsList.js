import { Row } from "react-bootstrap";

// import { useState, useEffect, createRef } from "react";
// import {
//   CircularProgress,
//   Grid,
//   Typography,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   Select,
// } from "@material-ui/core";

import PlaceDetails from "./PlaceDetails";

// import useStyles from "./styles";

const HotelsList = ({
  places,
  // childClicked,
  isLoading,
  // type,
  // setType,
  // rating,
  // setRating,
}) => {
  // const [elRefs, setElRefs] = useState([]);

  // const classes = useStyles();

  // useEffect(() => {
  //   console.log("Effect in List.js");

  //   const refs = Array(places?.length)
  //     .fill()
  //     .map((_, i) => elRefs[i] || createRef());
  //   setElRefs(refs);
  // }, [places]);

  // console.log({ childClicked });

  return (
    <div>
      {console.log("HotelsList.js rendering")}
      <h4>Hotels for you:</h4>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Row xs={1}>
          {places?.map((place, i) => (
            <PlaceDetails key={i} place={place} />

            // <Grid ref={elRefs[i]} item key={i} xs={12}>
            //   <Placedetails
            //     place={place}
            //     selected={Number(childClicked) === i}
            //     refProp={elRefs[i]}
            //   />
            // </Grid>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HotelsList;
