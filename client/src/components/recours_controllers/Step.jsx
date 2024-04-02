import React from "react";

const Step = ({ number, name, currentStep }) => {
  return (
    <div className="step">
      <div className="avertissment_step">
        <div className={`number_holder ${currentStep === number && "active"}`}>
          <span>{number}</span>
        </div>
        <p>{name}</p>
      </div>
      {number !== 4 && <div className="line" />}
    </div>
  );
};

export default Step;
