import React from "react";
import { Link } from "react-router-dom";

const Message_valide = () => {
  return (
    <div>
      <div className="overlay" />
      <div className="message">
        <i class="bi bi-check-circle-fill"></i>
        <h4>Recours ajoute avec succes</h4>
        <Link to="/assure/tableau_de_bord" className="lien_tablau">
          Exit
        </Link>
      </div>
    </div>
  );
};

export default Message_valide;
