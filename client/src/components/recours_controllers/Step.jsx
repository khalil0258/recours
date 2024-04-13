import React, { useEffect, useState } from "react";

const Step = ({ number, name, selectedStep }) => {
  const [activeSteps, setActiveSteps] = useState(false);
  const [activeLines, setActiveLines] = useState(false);

  useEffect(() => {
    if (number <= selectedStep) {
      setActiveSteps(true);
    } else {
      setActiveSteps(false);
      setActiveLines(false);
    }

    if (number < selectedStep) {
      setActiveLines(true);
    } else if (number === selectedStep) {
      setActiveLines(false);
    }
    console.log("ee", activeSteps, selectedStep);
  }, [selectedStep]);
  return (
    <div className="step">
      <div className="avertissment_step">
        <div className={`number_holder ${activeSteps && "active"}`}>
          <span>{number}</span>
        </div>

        <p>{name}</p>
      </div>
      {number !== 4 && <div className={`line ${activeLines && "active"}`} />}
    </div>
  );
};

export default Step;
