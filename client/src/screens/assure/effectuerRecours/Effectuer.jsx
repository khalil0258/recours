import React, { useState } from "react";
import "./Effectuer.css";
import Step from "../../../components/recours_controllers/Step";
import { checkTheLocal, soumetre_recours } from "../../../api";
import Avertissement from "../../../components/recours_controllers/Avertissement";
import ChoixCommission from "../../../components/recours_controllers/ChoixCommission";
import Choix_objet from "../../../components/recours_controllers/Choix_objet";
import JoindreFiles from "../../../components/recours_controllers/JoindreFiles";
import Message_valide from "../../../components/recours_controllers/Message_valide";

const Effectuer = () => {
  const [som, setSom] = useState([]);
  const [selectedStep, setSelectedStep] = useState({ etape: 1, valide: false });
  const [stepe, setStepe] = useState(1);
  const [errore, setErrore] = useState({ error: false, message: "" });
  const [checking, setChecking] = useState({ type: 1, input1: "", input2: "" });
  // console.log(new Date().getTime());
  const [formData, setFormData] = useState({
    commission: "Locale",
    objet: "",
    motif: "Decision",
    volet: "",
    nationalInputs: {},
    firstFile: null,
    secondFile: null,
    thirdFiles: {},
  });
  console.log(formData.thirdFiles);

  const handleFileChange = (event) => {
    if (event.target.className.includes("fileOne")) {
      setFormData((prev) => ({
        ...prev,
        firstFile: event.target.files[0],
      }));
    } else if (event.target.className.includes("fileTwo")) {
      setFormData((prev) => ({
        ...prev,
        secondFile: event.target.files[0],
      }));
    } else if (event.target.className.includes("fileThree")) {
      setFormData((prev) => ({
        ...prev,
        thirdFiles: event.target.files,
      }));
    }
  };

  // general
  function handleSelectedStep(event) {
    console.log(formData, stepe);
    if (stepe === 1) {
      let valide = event.target.value;

      setSelectedStep({ etape: 1, valide: !!valide });
    }
    if (stepe === 3 && !!formData.objet) {
      setSelectedStep({ etape: 3, valide: !!formData.objet });
    }
  }

  // handle next pour suivant button
  const handleNext = async () => {
    // console.log(formData, stepe, selectedStep?.valide);
    if (stepe === 4) {
      if (!!formData.firstFile && !!formData.secondFile) {
        setErrore({});

        const dataForme = new FormData();

        dataForme.append("file1", formData.firstFile);
        dataForme.append("file2", formData.secondFile);

        Object.entries(formData?.thirdFiles)?.map((formi, index) => {
          dataForme.append("file3", formi[1]);
        });

        const path = JSON.stringify({
          emetteur: formData.commission === "Locale" ? "" : "assure",
          commission: formData.commission,
          id_assure: 1,
          id_agence: 3,
          motif: formData.commission === "Locale" ? "" : formData.motif,
          volet: formData.volet,
          objet: formData.objet,
        });
        console.log("path", path, typeof path);
        let response = await soumetre_recours(path, dataForme);
        console.log(response.request.statusText);
        if (
          response?.status === 200 &&
          response?.data.success === "Recours ajoute avec succes"
        ) {
          console.log("first");
          setSelectedStep({ etape: 4, valide: true });
        }
      } else {
        setErrore({
          error: true,
          message: !!formData.firstFile
            ? "fill the second input"
            : "fill the first input",
        });
      }
    } else if (stepe === 2) {
      console.log("checkin", formData.motif);
      if (formData.commission === "National" && formData.motif.length > 1) {
        // hna yesra ga3 logic ta3 verifiication
        console.log(checking.type === 3);
        if (
          checking.type === 1 &&
          checking.input1.trim().length > 0 &&
          checking.input2.trim().length > 0
        ) {
          const response1 = await checkTheLocal(
            checking.input1,
            checking.input2,
            1
          );
          if (
            response1.data.message !==
            "Ce recours est déjà effectué au niveau local"
          ) {
            setErrore({ error: true, message: response1.data.message });
          } else {
            setErrore({});
            setSelectedStep({ etape: 2, valide: true });
            setStepe((prev) => prev + 1);
          }
          // console.log(response1);
        } else if (checking.type === 2 && checking.input1.trim().length > 0) {
          // delais type
          console.log(new Date(checking.input1).toISOString());
          const oldDate = new Date(checking.input1);
          const result = isDaysOlder(oldDate, new Date(), 60);
          console.log("ress", result);
          if (!!result) {
            setErrore({});
            const year = oldDate.getFullYear(); // Get the year (e.g., 2023)
            const month = oldDate.getMonth() + 1; // Get the month (0-indexed, so add 1)
            const day = oldDate.getDate(); // Get the day of the month (1-31)

            // Construct a date string in the format "YYYY-MM-DD"
            const formattedDate = `${year}-${
              month < 10 ? "0" + month : month
            }-${day < 10 ? "0" + day : day}`;

            console.log("for", formattedDate); // Output: "2023-03-28" (for example)
            const response2 = await checkTheLocal(formattedDate, "", 2);
            console.log(response2);
            if (
              response2.data.message !==
              "Ce recours est déjà effectué au niveau local"
            ) {
              setErrore({ error: true, message: response2.data?.message });
            } else {
              setErrore({});
              setSelectedStep({ etape: 2, valide: true });
              setStepe((prev) => prev + 1);
            }
          } else {
            setErrore({
              error: true,
              message: "la date que vous avez saisi n'a pas depassé 60 jours",
            });
          }
        } else if (checking.type === 3) {
          setErrore({});
          setSelectedStep({ etape: 3, valide: true });
          setStepe((prev) => prev + 1);
        }
      } else if (formData.commission === "Locale") {
        // setErrore({});
        setSelectedStep({ etape: stepe, valide: true });
        setStepe((prev) => prev + 1);
      }
    } else if (stepe < 4 && selectedStep?.valide) {
      setStepe((prev) => prev + 1);
    }
    // console.log(stepe, selectedStep, selectedStep[stepe - 1]?.valide);s
  };

  // Function to check if a date is a certain number of days older than another date
  function isDaysOlder(dateToCheck, referenceDate, numberOfDays) {
    // Convert both dates to milliseconds
    const dateToCheckMs = dateToCheck.getTime();
    const referenceDateMs = referenceDate.getTime();

    // Calculate the difference in milliseconds
    const differenceMs = referenceDateMs - dateToCheckMs;

    // Convert difference to days
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    // Check if the difference in days is greater than the specified number of days
    return differenceDays > numberOfDays;
  }

  // handle retour
  const handleRetour = () => {
    console.log(formData);
    if (stepe > 1) {
      setStepe((prev) => prev - 1);
    }
    console.log("swwlw", selectedStep);
  };
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
          {steps?.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              name={step.name}
              selectedStep={stepe}
            />
          ))}
        </div>
        <div className="effectuer_body">
          {stepe === 1 ? (
            <Avertissement handleSelectedStep={handleSelectedStep} />
          ) : stepe === 2 ? (
            <ChoixCommission
              handleSelectedStep={handleSelectedStep}
              setFormData={setFormData}
              setChecking={setChecking}
              checking={checking}
              setErrore={setErrore}
              formData={formData}
            />
          ) : stepe === 3 ? (
            <Choix_objet
              handleSelectedStep={handleSelectedStep}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <JoindreFiles
              handleFileChange={handleFileChange}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {/* message error  */}
          {stepe !== 1 && errore?.error && (
            <div className="error_message">
              <p>{errore.message}</p>
            </div>
          )}
          {/* suivant bouton */}
          <div className="btn_holder">
            {stepe > 1 && (
              <button className="retour" onClick={handleRetour}>
                Retour
              </button>
            )}
            <button className="suivant" onClick={handleNext}>
              Suivant
            </button>
          </div>
        </div>
      </div>
      {selectedStep.etape === 4 && !!selectedStep?.valide && <Message_valide />}
    </div>
  );
};

export default Effectuer;
