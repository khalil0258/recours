import React from "react";

const Spinner = () => {
  return (
    <div className="spinner_container">
      <div className="spinner-border text-primary " role="status">
        {/* <span class="sr-only">Loading...</span> */}
      </div>
      <div className="overlay_spinner" />
    </div>
  );
};

export default Spinner;
