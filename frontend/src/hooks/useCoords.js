import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  gotNewCoordinates,
  gotNewBounds,
  gotPlaces,
  gotFilteredPlaces,
} from "../store/slices/map";

const URL =
  "https://hackathon-2022.herokuapp.com/api/product/allhotels/filteredbycity";

const useCoords = () => {
  const dispatch = useDispatch();
  const {
    places,
    filteredPlaces,
    coordinates: { lat, lng },
    city,
  } = useSelector((state) => state.map);

  // const { sw, ne } = useSelector((state) => state.map.bounds);
  const [isLoading, setIsLoading] = useState(false);

  // const [coordinates, setCoordinates] = useState({
  //   lat: 41.7151,
  //   lng: 44.8271,
  // });
  // const [bounds, setBounds] = useState({});

  // useEffect(() => {
  //   console.log("First useEffect in MapPage");
  //   navigator.geolocation.getCurrentPosition(
  //     ({ coords: { latitude, longitude } }) => {
  //       dispatch(gotNewCoordinates({ lat: latitude, lng: longitude }));
  //     }
  //   );
  // }, [dispatch]);

  useEffect(() => {
    console.log("second useEffect");

    // const timeout = setTimeout(() => {
    if (lat && lng) {
      const getPlacesData = async () => {
        console.log("New request for hotels");

        setIsLoading(true);
        try {
          const {
            data: { filteredHotels },
          } = await axios.get(URL);

          let availableHotelsAtCurrentLocation = [];

          for (const elem of filteredHotels) {
            if (Object.keys(elem).includes(city)) {
              availableHotelsAtCurrentLocation = elem[city];
              break;
            }
          }

          dispatch(gotPlaces(availableHotelsAtCurrentLocation));
          setIsLoading(false);

          // const fetchedPlaces = data?.filter(
          //   (place) => place.name && place.num_reviews > 0
          // );
          // dispatch(gotPlaces(fetchedPlaces));
          // gotFilteredPlaces([]);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }

        // const {
        //   data: { data },
        // } = await axios.get(
        //   `https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary`,
        //   {
        //     params: {
        //       bl_latitude: sw.lat,
        //       bl_longitude: sw.lng,
        //       tr_longitude: ne.lng,
        //       tr_latitude: ne.lat,
        //     },
        //     headers: {
        //       "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        //       "x-rapidapi-key":
        //         // "0da1ba1a5dmshf7a741ef3178009p18ef84jsn7efac6836091", // old
        //         "7073586320msh2cc35832655b341p10bdd3jsnf1043c016fce",
        //     },
        //   }
        // );
      };

      getPlacesData();
    }
    // }, 2000);

    // return () => {
    //   console.log("Cleanup in useCoords");
    //   clearTimeout(timeout);
    // };
  }, [lat, lng, dispatch]);

  // useEffect(() => {
  //   console.log("Third useEffect");
  //   const filteredPlaces = places.filter((place) => place.rating > rating);
  //   setFilteredPlaces(filteredPlaces);
  // }, [rating]);

  return {
    dispatch,
    currentCoordinates: { lat, lng },
    // setCoordinates,
    // setBounds,
    // bounds,
    gotNewCoordinates,
    gotNewBounds,
    isLoading,
    places,
    filteredPlaces,
  };
};

export default useCoords;
