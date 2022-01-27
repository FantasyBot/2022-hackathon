import { createSlice } from "@reduxjs/toolkit";

// const [type, setType] = useState("restaurants");
// const [rating, setRating] = useState("");

// // batumi { lat: 41.6168, lng: 41.6367 }

// const [childClicked, setChildClicked] = useState(null);
// const [isLoading, setIsLoading] = useState(false);

const initialState = {
  coordinates: {
    lat: 41.7151,
    lng: 44.8271,
  },
  city: "Tbilisi",
  bounds: {},
  places: [],
  filteredPlaces: [],
};

const map = createSlice({
  name: "map",
  initialState,
  reducers: {
    gotNewCoordinates: (map, action) => {
      map.coordinates = { lat: action.payload.lat, lng: action.payload.lng };
      map.city = action.payload.city;
    },
    gotNewBounds: (map, action) => {
      map.bounds = { ...action.payload };
    },
    gotPlaces: (map, action) => {
      map.places = action.payload;
    },
    gotFilteredPlaces: (map, action) => {
      map.filteredPlaces = action.payload;
    },
  },
});

export const { gotNewCoordinates, gotNewBounds, gotPlaces, gotFilteredPlaces } =
  map.actions;
export default map.reducer;
