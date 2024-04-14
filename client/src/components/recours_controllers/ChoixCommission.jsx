import React, { useEffect, useState } from "react";

const ChoixCommission = ({
  setFormData,
  setChecking,
  checking,
  setErrore,
  formData,
}) => {
  const [choixCommission, setChoixCommission] = useState();
  const [selectedReason, setSelectedReason] = useState("");
  // Event handler to handle changes in the select element

  const handleChangeReason = (event) => {
    console.log(checking, choixCommission);
    // setErrore({});
    setFormData((prev) => ({
      ...prev,
      motif: formData?.commission === "Locale" ? "" : event.target.value,
    }));
    if (choixCommission === "National") {
      setChecking((prev) => ({
        ...prev,
        type:
          event.target.value === "Decision"
            ? 1
            : event.target.value === "Delais"
            ? 2
            : event.target.value === "Montant"
            ? 3
            : null,
      }));
      console.log(checking);
      setSelectedReason(event.target.value);
      // console.log(selectedReason, event.target.value);
    }
  };
  useEffect(() => {
    // console.log(checking);
  }, [checking.type]);
  useEffect(() => {
    if (!!formData.motif) {
      setSelectedReason(formData?.motif);
    }
    if (!!formData.commission) {
      setChoixCommission(formData?.commission);
    }
    // console.log
  }, [formData.motif]);

  return (
    <div className="choix_commission_body fadeTranslate">
      <h3>Choix de commission</h3>
      <div className="choix_commission_inputs">
        <label
          className={`input_holder ${
            formData?.commission === "Locale" && "selected_input"
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
            checked={formData?.commission === "Locale" && true}
          />
          LA COMMISSION LOCALE DE RECOURS PRÉALABLE QUALIFIÉE
        </label>
        <label
          className={`input_holder ${
            formData?.commission === "National" && "selected_input"
          }`}
          onClick={() => {
            setChoixCommission("National");
            setFormData((prev) => ({
              ...prev,

              commission: "National",
            }));
          }}
        >
          <input
            type="radio"
            name="clrpq"
            value="clrpq"
            checked={formData?.commission === "National" && true}
          />
          LA COMMISSION National DE RECOURS PRÉALABLE QUALIFIÉE
        </label>
      </div>
      {formData?.commission === "National" && (
        <div className="national_verification fade">
          <div>
            <select
              value={selectedReason}
              onChange={handleChangeReason}
              className="national_verification_choices"
            >
              <option value="" selected hidden>
                Pourquoi faites-vous un recours à la commission locale ?
              </option>
              <option value="Decision">
                Contester la décision de la commission locale
              </option>
              <option value="Delais">
                Le délai de la réponse de la commission locale a dépassé 60
                jours
              </option>
              <option value="Montant">
                Montant PR/MR supérieur à 1 000 000 DA
              </option>
            </select>
          </div>
          {selectedReason === "Montant" ? (
            <div className="montant">
              <input
                value={
                  !!formData.nationalInputs && formData.nationalInputs?.input1
                }
                type="number"
                placeholder="Entrez le montant de PR"
                onChange={(event) => {
                  console.log("first2");
                  setChecking((prev) => ({
                    ...prev,
                    input1: event.target.value,
                  }));
                  setFormData((prev) => ({
                    ...prev,
                    nationalInputs: { input1: event.target.value },
                  }));
                }}
              />
            </div>
          ) : selectedReason === "Decision" ? (
            <div className="Decision">
              <input
                value={
                  !!formData.nationalInputs && formData.nationalInputs?.input1
                }
                type="number"
                placeholder="Entrez le numero de reunion"
                onChange={(event) => {
                  setChecking((prev) => ({
                    ...prev,
                    input1: event.target.value,
                  }));
                  setFormData((prev) => ({
                    ...prev,
                    nationalInputs: {
                      input1: event.target.value,
                      input2: formData.nationalInputs.input2,
                    },
                  }));
                }}
              />
              <input
                value={
                  !!formData.nationalInputs && formData.nationalInputs?.input2
                }
                type="number"
                placeholder="Entrez le numero de decision"
                onChange={(event) => {
                  setChecking((prev) => ({
                    ...prev,
                    input2: event.target.value,
                  }));
                  setFormData((prev) => ({
                    ...prev,
                    nationalInputs: {
                      input1: formData.nationalInputs.input1,
                      input2: event.target.value,
                    },
                  }));
                }}
              />
            </div>
          ) : (
            selectedReason === "Delais" && (
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
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ChoixCommission;
