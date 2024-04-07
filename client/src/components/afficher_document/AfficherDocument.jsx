import './afficher_document.css';
import React, { useState } from 'react'

// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';

//import packageJson from './../../../package.json';


function Afficher_document({showDocument, setShowDocument}) {

    // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  //pour recupurer la version de pdfjs-dist pour la bonne version du worker
  //const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];

    //const [pdfFile, setPdfFile] = useState('./../../assets/file.pdf'); 
    const [pdfFile, setPdfFile] = useState('http://localhost:4000/assure/file.pdf');
    const [aria, setAria] = useState(false)

    const fermer = () => {
        setAria(true);
        setTimeout(() => {
            setShowDocument({
                afficher: false, 
                document: {
                    nom: '',
                    chemin: '',
                    type: ''
                } });

            setAria(false)
        }, 200);
    }

    

  return (
    <div className='container_afficher_document' aria-hidden={aria ? "true" : "false"}>
        <div className="boite">

            <div className="boite-header">
                <span className="titre">Affichage du Document </span>
                <span className="fermer" onClick={fermer}>
                    <i className="bi bi-x"></i>
                </span>
            </div>

            <div className="boite-body">
                {/* render this if we have a pdf file */}
                {pdfFile&&(
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer 
                        fileUrl={pdfFile}
                        plugins={[defaultLayoutPluginInstance]}
                        
                    />
                        
                </Worker>
                )}

                {/* render this if we have pdfFile state null   */}
                {!pdfFile&&<>No file is selected yet</>}

                {/* <img 
                src={"http://localhost:4000/assure/login.jpg"} 
                alt={'ffff'} 
                style={{width: "400px", height: "400px"}} 
                /> */}
            </div>

        </div>
    </div>
  )
}

export default Afficher_document
