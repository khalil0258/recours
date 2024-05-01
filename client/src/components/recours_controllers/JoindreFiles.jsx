import React, { useState } from "react";

const JoindreFiles = ({ handleFileChange, formData, setFormData }) => {
  // console.log(!!Object.entries(formData.thirdFiles).length);
  const [files, setFiles] = useState([]);

  const handleFileChanging = (event) => {
    const newFiles = Array.from(event.target.files);
    setFormData((prev) => ({
      ...prev,
      thirdFiles: [...files, ...newFiles],
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    setFormData((prev) => ({
      ...prev,
      thirdFiles: updatedFiles,
    }));
  };

  return (
    <div className="joindre_document_body fadeTranslate">
      <h3>Joindre les documents</h3>
      {/* document recours  */}
      <div className="document_holder">
        <h4>Recours Ecrit</h4>
        <div className="remarque">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          architecto impedit quia odit adipisci maxime ad aperiam nesciunt
          eveniet amet sit maiores delectus
        </div>
        <label className="file-input-label">
          <span>
            {formData.firstFile?.name === undefined &&
              "Sélectionner un fichier"}
          </span>
          <input
            onChange={handleFileChange}
            type="file"
            accept=".jpg, .jpeg, .png ,.pdf "
            className="file-input fileOne"
          />
          {/* Display selected file names */}
          {formData.firstFile?.name !== undefined && (
            <div className="flex">
              <div
                className="files_sty"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    firstFile: null,
                  }));
                }}
              >
                {formData.firstFile?.name}
              </div>
            </div>
          )}
        </label>
      </div>
      {/* c a depend de recours  */}

      <div className="document_holder">
        <h4>Décision de la commission Locale</h4>
        <div className="remarque">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          architecto impedit quia odit adipisci maxime ad aperiam nesciunt
          eveniet amet sit maiores delectus{" "}
        </div>
        <label className="file-input-label">
          <span>
            {" "}
            {formData.secondFile?.name === undefined &&
              "Sélectionner un fichier"}
          </span>
          <input
            onChange={handleFileChange}
            type="file"
            className="file-input fileTwo"
            accept=".jpg, .jpeg, .png ,.pdf "
          />
          {formData.secondFile?.name !== undefined && (
            <div className="flex">
              <div
                className="files_sty"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    secondFile: null,
                  }));
                }}
              >
                {formData.secondFile?.name}
              </div>
            </div>
          )}
        </label>
        {/* now piece complementaires  */}
        <div className="document_holder">
          <h4>Pièces Complémentaires</h4>
          <div className="remarque">
            [max3] Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Corrupti architecto impedit quia odit adipisci maxime ad aperiam
            nesciunt eveniet amet sit maiores delectus{" "}
          </div>
          <label className="file-input-label">
            <span>
              {!Object.entries(formData.thirdFiles).length &&
                "Sélectionner des fichiers"}
            </span>
            <input
              type="file"
              onChange={handleFileChanging}
              className="file-input fileThree"
              accept=".jpg, .jpeg, .png ,.pdf"
              multiple
              max={3}
            />

            {/* Display selected file names */}

            <div className="flex">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="files_sty"
                  onClick={() => removeFile(index)}
                >
                  {file.name}
                  {/* <button>Remove</button> */}
                </div>
              ))}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default JoindreFiles;
