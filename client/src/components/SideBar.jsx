import React from "react";
import "./SideBar.css";
import { Link, useLocation } from "react-router-dom";

const SideBar = ({ openBar }) => {
  const parame = useLocation();

  return (
    <div className={`sideBar ${!openBar && "hidden"} `}>
      {/* logo div  */}

      <div className="logo">
        <h2>
          <span>Télé</span>-Recours
        </h2>
      </div>
      <div className="links_sidebar">
        <div>
          <Link to="" className="link">
            <p className={parame.pathname.split("/")[2] === "" ? `active` : ""}>
              Tableau de bord
            </p>
          </Link>
          <Link to="soumetre_recours" className="link">
            <p
              className={
                parame.pathname.split("/")[2] === "soumetre_recours"
                  ? `active`
                  : ""
              }
            >
              Soumetre un recours
            </p>
          </Link>
          <Link to="consulter_recours" className="link">
            <p
              className={
                parame.pathname.split("/")[2] === "consulter_recours"
                  ? `active`
                  : ""
              }
            >
              Consulter les recours
            </p>
          </Link>
          <Link to="consulter_decisions" className="link">
            <p
              className={
                parame.pathname.split("/")[2] === "consulter_decisions"
                  ? `active`
                  : ""
              }
            >
              Consulter les decisions
            </p>
          </Link>
          <Link to="mon_profile" className="link">
            <p
              className={
                parame.pathname.split("/")[2] === "mon_profile" ? `active` : ""
              }
            >
              Mon Profile
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
