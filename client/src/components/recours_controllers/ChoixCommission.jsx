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
    console.log(selectedReason,event.target.value)

    setFormData((prev) => ({
      ...prev,
      motif: formData?.commission === "Locale" ? "" : event.target.value,
    }));
    if (choixCommission === "Nationale") {
      setChecking((prev) => ({
        ...prev,
        type:
          event.target.value === "Contester la décision de la commission locale"
            ? 1
            : event.target.value ===
              "Le délai de la réponse de la commission locale a dépassé 60 jours"
            ? 2
            : event.target.value === "Montant PR/MR supérieur à 1 000 000 DA"
            ? 3
            : null,
      }));

      setSelectedReason(event.target.value);
      setErrore({})
    }
  };

  useEffect(() => {
    if (!!formData.motif) {
      setSelectedReason(formData?.motif);
    }
    if (!!formData.commission) {
      setChoixCommission(formData?.commission);
    }
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
            formData?.commission === "Nationale" && "selected_input"
          }`}
          onClick={() => {
            setChoixCommission("Nationale");
            setFormData((prev) => ({
              ...prev,

              commission: "Nationale",
            }));
          }}
        >
          <input
            type="radio"
            name="clrpq"
            value="clrpq"
            checked={formData?.commission === "Nationale" && true}
          />
          LA COMMISSION NATIONALE DE RECOURS PRÉALABLE QUALIFIÉE
        </label>
      </div>
      {formData?.commission === "Nationale" && (
        <div className="national_verification fade">
          <div>
            <select
              value={selectedReason}
              onChange={handleChangeReason}
              className="national_verification_choices"
            >
              <option value="" selected hidden>
                Pourquoi faites-vous un recours à la commission nationale ?
              </option>
              <option value="Contester la décision de la commission locale">
                Contester la décision de la commission locale
              </option>
              <option
                value="Le délai de la réponse de la commission locale a dépassé 60 jours"
              >
                Le délai de la réponse de la commission locale a dépassé 60
                jours
              </option>
              <option value="Montant PR/MR supérieur à 1 000 000 DA">
                Montant de PR/MR supérieur à 1 000 000 DA
              </option>
            </select>
          </div>
          {selectedReason === "Montant PR/MR supérieur à 1 000 000 DA" ? (
            <div className="montant">
              <input
                value={
                  !!formData.nationalInputs && formData.nationalInputs?.input1
                }
                type="number"
                placeholder="Renseigner le montant de votre PR et/ou MR. Ex: 1000000"
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
          ) : selectedReason ===
            "Contester la décision de la commission locale" ? (
            <div className="Decision">
              <input
                value={
                  !!formData.nationalInputs && formData.nationalInputs?.input1
                }
                type="number"
                placeholder="Entrez le numéro de réunion"
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
                placeholder="Entrez le numéro de décision"
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
            selectedReason === "Le délai de la réponse de la commission locale a dépassé 60 jours" && (
              <div className="Delais">
                <label htmlFor="">J'ai effectué mon recours en date de :</label>
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
