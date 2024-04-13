import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import iconRecours from "./../../../assets/recoursIcone.png";
import iconEnCours from "./../../../assets/en cours de traitement.png";
import iconTraite from "./../../../assets/iconTraite.png";
import iconAnnuler from "./../../../assets/iconAnnuler.png";
import iconDecision from "./../../../assets/iconDecision.png";
import iconAccorde from "./../../../assets/iconAccorde.png";
import iconRejeter from "./../../../assets/iconRejeter.png";
import iconDeconnecter from "./../../../assets/iconDeconnecter.png";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authActions";

const Home = () => {
  const [valeurs, setValeurs] = useState({
    nb_recours: 0,
    nb_recours_en_cours_de_traitement: 0,
    nb_recours_annule: 0,
    nb_recours_traite: 0,
    nb_decisions: 0,
    nb_decisions_accorde: 0,
    nb_decisions_rejete: 0,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:4000/getStatistiques")
      .then((res) => {
        if (res.data.statut === "erreur") {
          //console.log(res);
        } else {
          //console.log(res.data)
          setValeurs(res.data.resultat);
        }
      })
      .catch((err) => {
        //console.log(err)
      });
  }, []);

  return (
    <div className="accueil">
      {/* le titre de la premiere page */}
      <div className="accueil-titre">
        <p>Bienvenu Dans Votre Espace Assuré</p>
      </div>

      {/* les cartes */}
      <div className="cards">
        <ul className="box-info">
          <li>
            <i className="">
              <img
                src={iconRecours}
                alt="plainte"
                style={{ width: "40px", height: "40px" }}
              />
            </i>
            <span className="text">
              <p>Recours</p>
              <h3> {valeurs.nb_recours} </h3>
            </span>
          </li>
          <li>
            <i className="">
              <img
                src={iconEnCours}
                alt="En cours"
                style={{ width: "40px", height: "40px" }}
              />
            </i>
            <span className="text">
              <p>En cours de traitement</p>
              <h3> {valeurs.nb_recours_en_cours_de_traitement} </h3>
            </span>
          </li>
          <li>
            <i className="">
              <img
                src={iconTraite}
                alt="En cours"
                style={{ width: "40px", height: "40px" }}
              />
            </i>
            <span className="text">
              <p>traités</p>
              <h3> {valeurs.nb_recours_traite} </h3>
            </span>
          </li>
          <li>
            <i className="">
              <img
                src={iconAnnuler}
                alt="En cours"
                style={{ width: "40px", height: "40px" }}
              />
            </i>
            <span className="text">
              <p>Recours annulés</p>
              <h3> {valeurs.nb_recours_annule} </h3>
            </span>
          </li>
          <li>
            <i className="">
              <img
                src={iconDecision}
                alt="En cours"
                style={{ width: "40px", height: "40px" }}
              />
            </i>
            <span className="text">
              <p>Décisions</p>
              <h3> {valeurs.nb_decisions} </h3>
            </span>
          </li>
          <li>
            <i className="">
              <img
                src={iconAccorde}
                alt="En cours"
                style={{ width: "40px", height: "40px" }}
              />
            </i>
            <span className="text">
              <p>Décisions accordées</p>
              <h3> {valeurs.nb_decisions_accorde} </h3>
            </span>
          </li>
          <li>
            <i className="">
              <img
                src={iconRejeter}
                alt="En cours"
                style={{ width: "40px", height: "40px" }}
              />
            </i>
            <span className="text">
              <p>Décisions rejetées</p>
              <h3> {valeurs.nb_decisions_rejete} </h3>
            </span>
          </li>
          <li>
            <i className="">
              <img
                src={iconDeconnecter}
                alt="En cours"
                style={{ width: "40px", height: "40px" }}
              />
            </i>
            <span className="text">
              <button
                className="btn-deconnecter"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Se Déconnecter
              </button>
            </span>
          </li>
        </ul>
      </div>
    </div> //div de accueil
  );
};

export default Home;
