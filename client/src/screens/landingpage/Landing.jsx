import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

// eslint-disable-next-line
import Login from "./../login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const userInfos = useSelector((state) => state.auth.userInfos);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (userInfos?.connected === true && loading === false) {
      navigate("/assure");
    }
    console.log(userInfos, loading);
  }, [userInfos]);
  if (userInfos?.connected === false && loading === false) {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Button variant="success" onClick={() => setShowLogin(true)}>
              S'identifier
            </Button>
          </Container>
        </Navbar>

        {showLogin && (
          <Login setShowLogin={setShowLogin} showLogin={showLogin} />
        )}

        {/* <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Button variant="dark">S'identifier</Button>
        </Container>
      </Navbar> */}
      </>
    );
  }
};

export default Landing;
