import React, { useEffect, useState } from "react";

const Choix_objet = ({ handleSelectedStep, setFormData, formData }) => {
  const [filtre, setFiltre] = useState("tout");
  useEffect(() => {
    handleSelectedStep();
  }, []);
  // Function to handle changes in the selected value
  const handleFiltre = (event) => {
    setFiltre(event.target.value);
  };
  // third step function
  const objets = [
    {
      nom: "Demande d'annulation de cotisations",
      index: 1,
      volet: "cotisations",
      filtre: "cotisations",
    },
    {
      nom: "Demande de paiement de cotisations",
      index: 2,
      volet: "cotisations",
      filtre: "cotisations",
    },
    {
      nom: "Pénalité et/ou majoration de retard",
      index: 3,
      volet: "cotisations",
      filtre: "cotisations",
    },
    {
      nom: "Revoir le montant de cotisation",
      index: 4,
      volet: "cotisations",
      filtre: "cotisations",
    },
    {
      nom: "Demande de validation ou remboursement de cotisations",
      index: 5,
      volet: "cotisations",
      filtre: "cotisations",
    },
    {
      nom: "Demande d'allocation d'invalidité",
      index: 6,
      volet: "prestations",
      filtre: "assurance sociale",
    },
    {
      nom: "Revoir le montant de l'allocation d'invalidité",
      index: 7,
      volet: "prestations",
      filtre: "assurance sociale",
    },
    {
      nom: "Demande de remboursement des frais de soins",
      index: 8,
      volet: "prestations",
      filtre: "assurance sociale",
    },
    {
      nom: "Demande d'annulation de trop perçu des assuraces sociales",
      index: 9,
      volet: "prestations",
      filtre: "assurance sociale",
    },
    {
      nom: "Demande d'allocation de capital décès",
      index: 10,
      volet: "prestations",
      filtre: "assurance sociale",
    },
    {
      nom: "Demande de revoir le montant d'allocation de capital décès",
      index: 11,
      volet: "prestations",
      filtre: "assurance sociale",
    },
    {
      nom: "Demande de pension ou allocation de réversion",
      index: 12,
      volet: "prestations",
      filtre: "retraite",
    },
    {
      nom: "Revoir le montant de la pension ou allocation de retraite",
      index: 13,
      volet: "prestations",
      filtre: "retraite",
    },
    {
      nom: "Demande d'annulation de trop perçu relatif à la retraite",
      index: 14,
      volet: "prestations",
      filtre: "retraite",
    },
  ];
  return (
    <div className="choix_objet_body fadeTranslate">
      <h3>Choix d'objet </h3>
      {/* les objets existes  */}
      <div className="filters">
        <select
          value={filtre}
          onChange={handleFiltre}
          className="national_verification_choices filters_objet"
        >
          <option value="tout">Tous les objets</option>
          <option value="cotisations">Relatifs aux cotisations</option>
          <option value="assurance sociale">Relatifs aux assurance sociale</option>
          <option value="retraite">Relatifs à la retraite</option>
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
