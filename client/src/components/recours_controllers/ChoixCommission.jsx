import React, { useEffect, useState } from "react";

const ChoixCommission = ({ setFormData, setChecking, checking, setErrore }) => {
  const [choixCommission, setChoixCommission] = useState("Locale");
  const [selectedReason, setSelectedReason] = useState("Decision");
  // Event handler to handle changes in the select element
  const handleChangeReason = (event) => {
    setSelectedReason(event.target.value);

    setFormData((prev) => ({
      ...prev,
      motif: choixCommission === "Locale" ? "" : event.target.value,
    }));
    if (choixCommission === "National") {
      setChecking((prev) => ({
        ...prev,
        type:
          event.target.value === "Decision"
            ? 1
            : event.target.value === "Montant"
            ? 3
            : 2,
      }));
    }
  };

  // use effect
  // useEffect(() => {
  //   handleSelectedStep();
  // },[choixCommission,]);

  return (
    <div className="choix_commission_body">
      <h3>Choix de commission</h3>
      <div className="choix_commission_inputs">
        <label
          className={`input_holder ${
            choixCommission === "Locale" && "selected_input"
          }`}
          onClick={() => {
            setChoixCommission("Locale");
            setFormData((prev) => ({
              ...prev,
              commission: "Locale",
            }));
            setErrore({});
          }}
        >
          <input
            type="radio"
            name="clrpq"
            value="clrpq"
            checked={choixCommission === "Locale" && true}
          />
          LA COMMISSION LOCALE DE RECOURS PRÉALABLE QUALIFIÉE
        </label>
        <label
          className={`input_holder ${
            choixCommission === "National" && "selected_input"
          }`}
          onClick={() => {
            setChoixCommission("National");
            setFormData((prev) => ({
              ...prev,
              motif: "Decision",
              commission: "National",
            }));
          }}
        >
          <input
            type="radio"
            name="clrpq"
            value="clrpq"
            checked={choixCommission === "National" && true}
          />
          LA COMMISSION National DE RECOURS PRÉALABLE QUALIFIÉE
        </label>
      </div>
      {choixCommission === "National" && (
        <div className="national_verification">
          <div>
            <select
              value={selectedReason}
              onChange={handleChangeReason}
              className="national_verification_choices"
            >
              <option value="Decision">Recours sur decision de CLRPQ</option>
              <option value="Montant">Montant de PR/MR</option>
              <option value="Delais">
                le délais de la réponse a depassé 60 jours
              </option>
            </select>
          </div>
          {selectedReason === "Montant" ? (
            <div className="montant">
              <input
                type="number"
                placeholder="Entrez le montant de PR"
                onChange={(event) => {
                  if (event.target.value < 100000) {
                    setErrore({
                      Error: true,
                      message: "montant inferieur a 100 millions centimes",
                    });
                  } else {
                    setChecking((prev) => ({
                      ...prev,
                      input1: event.target.value,
                    }));
                  }
                }}
              />
            </div>
          ) : selectedReason === "Decision" ? (
            <div className="Decision">
              <input
                type="number"
                placeholder="Entrez le numero de reunion"
                onChange={(event) =>
                  setChecking((prev) => ({
                    ...prev,
                    input1: event.target.value,
                  }))
                }
              />
              <input
                type="number"
                placeholder="Entrez le numero de decision"
                onChange={(event) =>
                  setChecking((prev) => ({
                    ...prev,
                    input2: event.target.value,
                  }))
                }
              />
            </div>
          ) : (
            <div className="Delais">
              <input
                type="date"
                placeholder="Entrez la date de recours"
                onChange={(event) =>
                  setChecking((prev) => ({
                    ...prev,
                    input1: event.target.value,
                    input2: "",
                  }))
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChoixCommission;
