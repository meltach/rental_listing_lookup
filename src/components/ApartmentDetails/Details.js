import React from "react";
import { Col, Card } from "react-bootstrap";
import "./Details.css";
const Details = ({ rental, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  return (
    <Col className="mb-2 mt-1">
      <Card>
        <Card.Img
          variant="top"
          src="https://i.pinimg.com/564x/66/d9/f5/66d9f5afdc5337d3f9eac362b970c426.jpg"
        />
        <Card.Body>
          <Card.Title>{`$${rental.price}/mo`}</Card.Title>
          <Card.Text className="mb-0">
            {rental.bedrooms} bds {rental.bathrooms} ba{" "}
            {rental.squareFootage ? rental.squareFootage : "--"} sqft{" "}
            {rental.propertyType} for rent
          </Card.Text>
          <p className="mb-0">{rental.formattedAddress}</p>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <small className="text-muted">{`Status: ${rental.status}`}</small>
          <small className="text-muted">{`Days on makert: ${
            rental.daysOnMarket === 0 ? "New" : rental.daysOnMarket
          }`}</small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Details;
