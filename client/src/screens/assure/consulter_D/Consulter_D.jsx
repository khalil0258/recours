import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Consulter_d.css";

const Consulter_D = () => {

  //contiendera toutes les decisions recuperer depuis la BDD
  const [allDecisions, setAllDecisions] = useState([]);
  //contiendera les decisions a afficher et les filters seront effectuer sur ce state
  const [decisions, setDecisions] = useState([]);

  //pour definir le nombre d'enregistremenr a afficher (show entries)
  const [show, setShow] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:4000/recours/getDecisions")
      .then((res) => {
        if (res.data.statut === "erreur") {
          //console.log(res);
        } else {
          //console.log(res.data)
          setAllDecisions(res.data.resultat);
          setDecisions(res.data.resultat);
        }
      })
      .catch((err) => {
        //console.log(err)
      });
  }, []);



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
        <div className="filter">

          <div className="showEntries">
            <span>Afficher</span>
            <select name="" className="showInput" onChange={showEntries}>
              <option value="Tous">Tous</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <span>Recours</span>
          </div>

          

          {/* l'input selon le filter choisi */}
          
        </div>

        {/* le tableau */}
        <table className="table table-striped responsive">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Décision sur la forme</th>
              <th>Décision sur le sujet</th>
              <th>Description</th>
              <th>Date</th>
              <th>Référence réunion</th>
              <th>Référence recours</th>
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
                  <td> {d.id_decision} </td>
                  <td> {d.decision_forme} </td>
                  <td> {d.decision_sujet} </td>
                  <td> {d.description} </td>
                  <td> {d.date.substr(0, 10)} </td>
                  <td> {d.id_reunion} </td>
                  <td> {d.id_recours} </td>
                  <td>
                    <button className="btn btn-primary"> Imprimer </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
  
};

export default Consulter_D;
