import React, { useEffect, useState } from "react";
import "./Compte.css";
import { getUserInfos, updateInfos } from "../../../api";
import ModifyPassword from "../../../components/compteComponents/ModifyPassword";
import CompletePopup from "../../../components/compteComponents/CompletePopup";

const Compte = () => {
  const [infos, setInfos] = useState({});
  const [firstEmail, setFirstEmail] = useState("");
  const [secondEmail, setSecondEmail] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [show, setShow] = useState({ show: false, password: false });
  useEffect(() => {
    getUserInfos()
      .then((res) => {
        setInfos(res.data.data[0]);
        setFirstEmail(res.data.data[0]?.email);
        setSecondEmail(res.data.data[0]?.email);
      })
      .catch((err) => console.log(err));
  }, []);
  // update profile
  const updateProfile = async () => {
    console.log(isValidEmail(infos.email), infos.numero_telephone);
    if (isValidEmail(infos.email) && infos.numero_telephone.length === 10) {
      const response = await updateInfos({
        email: infos.email,
        numero_telephone: infos.numero_telephone,
      });
      console.log(response);
      if (
        response.status === 200 &&
        response.data.statut === "le profil a été mis à jour avec succès"
      ) {
        setShow({ show: true, password: false });
      }
    } else {
      if (!isValidEmail(infos.email)) {
        setError({ error: true, message: "verifie si l email est valide " });
      } else {
        setError({
          error: true,
          message: "verifie si le numero de telephone est valide",
        });
      }
    }
  };

  // to verify email structure
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  return (
    <div className="compte">
      {/* big banner  */}
      <div className="banner">
        {" "}
        <h2>Mon Profile</h2>
      </div>{" "}
      {!!show?.show && (
        <CompletePopup password={show?.password} setShow={setShow} />
      )}
      <div className="infomations_general">
        <h4>Informations</h4>
        <div className="information_container">
          <div className="infos">
            <div>Genre*</div>
            <input
              disabled
              type="text"
              value={infos.genre}
              // onChange={(event) =>
              //   setInfos((prev) => ({
              //     ...prev,
              //     genre: event.target.value,
              //   }))
              // }
            />
          </div>
          <div className="infos">
            <div>Date de naissance*</div>
            <input
              type="date"
              value={infos.date_naissance?.split("T")[0]}
              disabled
            />
          </div>
          <div className="infos">
            <div>Prenom*</div>
            <input type="text" value={infos.prenom} disabled />
          </div>
          <div className="infos">
            <div>Nom*</div>
            <input type="text" value={infos.nom} disabled />
          </div>
          <div className="infos">
            <div>Telephone Portable*</div>
            <input
              type="number"
              maxLength={10}
              value={infos.numero_telephone}
              onChange={(event) =>
                setInfos((prev) => ({
                  ...prev,
                  numero_telephone: event.target.value,
                }))
              }
            />
          </div>
          <div className="infos">
            <div>Numero de SS*</div>
            <input type="text" value={infos.numero_ss} disabled />
          </div>
          <div className="infos">
            <div>Adresse*</div>
            <input
              type="text"
              value={infos.adresse}
              // onChange={(event) =>
              //   setInfos((prev) => ({
              //     ...prev,
              //     prenom: event.target.value,
              //   }))
              // }
              disabled
            />
          </div>
        </div>
      </div>{" "}
      <div className="infomations_general ">
        <h4>Identifiant</h4>
        <div className="information_container">
          <div className="infos">
            <div>Email*</div>
            <input
              type="email"
              value={firstEmail}
              onChange={(e) => setFirstEmail(e.target.value)}
            />
          </div>
          <div className="infos">
            <div>Confirmer l'email*</div>
            <input
              type="email"
              value={secondEmail}
              onChange={(e) => {
                setSecondEmail(e.target.value);
                console.log(firstEmail.trim(), e.target.value.trim());
                if (firstEmail.trim() === e.target.value.trim()) {
                  setError({});
                  setInfos((prev) => ({
                    ...prev,
                    email: firstEmail,
                  }));
                } else {
                  setError({
                    error: true,
                    message: "les emails ne correspondent pas",
                  });
                }
              }}
            />
          </div>
        </div>
        <ModifyPassword
          setError={setError}
          passwordBd={infos.mot_de_passe}
          setShow={setShow}
          showhow={show}
        />
      </div>
      {!!error.error && <div className="message_error"> {error.message}</div>}
      <div className="infomations_general lastone">
        <button className="register_new_data" onClick={updateProfile}>
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default Compte;
