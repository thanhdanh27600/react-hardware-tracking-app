import React from "react";
import { Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="justify-content-center">
          <Navbar.Brand
            onClick={(e) => e.preventDefault()}
          >
            Theo dõi thiết bị
          </Navbar.Brand>
    </Navbar>
  );
}

export default Header;
