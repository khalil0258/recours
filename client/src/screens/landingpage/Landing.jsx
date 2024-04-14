import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

// eslint-disable-next-line
import Login from "./../login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Header from "../../components/oflline/Header";

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
        <Header setShowLogin={setShowLogin} />
        {showLogin && (
          <Login setShowLogin={setShowLogin} showLogin={showLogin} />
        )}
      </>
    );
  }
};

export default Landing;
