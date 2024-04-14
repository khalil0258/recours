import React, { useState } from 'react'
import './affichageDecision.css'
import { PDFViewer } from "@react-pdf/renderer";
import PdfDecision from './../../../components/pdf_decison/PdfDecision'
import Button from 'react-bootstrap/Button';

import { useSelector } from "react-redux";

function AffichageDecision({showDecision, setShowDecision}) {

    const [aria, setAria] = useState() ;

    const user = useSelector((state) => state.auth?.userInfos);
      //console.log(user)

    const fermer = () => {
        setAria(true);
        setTimeout(() => {
            setShowDecision({
                afficher: false, 
                decision: {} 
            });

            setAria(false)
        }, 200);
    }

  return (
    <div className='container_afficher_decision' aria-hidden={aria ? "true" : "false"}>
        <div className="boite">


            <div className="boite-body">

                <span className="fermer_decision" onClick={fermer}>
                    <i className="bi bi-x"></i>
                </span>

                <div className="pdfshow" /* style={{ width: "90%", height: "100vh" }} */>
                    <PDFViewer width="100%" height="100%">
                        <PdfDecision decision={showDecision.decision} userinfos={user.userinfos} />
                    </PDFViewer>
                </div>

                {/* <Button className="telecharger" variant="outline-primary"> Télécharger la Décision </Button> */}
                
            </div>

        </div>
    </div>
  )
}

export default AffichageDecision


