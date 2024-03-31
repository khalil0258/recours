import React from "react";
import "./SideBar.css";
import { FaBars } from "react-icons/fa6";

const SideBar = ({ sidebarOpener, openBar }) => {
  return (
    <div className={`sideBar ${!openBar && "hidden"} `}>
      {/* icon div  */}

      <div
        className="bar_icon"
        onClick={() => {
          sidebarOpener(false);
        }}
      >
        <i className="bi bi-x-lg"></i>
      </div>

      <div className="links_sidebar">
        <div>
          <div>
            <p className="active">Tableau de bord</p>
          </div>
          <div>
            <p>Soumetre un recours</p>
          </div>
          <div>
            <p>Consulter les recours</p>
          </div>
          <div>
            <p>Consulter les decisions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
