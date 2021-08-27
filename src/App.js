import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getRentalList } from "./api";
import { useMediaQuery } from "react-responsive";

function App() {
  const [address, setAddress] = useState({});
  const [rentals, setRentals] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomSize, setRoomSize] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [clickedChild, setClickedChild] = useState(null);
  // const isMobile = useMediaQuery({ query: `(max-width: 700px)` });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        // console.log(latitude, longitude);
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredRooms = rentals.filter(
      (rental) => Number(rental.bedrooms) === Number(roomSize)
    );
    setFilteredRooms(filteredRooms);
  }, [roomSize]);

  //Use effect map postion dependece
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      getRentalList(coordinates, address).then((data) => {
        setRentals(data);
        setIsLoading(false);
        setFilteredRooms([]);
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, [coordinates, Object.keys(address).length > 0 ? address : ""]);

  return (
    <div className="App">
      <Header setAddress={setAddress} isLoading={isLoading} />
      <Row>
        <Col xs={12} md={4}>
          <List
            setRoomSize={setRoomSize}
            clickedChild={clickedChild}
            rentals={filteredRooms.length ? filteredRooms : rentals}
          />
        </Col>
        <Col xs={12} md={8} className="d-none d-lg-block d-md-block">
          <Map
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            rentals={filteredRooms.length ? filteredRooms : rentals}
            setClickedChild={setClickedChild}
            setAddress={setAddress}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
