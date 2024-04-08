import React from "react";
import { Link } from "react-router-dom";
import AccuserPdf from "./AccuserPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Message_valide = ({ data }) => {
  return (
    <div>
      <div className="overlay" />
      <div className="message">
        <i class="bi bi-check-circle-fill"></i>
        <h4>Recours ajoute avec succes</h4>
        <PDFDownloadLink
          document={<AccuserPdf data={data} />}
          fileName="accuse"
        >
          {({ loading }) =>
            loading ? (
              <button className="lien_tablau ">Loading....</button>
            ) : (
              <button className="lien_tablau">Accuse de reception</button>
            )
          }
        </PDFDownloadLink>
        <Link to="/assure/tableau_de_bord" className="lien_tablau">
          Exit
        </Link>
      </div>
    </div>
  );
};

export default Message_valide;
