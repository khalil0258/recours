import React from "react";

const CompletePopup = ({ password, setShow }) => {
  return (
    <div>
      <div className="overlay" />
      <div className="message">
        <i class="bi bi-check-circle-fill"></i>
        {password ? (
          <h4>Le mot de passe a été modifié avec succès</h4>
        ) : (
          <h4>Les informations du profil ont été modifiées avec succès</h4>
        )}
        <button
          className="lien_tablau"
          onClick={() => {
            setShow({ show: false, password: false });
          }}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default CompletePopup;
