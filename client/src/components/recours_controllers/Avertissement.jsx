import React from "react";

const Avertissement = ({ handleSelectedStep, selectedStep }) => {
  console.log(selectedStep);
  return (
    <div className="avertissement_body fadeTranslate">
      <h3>Avertissement</h3>
      <div className="avertissement_conditions">
        <h4>
          En utilisant Télé-Recours, vous vous engagez sur les points suivants,
          notamment :
        </h4>
        <div className="point_aver">
          <div>1</div>
          La personne qui a accepté l’utilisation du service Télé-Recours pour
          un dossier donné est tenue de communiquer uniquement via le site
          l’ensemble des mémoires et pièces qu’elle souhaite produir
        </div>
        <div className="point_aver">
          {" "}
          <div>2</div>
          L’utilisateur est réputé avoir pris connaissance des communications et
          notifications qui lui sont adressées dans un délai de deux jours
          ouvrés.
        </div>
        <div className="point_aver">
          {" "}
          <div>3</div>
          L’utilisateur doit transmettre par un fichier distinct chacune des
          pièces jointes à sa requête. Leur intitulé doit décrire leur contenu
          de manière explicite, sous peine, à défaut de régularisation, de voir
          les pièces jointes de sa requête, écartées des débats.
        </div>{" "}
        <h4 className="">Données personnelles</h4>
        <div className="point_aver">
          Télé-Recours respecte la réglementation concernant les données
          personnelles. Les données recueillies serviront à la gestion de
          l’activité juridictionnelle. Aucune donnée personnelle n’est revendue
          à un organisme tiers.
        </div>
      </div>
      <div className="confirmation">
        <input
          type="radio"
          onChange={handleSelectedStep}
          checked={!!selectedStep?.valide}
        />
        J’ai lu et j’accepte les conditions générales d’utilisation.
      </div>
    </div>
  );
};

export default Avertissement;
