import React, { useEffect, useRef, useState } from "react";
import "./Consulter_rec.css";
import axios from "axios";
//import { Link } from 'react-router-dom';

import Detail from "./../details_Recours/Details";
import Button from "react-bootstrap/Button";

const Consulter_rec = () => {
  //contiendera tous les recours recuperer depuis la BDD
  const [allRecours, setAllRecours] = useState([]);
  //contiendera les recours a afficher et les filters seront effectuer sur ce state
  const [recours, setRecours] = useState([]);

  //afficher et cacher le dropdown des filtres
  const [dropdown, setDropDown] = useState(false);

  // stocker l'input a afficher selon le filter choisi
  const [input1, setInput1] = useState(null);
  const [input2, setInput2] = useState(null);
  const [input3, setInput3] = useState(null);
  const [inputDate, setInputDate] = useState(null);

  //pour definir le nombre d'enregistremenr a afficher (show entries)
  const [show, setShow] = useState("");

  //la valeur de l'input date
  //const [date, setDate] = useState('') ;
  const dateRef = useRef("");

  //afficher la fentre de detail de recours
  const [showDetail, setShowDetail] = useState({
    afficher: false,
    recours: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/recours/getRecours")
      .then((res) => {
        if (res.data.statut === "erreur") {
          //console.log(res);
        } else {
          //console.log(res.data)
          const rec = res.data.resultat.reverse();
          setAllRecours(rec);
          setRecours(rec);

        }
      })
      .catch((err) => {
        //console.log(err)
      });
  }, []);

  //dropdown handle (afficher et cacher la liste des filtres)
  const openFilter = () => {
    setDropDown(!dropdown);
  };

  //filtrer par date
  const filtrerDate = () => {

    //console.log(date)                            // la solution avec le state ne fonctionne pas
    //console.log(dateRef.current.value);          // j'ai utilise le useRef

    let dateValue = dateRef.current.value;

    let copieRecours = allRecours.slice();
    if (dateValue !== "")
      copieRecours = copieRecours.filter(
        (item) => item.date.substring(0, 4) === dateValue
      );

    setRecours(copieRecours);
  };

  //filtrer par objet, statut et par commission
  const filtrer = (e) => {
    const filterChoisi = e.target.name.toLowerCase();
    //creer une copie du state
    /* let copieRecours = [...allRecours]; */
    let copieRecours = allRecours.slice();

    const val = e.target.value;
    if (val !== "placeholder")
      //si le placeholder est choisi on reafichera tous les recours
      copieRecours = copieRecours.filter((item) => item[filterChoisi].toLowerCase() === val.toLowerCase());

    setRecours(copieRecours);
  };

  // afficher l'input selon le filter choisi
  const afficherInput = (e) => {
    //cacher le dropdown
    setDropDown(!dropdown);

    setRecours(allRecours)

    setInput1(null);
    setInput2(null);
    setInput3(null);
    setInputDate(null);

    const filter = e.target.textContent;

    if (filter === "Objet") {
      const inp = (
        <div className="recours_filterInput">
          <select name={filter} onChange={filtrer} id="sel1">
            <option value="placeholder"> Filtrer par {filter} </option>
            <option value="demande annulation de cotisations">
              Demande annulation de cotisations
            </option>
            <option value="demande de paiement de cotisations">
              Demande de paiement de cotisations
            </option>
            <option value="pénalité et/ou majoration de retard">
              Pénalité et/ou majoration de retard
            </option>
            <option value="revoir le montant de cotisation">
              Revoir le montant de cotisation
            </option>
            <option value="demande de validation ou remboursement de cotisations">
              Demande de validation ou remboursement de cotisations
            </option>
            <option value="relatif à l'assurance invalidité">
              Relatif à l'assurance invalidité
            </option>
            <option value="realitf aux assurances en natures">
              Realitf aux assurances en natures
            </option>
            <option value="capital décès">Capital décès</option>
            <option value="augmentation du pension de retraite">
              Augmentation du pension de retraite
            </option>
          </select>
        </div>
      );
      setInput1(inp);
    } else if (filter === "Commission") {
      const inp = (
        <div className="recours_filterInput">
          <select name={filter} onChange={filtrer} id="sel2">
            <option value="placeholder"> Filtrer par {filter} </option>
            <option value="locale">Locale</option>
            <option value="nationale">Nationale</option>
          </select>
        </div>
      );
      setInput2(inp);
    } else if (filter === "Statut") {
      const inp = (
        <div className="recours_filterInput">
          <select name={filter} onChange={filtrer} id="sel3">
            <option value="placeholder"> Filtrer par {filter} </option>
            <option value="en cours de traitement">
              En cours de traitement
            </option>
            <option value="annulé">Annulé</option>
            <option value="traité">Traité</option>
          </select>
        </div>
      );
      setInput3(inp);
    } else {
      const inp = (
        <div className="recours_filterInput date">
            <input
              type="number"
              placeholder="Saisir l'année ici"
              ref={dateRef}
              onChange={(e) => {
                if (e.target.value === "") setRecours(allRecours);

                //setDate(e.target.value)
              }}
            />
            <button type="submit" name="date" className="btn btn-primary" onClick={filtrerDate}>
              Filtrer
            </button>
        </div>
      );
      setInputDate(inp);
    }
  };

  //le nombre d'enregistrement a afficher
  const showEntries = (e) => {
    let value = e.target.value;
    setShow(value);
  };

  return (
    <>
      {showDetail.afficher && (
        <Detail setShowDetail={setShowDetail} showDetail={showDetail} />
      )}

      <div className="container_recours">
        <h1>Mes Recours</h1>

        {/* le filter */}
        <div className="recours_filter">
          {/* <input type="text" value={date} /> */}

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

          <div className="dropdown">
            <button
              className="btn rounded-3 btn-filtrer"
              type="button"
              id="dropdownMenuButton1"
              aria-expanded="false"
              onClick={openFilter}
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
                Objet
              </li>
              <li className="dropdown-item" onClick={afficherInput}>
                Date
              </li>
              <li className="dropdown-item" onClick={afficherInput}>
                Commission
              </li>
              <li className="dropdown-item" onClick={afficherInput}>
                Statut
              </li>
            </ul>
          </div>

          {/* l'input selon le filter choisi */}
          {input1 != null && input1}
          {input2 != null && input2}
          {input3 != null && input3}
          {inputDate != null && inputDate}
        </div>

        {/* le tableau */}
        <div className="table-container">
          <table className="table table-striped responsive">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Objet</th>
                <th>Date</th>
                <th>Commission</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recours
                .slice(
                  0,
                  show === "" || show === "Tous"
                    ? recours.length
                    : parseInt(show, 10)
                )
                .map((r) => (
                  <tr key={r.id_recours}>
                    <td> {r.id_recours} </td>
                    <td> {r.objet} </td>
                    <td> {new Date(r.date).toLocaleDateString()} </td>
                    <td> {r.commission} </td>
                    <td
                      id={
                        r.statut === "traité"
                          ? "vert"
                          : r.statut === "annulé"
                          ? "rouge"
                          : "jaune"
                      }
                    >
                      {r.statut}
                    </td>
                    <td>
                      {/* <Link to={`details_recours/${r.id_recours}`} className='btn btn-primary' onClick={() => setShowDetail(true)}>Détails</Link> */}

                      <Button className='btn_afficher' variant="outline-primary"
                        onClick={() =>
                          setShowDetail({ afficher: true, recours: r })
                        }
                      >
                        Détails
                      </Button>
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Consulter_rec;


