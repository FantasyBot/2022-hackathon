import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useHotelDetails = () => {
  const [hotelDetails, setHotelDetails] = useState("");
  const { hotelName } = useParams();
  console.log("hotelName %d", hotelName);

  useEffect(() => {
    const fetchHotelInfo = async () => {
      const { data } = await axios.get(`/api/product/hotels/${hotelName}`);
      console.log("data: %d", data);
      setHotelDetails(data.hotel_info);
    };

    fetchHotelInfo();
  }, [hotelName]);

  return hotelDetails;
};

export default useHotelDetails;
