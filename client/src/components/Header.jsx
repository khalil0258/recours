import React, { useState } from "react";
import "./Header.css";
import { FaBars } from "react-icons/fa6";
import SideBar from "./SideBar";

const Header = () => {
  const [openBar, setOpenBar] = useState(false);
  const sidebarOpener = (value) => {
    setOpenBar(value);
  };
  console.log(openBar);
  return (
    <div className="header">
      {/* icon div  */}

      <div
        className="bar_icon"
        onClick={() => {
          sidebarOpener(true);
        }}
      >
        <FaBars />
      </div>

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
      {/* now the side bar  */}
      <SideBar sidebarOpener={sidebarOpener} openBar={openBar} />
    </div>
  );
};

export default Header;
