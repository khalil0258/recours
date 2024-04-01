import React, { useState } from "react";
import "./Header.css";
import { FaBars } from "react-icons/fa6";
import SideBar from "./SideBar";

const Header = ({ sidebarOpener, openBar }) => {
  console.log(openBar);
  return (
    <div className={`header ${!openBar && "active_header"}`}>
      {/* icon div  */}
      <div
        className="bar_icon"
        onClick={() => {
          sidebarOpener(!openBar);
        }}
      >
        <FaBars />
      </div>
      <div className="container">
        <div className="header_container">
          {/* navigatatin div  */}
          <div className="navigation_links">
            <p>Accueil</p>
          </div>
          {/* the account div  */}
          <div className="account_holder">
            {/* the circle  */}
            <div className="account_circle">
              <span>HB</span>
            </div>

            <p>Hadjaz brahim khalil</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
