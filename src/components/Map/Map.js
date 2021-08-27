import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GoogleMapReact from "google-map-react";

import { GeoAltFill } from "react-bootstrap-icons";
// import { useMediaQuery } from "react-responsive";
import "./Map.css";

const Map = ({
  setCoordinates,
  coordinates,
  rentals,
  setClickedChild,
  setAddress,
}) => {
  // const isMobile = useMediaQuery({ query: `(max-width: 600px)` });
  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 42.362161163288796, lng: -71.05825399246957 }}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setAddress({});
        }}
        onChildClick={(child) => {
          setClickedChild(child);
        }}
      >
        {rentals?.map((rental, i) => (
          <div
            key={i}
            className="marker-container"
            variant="primary"
            lat={rental.latitude}
            lng={rental.longitude}
          >
            <GeoAltFill color="magenta" size={35} />
            <p className="icon-p">{`$${rental?.price}`}</p>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
