import React, { useEffect, createRef } from "react";
import { useState } from "react";
import { Row, Form, FloatingLabel, Alert } from "react-bootstrap";
import Details from "../ApartmentDetails/Details";
import { useMediaQuery } from "react-responsive";
const List = ({ rentals, clickedChild, setRoomSize }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 700px)` });
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) =>
      Array(rentals !== undefined ? rentals.length : [])
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [rentals !== undefined ? rentals.length : ""]);

  return (
    <>
      <div
        className={
          isMobile ? "d-block mt-2" : "d-flex justify-content-between mt-2"
        }
      >
        <div>
          <h5>Rental Listings: {rentals?.length}</h5>
        </div>
        <FloatingLabel
          controlId="floatingSelectGrid"
          label="Filter by room"
          className="w-100"
        >
          <Form.Select
            aria-label="Filter by bedroom size"
            onChange={(e) => setRoomSize(e.target.value)}
          >
            <option value="0">All</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
          </Form.Select>
        </FloatingLabel>
      </div>
      {rentals === undefined ? (
        <Alert variant="info">
          Sorry can't fetch deta! There must be something wrong with the API.
        </Alert>
      ) : (
        ""
      )}
      <Row xs={1} sm={2} md={2} className="item-row">
        {rentals?.map((rental, i) => (
          <div ref={elRefs[i]} key={i}>
            <Details
              key={i}
              rental={rental}
              selected={Number(clickedChild) === i}
              refProp={elRefs[i]}
            />
          </div>
        ))}
      </Row>
    </>
  );
};

export default List;
