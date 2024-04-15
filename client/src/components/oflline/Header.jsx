import React, { useEffect, useState } from "react";
import "./Header.css";
import Login from "../../screens/login/Login";

const Header = ({ setShowLogin }) => {
  const [laydown, setLaydown] = useState(false);
  useEffect(() => {
    setLaydown(false);
  }, []);
  return (
    <div className={`headerOffline `}>
      {/* icon div  */}
      <div
        className="bar_icon"
        onClick={() => {
          setLaydown((prev) => !prev);
          console.log(laydown);
        }}
      >
        <i className="bi bi-list"></i>
      </div>
      <div className="container">
        <div className="header_container">
          {/* navigatatin div  */}
          <div className="navigation_links">
            <p>Accueil</p>
            <p>CLRPQ</p>
            <p>CNRPQ</p>
          </div>
          {/* the account div  */}
          <div className="account_holder" onClick={() => setShowLogin(true)}>
            {/* the circle  */}
            Se Connecter
          </div>
        </div>
      </div>
      <div className={`navigation_links_responsive ${laydown && "active_res"}`}>
        <p>Accueil</p>
        <p>CLRPQ</p>
        <p>CNRPQ</p>
      </div>
    </div>
  );
};

export default Header;
