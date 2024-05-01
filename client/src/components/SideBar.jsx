import React, { useEffect } from "react";
import "./SideBar.css";
import { Link, useLocation } from "react-router-dom";

const SideBar = ({ openBar, phone, setOpenBar }) => {

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1260) {
        setOpenBar(false);
      } else {
        setOpenBar(true);
      }
    };

    // Appel initial pour définir l'état selon la taille initiale de l'écran
    handleResize();

    // Ajouter un écouteur d'événements pour surveiller les changements de taille de l'écran
    window.addEventListener('resize', handleResize);

    // Nettoyage de l'écouteur d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 
  const parame = useLocation();
  //console.log(openBar, phone);
  return (
    <div className={`sideBar ${!openBar && "hidden"} `}>
      {/* logo div  */}

      <div className="logo">
        
          <span className="logo-cercle">TR</span>
          <span className={!openBar && "text-hidden"}><span className="bleu">Télé</span>-Recours</span>
        
      </div>
      <div className="links_sidebar">
        <div>
          <Link
            to=""
            className="link"
            onClick={() => {
              if (phone === true) {
                setOpenBar(false);
              }
            }}
          >
            <p
              className={
                parame.pathname.split("/")[2] === undefined ? `active` : ""
              }
            >
              <i class="bi bi-speedometer"></i>
              <span className={!openBar && "text-hidden"}>Tableau de bord</span>
            </p>
          </Link>
          <Link
            to="soumetre_recours"
            className="link"
            onClick={() => {
              if (phone === true) {
                setOpenBar(false);
              }
            }}
          >
            <p
              className={
                parame.pathname.split("/")[2] === "soumetre_recours"
                  ? `active`
                  : ""
              }
            >
              {/* <i class="bi bi-plus-square"></i> */}
              <i class="bi bi-plus-square-fill"></i>
              <span className={!openBar && "text-hidden"}>Soumettre un recours</span>
            </p>
          </Link>
          <Link
            to="consulter_recours"
            className="link"
            onClick={() => {
              if (phone === true) {
                setOpenBar(false);
              }
            }}
          >
            <p
              className={
                parame.pathname.split("/")[2] === "consulter_recours"
                  ? `active`
                  : ""
              }
            >
              <i class="bi bi-files"></i>
              <span className={!openBar && "text-hidden"}>Mes recours</span>
            </p>
          </Link>
          <Link
            to="consulter_decisions"
            className="link"
            onClick={() => {
              if (phone === true) {
                setOpenBar(false);
              }
            }}
          >
            <p
              className={
                parame.pathname.split("/")[2] === "consulter_decisions"
                  ? `active`
                  : ""
              }
            >
              {/* <i class="bi bi-clipboard2-check"></i> */}
              {/* <i class="bi bi-ui-checks"></i> */}
              <i class="bi bi-clipboard2-check-fill"></i>
              <span className={!openBar && "text-hidden"}>Mes decisions</span>
            </p>
          </Link>
          <Link
            to="mon_profile"
            className="link"
            onClick={() => {
              if (phone === true) {
                setOpenBar(false);
              }
            }}
          >
            <p
              className={
                parame.pathname.split("/")[2] === "mon_profile" ? `active` : ""
              }
            >
              <i class="bi bi-person-gear"></i>
              {/* <i class="bi bi-person-check"></i> */}
              <span className={!openBar && "text-hidden"}>Mon Profile</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
