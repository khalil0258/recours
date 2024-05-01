import React, { useState } from "react";
import { changerMotpass } from "../../api";

const ModifyPassword = ({ setError, passwordBd, setShow, show }) => {
  const [showPs, setShowPs] = useState(false);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmed: "",
  });
  const HandlePassword = async () => {
    //console.log("first");
    if (
      !!password.oldPassword.trim().length &&
      !!password.newPassword.trim().length &&
      !!password.confirmed.trim().length
    ) {
      if (password.newPassword !== password.confirmed) {
        setError({
          error: true,
          message: "Les mots de passe ne se correspondent pas",
        });
      } else {
        setError({});
        // hna nkemal le code
        let data = {
          oldPassword: password.newPassword,
          newPassword: password.newPassword,
          passwordBd: passwordBd,
        };
        const response = await changerMotpass(data);
        if (
          response.status === 200 &&
          response.data.statut === "le mot de passe est change avec succes"
        ) {
          //console.log("first");
          setShow({ show: true, password: true });
          setError({});
          //console.log(show);
        }
      }
    } else {
      setError({ error: true, message: "Veuilliez remplir tout les champs" });
    }
  };
  return (
    <div>
      {!!showPs && (
        <div className="information_container">
          <div className="infos">
            <div>Ancien mot de passe*</div>
            <input
              type="text"
              onChange={(event) => {
                setPassword((prev) => ({
                  ...prev,
                  oldPassword: event.target.value,
                }));
              }}
            />
          </div>
          <div className="infos">
            <div>Nouveau mot de passe</div>
            <input
              type="text"
              onChange={(event) => {
                setPassword((prev) => ({
                  ...prev,
                  newPassword: event.target.value,
                }));
              }}
            />
          </div>
          <div className="infos">
            <div>Confirmez le nouveau mot de passe</div>
            <input
              type="text"
              onChange={(event) => {
                setPassword((prev) => ({
                  ...prev,
                  confirmed: event.target.value,
                }));
              }}
            />
          </div>
        </div>
      )}
      <div>
        <button
          className="showMotpass"
          onClick={() => {
            if (!!showPs) {
              HandlePassword();
            } else {
              setShowPs(true);
            }
          }}
        >
          Modify mot pass
        </button>
      </div>
    </div>
  );
};

export default ModifyPassword;
