import React, { useState } from "react";
import "./Effectuer.css";
import Step from "../../../components/recours_controllers/Step";

const Effectuer = () => {
  const [selectedStep, setSelectedStep] = useState([]);
  const [stepe, setStepe] = useState(0);
  function handleRadioChange(event) {
    let valide = event.target.value;
    // setSelectedStep((prev)=>[...prev,{etape:stepe,valide:}]);
  }

  // steps
  const steps = [
    { name: "Avertissement", number: 1 },
    { name: "Choix de commission", number: 2 },
    { name: "choix de l objet", number: 3 },
    { name: "joinde les documents", number: 4 },
  ];
  return (
    <div className="effectuer">
      <div className="main_holder">
        <h3>Recours</h3>
        <h5>Deposer un Recours</h5>
        <div className="steps_holder">
          {steps?.map((step) => (
            <Step number={step.number} name={step.name} />
          ))}
        </div>
        <div className="effectuer_body">
          <div className="avertissement_body">
            <h3>Avertissement</h3>
            <div className="avertissement_conditions">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat quis minus doloribus facilis blanditiis natus at nobis
                molestiae quod, sint eius nesciunt iste, cumque numquam et
                mollitia! Saepe, doloremque perferendis. Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Quaerat quis minus doloribus
                facilis blanditiis natus at nobis molestiae quod, sint eius
                nesciunt iste, cumque numquam et mollitia! Saepe, doloremque
                perferendis. Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Quaerat quis minus doloribus facilis blanditiis natus at
                nobis molestiae quod, sint eius nesciunt iste, cumque numquam et
                mollitia! Saepe, doloremque perferendis. Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Quaerat quis minus doloribus
                facilis blanditiis natus at nobis molestiae quod, sint eius
                nesciunt iste, cumque numquam et mollitia! Saepe, doloremque
                perferendis. elit. Quaerat quis minus doloribus facilis
                blanditiis natus at nobis molestiae quod, sint eius nesciunt
                iste, cumque numquam et mollitia! Saepe, doloremque perferendis.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat quis minus doloribus facilis blanditiis natus at nobis
                molestiae quod, sint eius nesciunt iste, cumque numquam et
                mollitia! Saepe, doloremque perferendis. elit. Quaerat quis
                minus doloribus facilis blanditiis natus at nobis molestiae
                quod, sint eius nesciunt iste, cumque numquam et mollitia!
                Saepe, doloremque perferendis. Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Quaerat quis minus doloribus
                facilis blanditiis natus at nobis molestiae quod, sint eius
                nesciunt iste, cumque numquam et mollitia! Saepe, doloremque
                perferendis.
              </p>
            </div>
            <div className="confirmation">
              <input type="radio" onChange={handleRadioChange} />
              J’ai lu et j’accepte les conditions générales d’utilisation.
            </div>
          </div>
          {/* suivant bouton */}
          <div className="btn_holder">
            <button className="retour">Retour</button>
            <button className="suivant">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Effectuer;
