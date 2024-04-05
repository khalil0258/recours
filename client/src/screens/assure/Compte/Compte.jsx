import React from "react";
import "./Compte.css";

const Compte = () => {
  return (
    <div>
      {/* big banner  */}
      <div className="banner">
        {" "}
        <h2>Mon Profile</h2>
      </div>
      <div className="infomations_general">
        <h4>Informations</h4>
        <div className="information_container">
          <div className="infos">
            <div>Genre*</div>
            <input type="text" />
          </div>
          <div className="infos">
            <div>Date de naissance*</div>
            <input type="text" />
          </div>
          <div className="infos">
            <div>Prenom*</div>
            <input type="text" />
          </div>
          <div className="infos">
            <div>Nom*</div>
            <input type="text" />
          </div>
          <div className="infos">
            <div>Telephone Portable*</div>
            <input type="text" />
          </div>
          <div className="infos">
            <div>Numero de SS*</div>
            <input type="text" />
          </div>
          <div className="infos">
            <div>Adresse*</div>
            <input type="text" />
          </div>
        </div>
      </div>{" "}
      <div className="infomations_general ">
        <h4>Identifiant</h4>{" "}
        <div className="information_container">
          <div className="infos">
            <div>Email*</div>
            <input type="text" />
          </div>
          <div className="infos">
            <div>Confirmer l'email*</div>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compte;
