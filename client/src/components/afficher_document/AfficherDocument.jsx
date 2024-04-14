import './afficher_document.css';
import React, { useState } from 'react'

import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer , SpecialZoomLevel } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


import { Document, Page, View, StyleSheet, Image } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";


/* import packageJson from '../../..//package.json';
const pdfjsVersion = packageJson.dependencies['pdfjs-dist']; */


function Afficher_document({showDocument, setShowDocument}) {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

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

            <div className="boite-body">

                <span className="fermer_document" onClick={fermer}>
                    <i className="bi bi-x"></i>
                </span>

                { showDocument.document.type === ".pdf" ? 
                    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                        <Viewer 
                            defaultScale={SpecialZoomLevel.PageFit}
                            fileUrl={`http://localhost:4000/${showDocument.document.chemin}`}
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                    :
                    <PDFViewer width="100%" height="100%">
                        <Document size="A4">
                            <Page>
                                <Image src={`http://localhost:4000/${showDocument.document.chemin}`} />
                            </Page>
                        </Document>
                    </PDFViewer>
                }
                
            </div>

        </div>
    </div>
    
  )

  
}

export default Afficher_document





