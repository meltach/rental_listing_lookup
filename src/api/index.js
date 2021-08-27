/* eslint-disable consistent-return */
import axios from "axios";

const URL = "https://realty-mole-property-api.p.rapidapi.com/rentalListings";
console.log(process.env.REACT_APP_RAPID_API_KEY);
console.log("((((((((((((((((((((((((((((((((");

export const getRentalList = async (coordinates, address) => {
  try {
    const { data } = await axios.get(URL, {
      params: {
        radius: "100",
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        ...(Object.keys(address).length > 0
          ? { city: address.city, state: address.state }
          : {}),
      },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        "x-rapidapi-host": "realty-mole-property-api.p.rapidapi.com",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
