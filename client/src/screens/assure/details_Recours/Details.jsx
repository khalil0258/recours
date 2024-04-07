import React, { useEffect, useState } from 'react'
import './details.css'
import axios from 'axios';
import AfficherDocument from '../../../components/afficher_document/AfficherDocument.jsx'

function Details({setShowDetail, showDetail}) {

    const [showDocument, setShowDocument] = useState({
        afficher: false,
        document: {
            nom: '',
            chemin: '',
            type: ''
        }
    }) ;

    const recours = showDetail.recours; 

    const [aria, setAria] = useState(false)

    const [documents, setDocuments] = useState([])

    //recuperer les documents depuis la BDD
    useEffect(() => {
        axios.get(`http://localhost:4000/recours/getDocuments?id_recours=${recours.id_recours}`)
            .then((res) => {
            if (res.data.statut === "erreur") {
                //console.log(res);
            } else {
                //console.log(res.data)
                setDocuments(res.data.resultat)
            }
            })
            .catch((err) => {
            //console.log(err)
            });
    }, [recours.id_recours]);


    const fermer = () => {
        setAria(true);

        setTimeout(() => {
            setShowDetail({afficher: false, recours: null});
            setAria(false)
        }, 200);
    }

  return (

    <>

        {showDocument.afficher && <AfficherDocument showDocument = {showDocument} setShowDocument = {setShowDocument} />}

        <div className='container_detail' aria-hidden={aria ? "true" : "false"}>

            <div className="boite">
                <div className="boite-header">
                    <span className="titre">Détails du Recours </span>
                    <span className="fermer" onClick={fermer}>
                        <i className="bi bi-x"></i>
                    </span>
                </div>
                <div className="boite-body">

                    <div className="infos_recours">
                        <h5>Les informations du recours : </h5>
                        <div className="infos">
                            <p> <span>Référence du recours : </span> {recours.id_recours} </p>
                            <p> <span> Objet du recours : </span> {recours.objet} </p>
                            <p> <span> Date d'envoi : </span> {recours.date} </p>
                            <p> <span> Commission concernée : </span> {recours.commission} </p>
                            {recours.motif !== null && <p> <span> Le motif : </span> {recours.motif} </p>}
                            <p> <span> Le statut : </span> {recours.statut} </p> 
                        </div>
                    </div>

                    <div className="document_recours">
                        <h5>Les documents joints : </h5>
                        <div className="liste_documents">
                            {
                                documents.map((d, i) => (
                                    <div className='document' key={d.id_piece} > 
                                        <div className='gauche'>
                                            <span className='ordre'>
                                                {i+1}
                                            </span>
                                            <span className='nom_document'>
                                                {d.nom}
                                            </span>
                                        </div>
                                        <div className="droite">
                                            <button className='btn btn-primary btn_afficher' 
                                                onClick={() => setShowDocument({
                                                    afficher: true,
                                                    document: {
                                                        nom: d.nom,
                                                        chemin: d.chemin,
                                                        type: d.type
                                                    }
                                                })}
                                            >

                                                Afficher
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                            

                            {/* <div className='document'>
                                <div className='gauche'>
                                    <span className='ordre'>
                                        01
                                    </span>
                                    <span className='nom_document'>
                                        demande de recours ecris.pdf
                                    </span>
                                </div>
                                <div className="droite">
                                    <button className='btn btn-primary btn_afficher'>Afficher</button>
                                </div>
                            </div> */}

                        </div>

                        
                    </div>

                </div>

            </div>
        
        </div>

    </>
  )
}

export default Details
