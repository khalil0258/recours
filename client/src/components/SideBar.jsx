import React from "react";
import "./SideBar.css";
import { FaBars } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const SideBar = ({ openBar }) => {
  const parame = useLocation();
  console.log(parame.pathname.split("/")[2]);
  // const [pathname,setPathname]=use
  return (
    <div className={`sideBar ${!openBar && "hidden"} `}>
      {/* icon div  */}

      <div className="links_sidebar">
        <div>
          <Link to="tableau_de_bord" className="link">
            <p
              className={
                parame.pathname.split("/")[2] === "tableau_de_bord"
                  ? `active`
                  : ""
              }
            >
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
        </div>
      </div>
    </div>
  );
};

export default SideBar;
