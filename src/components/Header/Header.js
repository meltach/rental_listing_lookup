import React from "react";
import { Search } from "react-bootstrap-icons";
import { usePlacesWidget } from "react-google-autocomplete";
// import Autocomplete from "react-google-autocomplete";
// import { Autocomplete } from "@react-google-maps/api";
import { useMediaQuery } from "react-responsive";
import "./Header.css";
import {
  Spinner,
  Navbar,
  Container,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

const Header = ({ setAddress, isLoading }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 700px)` });
  const { ref, autocompleteRef } = usePlacesWidget({
    // apiKey: YOUR_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      const fullAddress = place.formatted_address.split(", ");
      // console.log(fullAddress);
      if (fullAddress.length > 0) {
        const cityState = {
          city: fullAddress[0],
          state: fullAddress[1],
        };
        setAddress(cityState);
      } else {
        setAddress({});
      }
    },
  });
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home" className="mx-3">
          Rental Advisory
        </Navbar.Brand>
        {isLoading ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : (
          ""
        )}

        <Form className={isMobile ? "" : "form-cont"}>
          <InputGroup className="mb-2">
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <FormControl
              ref={ref}
              options={{
                types: ["(regions)"],
                componentRestrictions: { country: "us" },
              }}
              // defaultValue="Boston"
            />
          </InputGroup>
        </Form>
      </Navbar>
    </>
  );
};

export default Header;
