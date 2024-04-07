import React, { useState } from "react";

const Choix_objet = ({ handleSelectedStep, setFormData, formData }) => {
  const [filtre, setFiltre] = useState("tout");

  // Function to handle changes in the selected value
  const handleFiltre = (event) => {
    setFiltre(event.target.value);
  };
  // third step function
  const objets = [
    {
      nom: "demande annulation de cotisations",
      index: 1,
      volet: "cotisations",
      filtre: "cotisations",
    },
    {
      nom: "demande de paiement de cotisations",
      index: 2,
      volet: "cotisations",
      filtre: "cotisations",
    },
    {
      nom: "pénalité et/ou majoration de retard",
      index: 3,
      volet: "cotisations",
      filtre: "cotisations",
    },
    {
      nom: "revoir le montant de cotisation",
      index: 4,
      volet: "cotisations",
      filtre: "cotisations",
    },
    {
      nom: "demande de validation ou remboursement de cotisations",
      index: 5,
      volet: "cotisations",
      filtre: "cotisations",
    },
    {
      nom: "relatif à l'assurance invalidité",
      index: 6,
      volet: "prestations",
      filtre: "assurance sociale",
    },
    {
      nom: "realitf aux assurances en natures",
      index: 7,
      volet: "prestations",
      filtre: "assurance sociale",
    },
    {
      nom: "capital décès",
      index: 8,
      volet: "prestations",
      filtre: "assurance sociale",
    },
    {
      nom: "augmentation du pension de retraite",
      index: 9,
      volet: "prestations",
      filtre: "retraite",
    },
  ];
  return (
    <div className="choix_objet_body">
      <h3>Choix Objet</h3>
      {/* les objets existes  */}
      <div className="filters">
        <select
          value={filtre}
          onChange={handleFiltre}
          className="national_verification_choices filters_objet"
        >
          <option value="cotisations">cotisations</option>
          <option value="assurance sociale">assurance sociale</option>
          <option value="retraite">retraite</option>
          <option value="tout">tout</option>
        </select>
      </div>
      <div className="objets_container">
        {objets?.map((object) => {
          if (filtre === "tout") {
            return (
              <label
                key={object.index}
                className={`input_holder ${
                  formData.objet === object.nom && "selected_input"
                }`}
                onClick={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    objet: object.nom,
                    volet: object.volet,
                  }));
                  handleSelectedStep();
                }}
              >
                <input
                  type="radio"
                  name={object.nom}
                  value={object.nom}
                  checked={formData.objet === object.nom && true}
                />
                {object.nom}
              </label>
            );
          } else {
            if (object.filtre === filtre) {
              return (
                <label
                  key={object.index}
                  className={`input_holder ${
                    formData.objet === object.nom && "selected_input"
                  }`}
                  onClick={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      objet: object.nom,
                      volet: object.volet,
                    }));
                    handleSelectedStep();
                  }}
                >
                  <input
                    type="radio"
                    name={object.nom}
                    value={object.nom}
                    checked={formData.objet === object.nom && true}
                  />
                  {object.nom}
                </label>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default Choix_objet;
