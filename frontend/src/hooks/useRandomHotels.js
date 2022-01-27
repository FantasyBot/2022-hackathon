import axios from "axios";
import { useState, useEffect } from "react";

const URL =
  "https://hackathon-2022.herokuapp.com/api/product/allhotels/filteredbycity";

const useRandomHotels = (enteredText) => {
  const [isLoading, setIsLoading] = useState(false);
  const [randomHotels, setRandomHotels] = useState([
    {
      name: "Sheraton Batumi Hotel",
      location: "Sheraton Batumi Hotel, Rustaveli Avenue, Batumi, Georgia",
      price: 150,
      discount_price: 100,
      email: "sheraton@gmial.com",
      phone: 995422229000,
    },
    {
      name: "Hilton Batumi",
      location: "40 Rustaveli Avenue, Batumi, Georgia",
      price: 200,
      discount_price: 170,
      email: "hilton@gmial.com",
      phone: 422222299,
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
