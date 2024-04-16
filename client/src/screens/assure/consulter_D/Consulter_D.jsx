import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./Consulter_d.css";
import Button from 'react-bootstrap/Button';
import AffichageDecision from "../affichage_pdf_decision/AffichageDecision";

const Consulter_D = () => {

  //contiendera toutes les decisions recuperer depuis la BDD
  const [allDecisions, setAllDecisions] = useState([]);
  //contiendera les decisions a afficher et les filters seront effectuer sur ce state
  const [decisions, setDecisions] = useState([]);

  //afficher et cacher le dropdown des filtres
  const [dropdown, setDropDown] = useState(false);

  //pour definir le nombre d'enregistremenr a afficher (show entries)
  const [show, setShow] = useState("");

  //l'input a afficher
  const [input, setInput] = useState(null) ; 
  const [input1, setInput1] = useState(null);
  const [input2, setInput2] = useState(null);
  const [input3, setInput3] = useState(null);

  //valeur de l'input afficher
  //const [inputValue, setInputValue] = useState('') ; 
  const inputValue = useRef();

  const [showDecision, setShowDecision] = useState({
    afficher: false,
    decision: {}
  });


  useEffect(() => {
    axios
      .get("http://localhost:4000/recours/getDecisions")
      .then((res) => {
        if (res.data.statut === "erreur") {
          //console.log(res);
        } else {
          //console.log(res.data.resultat)
          const d = res.data.resultat.reverse();
          setAllDecisions(d);
          setDecisions(d);
        }
      })
      .catch((err) => {
        //console.log(err)
      });
  }, []);


  //filtrer par id_decision, decision, date et par id_recours
  const filtrer = (e) => {
    const filterChoisi = e.target.name.toLowerCase();

    let value = '' ;
    if(filterChoisi !== "décision"){
      value = inputValue.current.value;
    }else{
      value = e.target.value;
    }
    //console.log("name == " + value)

    //creer une copie du state
    let copieDecisions = allDecisions.slice();
    
    if (filterChoisi === "décision"){

      if(value !== "placeholder"){
        //si le placeholder est choisi on reafichera toutes les deciosions

        /* if(value === "accepte_forme")
          copieDecisions = copieDecisions.filter((item) => item.decision_forme.toLowerCase() === "accepté");
        else if(value === "accepte_sujet")
          copieDecisions = copieDecisions.filter((item) => item.decision_sujet.toLowerCase() === "accepté");
        else if(value === "rejete_forme")
          copieDecisions = copieDecisions.filter((item) => item.decision_forme.toLowerCase() === "rejeté");
        else if(value === "rejete_sujet")
          copieDecisions = copieDecisions.filter((item) => item.decision_sujet.toLowerCase() === "rejeté"); */

        if(value === "rejete"){
          copieDecisions = copieDecisions.filter((item) => item.decision_sujet.toLowerCase() !== "accepté");
        }else if(value === "accepte"){
          copieDecisions = copieDecisions.filter((item) => item.decision_sujet.toLowerCase() === "accepté");
        }

      }

    }else{

      if(filterChoisi === "date")
        copieDecisions = copieDecisions.filter((item) => item[filterChoisi].substring(0, 4) === value);
      else
        copieDecisions = copieDecisions.filter((item) => item[filterChoisi] === parseInt(value, 10));

    }
      
    setDecisions(copieDecisions);
  };


  // afficher l'input selon le filter choisi
  const afficherInput = (e) => {
    //cacher le dropdown
    setDropDown(!dropdown);

    setDecisions(allDecisions)

    setInput(null)
    setInput1(null);
    setInput2(null);
    setInput3(null);

    const critere = e.target.textContent.toLowerCase() ;

    let inp = "" ; 
    if (critere === "décision") {
      inp = (
        <div className="decision_filterInput">
          <select name={critere} onChange={filtrer} >
            <option value="placeholder"> Filtrer par {critere} </option>
            {/* <option value="accepte_forme">
              Accepté dans la forme
            </option>
            <option value="accepte_sujet">
              Accepté dans le sujet
            </option>
            <option value="rejete_forme">
              Rejeté dans la forme
            </option>
            <option value="rejete_sujet"> 
              Rejeté dans le sujet
            </option> */}

            <option value="rejete">
              Rejeté
            </option>
            <option value="accepte"> 
              Accepté
            </option>
          </select>
        </div>
      );
      setInput(inp);
    } else {
      inp = (
        <div className="decision_filterInput date">
          <input
            type="number"
            placeholder = {critere === "référence décision" ? "Ex : 12" : (critere === "date" ? "Saisir l'année ici" : "Ex : 34")} 
            ref = {inputValue}
            onChange={(e) => {
              if (e.target.value === "") 
                setDecisions(allDecisions);
              
            }}
          />
          <button type="submit" className="btn btn-primary" name = {critere === "référence décision" ? "id_decision" : (critere === "date" ? "date" : "id_recours")} onClick={filtrer}>
            Filtrer
          </button>
        </div>
      );

      if(critere === "référence décision") setInput1(inp)
      else if(critere === "date") setInput2(inp)
      else setInput3(inp)
    }
    
  };



  //le nombre d'enregistrement a afficher
  const showEntries = (e) => {
    let value = e.target.value;
    setShow(value);
  };


  return (
    <>
      <div className="container_decision">
        <h1>Mes Décisions</h1>

        {/* le filter */}
        <div className="decision_filter">

          <div className="showEntries">
            <span>Afficher</span>
            <select name="" className="showInput" onChange={showEntries}>
              <option value="Tous">Tous</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <span>Décisions</span>
          </div>

          {/* drop down choisir le critere de filter */}
          <div className="dropdown">
            <button
              className="btn rounded-3 btn-filtrer"
              type="button"
              id="dropdownMenuButton1"
              aria-expanded="false"
              onClick={() => setDropDown(!dropdown)}
            >
              <i className="bi bi-filter me-1"></i>
              <span>Filtrer Par</span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
              id={dropdown ? "afficher" : "cacher"}
            >
              <li className="dropdown-item" onClick={afficherInput}>
                Référence Décision
              </li>
              <li className="dropdown-item" onClick={afficherInput}>
                Décision
              </li>
              <li className="dropdown-item" onClick={afficherInput}>
                Date
              </li>
              <li className="dropdown-item" onClick={afficherInput}>
                Référence Recours
              </li>
            </ul>
          </div>

          {/* l'input selon le filter choisi */}
          {input && input} 
          {input1 != null && input1}
          {input2 != null && input2}
          {input3 != null && input3}

        </div>

        {/* le tableau */}
        
        <div className="table-container">
          <table className="table table-striped">
            <thead>
              <tr>
                {/* <th>Référence</th>
                <th>Date</th>
                <th>Référence réunion</th>
                <th>Référence recours</th>
                <th>Décision sur la forme</th>
                <th>Décision sur le sujet</th>
                <th>Action</th> */}

                <th>Référence</th>
                <th>Date</th>
                <th>Référence réunion</th>
                <th>Référence recours</th>
                <th>Décision</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {decisions
                .slice(
                  0,
                  show === "" || show === "Tous"
                    ? decisions.length
                    : parseInt(show, 10)
                )
                .map((d) => (
                  <tr key={d.id_decision}>
                    {/* <td> {d.id_decision} </td>
                    <td> {d.date.substr(0, 10)} </td>
                    <td> {d.id_reunion} </td>
                    <td> {d.id_recours} </td>
                    <td> {d.decision_forme} </td>
                    <td> {d.decision_sujet} </td>
                    <td>
                      <button className="btn btn-primary"> Imprimer </button>
                    </td> */}

                    <td> {d.id_decision} </td>
                    <td> {new Date(d.date_decision).toLocaleDateString()} </td>
                    <td> {d.id_reunion} </td>
                    <td> {d.id_recours} </td>
                    <td className={(d.decision_sujet !== null && d.decision_sujet.toLowerCase() === "accepté")  ? "accepté" : "rejeté"} > 
                      {(d.decision_sujet !== null && d.decision_sujet.toLowerCase() === "accepté")  ? "Accepté" : "Rejeté"}
                    </td>
                    <td>
                      <Button variant="outline-primary" onClick={() => setShowDecision({afficher: true, decision: d})}> Imprimer </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      { showDecision.afficher && <AffichageDecision showDecision={showDecision} setShowDecision={setShowDecision} /> }

    </>
  )
  
};

export default Consulter_D;
