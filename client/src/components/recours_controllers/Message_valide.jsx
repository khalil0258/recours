import React from "react";
import { Link } from "react-router-dom";
import AccuserPdf from "./AccuserPdf";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const Message_valide = ({ data }) => {
  return (
    <div>
      <div className="overlay" />
      <div className="message">
        <i class="bi bi-check-circle-fill"></i>
        <h4>Recours ajoute avec succes</h4>
        <div className="pdfHolder">
          <PDFViewer width="100%" height="100%">
            <AccuserPdf data={data} />
          </PDFViewer>
        </div>
        <PDFDownloadLink
          document={<AccuserPdf data={data} />}
          fileName="accuse_reception"
        >
          {({ loading }) =>
            loading ? (
              <button className="lien_tablau ">Loading....</button>
            ) : (
              <button className="lien_tablau">Telecharger</button>
            )
          }
        </PDFDownloadLink>
        <Link to="/assure" className="lien_tablau">
          Exit
        </Link>
      </div>
    </div>
  );
};

export default Message_valide;
