import axios from "axios";
import { useState, useEffect } from "react";

const URL =
  "https://hackathon-2022.herokuapp.com/api/product/allhotels/filteredbycity";

const useRandomHotels = (enteredText) => {
  const [isLoading, setIsLoading] = useState(false);
  const [randomHotels, setRandomHotels] = useState([
    {
      name: "Rooms Hotel Kazbegi",
      location: "1 V.gorgasali St, Stepantsminda, Georgia",
      price: 110,
      discount_price: 70,
      email: "kazbegi@roomshotels.com",
      phone: 995322710100,
    },
    {
      name: "Hilton Batumi",
      location: "40 Rustaveli Avenue, Batumi, Georgia",
      price: 200,
      discount_price: 170,
      email: "hilton@gmial.com",
      phone: 422222299,
    },
    {
      name: "Holiday Inn Tbilisi",
      location: "1 26 May Street, Tbilisi, Georgia",
      price: 120,
      discount_price: 70,
      email: "holiday-in@gmail.com",
      phone: 800008079,
    },
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (enteredText) {
        const getPlacesData = async () => {
          console.log("New request for RANDOM hotels");

          setIsLoading(true);
          try {
            const {
              data: { filteredHotels },
            } = await axios.get(URL);

            let availableHotelsAtCurrentLocation = [];

            for (const elem of filteredHotels) {
              const property = Object.keys(elem)[0];
              if (property.toLowerCase().includes(enteredText.toLowerCase())) {
                availableHotelsAtCurrentLocation = elem[property];
                break;
              }
            }

            setRandomHotels(availableHotelsAtCurrentLocation);
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            console.log(error);
          }
        };
        getPlacesData();
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [enteredText]);

  return {
    isLoading,
    randomHotels,
  };
};

export default useRandomHotels;
