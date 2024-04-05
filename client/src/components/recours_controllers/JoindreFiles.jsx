import React from "react";

const JoindreFiles = ({ handleFileChange, formData, setFormData }) => {
  // console.log(!!Object.entries(formData.thirdFiles).length);
  return (
    <div className="joindre_document_body">
      <h3>Joindre documents</h3>
      {/* document recours  */}
      <div className="document_holder">
        <h4>Recours Ecrit</h4>
        <div className="remarque">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          architecto impedit quia odit adipisci maxime ad aperiam nesciunt
          eveniet amet sit maiores delectus{" "}
        </div>
        <label className="file-input-label">
          <span>
            {formData.firstFile?.name === undefined &&
              "Sélectionner un fichier"}
          </span>
          <input
            // value={formData.firstFile}
            onChange={handleFileChange}
            type="file"
            accept=".jpg, .jpeg, .png ,.pdf,.doc,.docx"
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
        <h4>Decision de commission Local</h4>
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
            accept=".jpg, .jpeg, .png ,.pdf,.doc,.docx"
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
          <h4>Pieces Complementaires</h4>
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
              onChange={handleFileChange}
              className="file-input fileThree"
              accept=".jpg, .jpeg, .png ,.pdf,.doc,.docx"
              multiple={3}
              max={3}
            />
            {/* Display selected file names */}
            {!!Object.entries(formData?.thirdFiles)?.length && (
              <div className="flex">
                {Object.entries(formData.thirdFiles)?.map((file, index) => (
                  <p
                    className="files_sty "
                    key={index}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        thirdFiles: {},
                      }));
                    }}
                  >
                    {file[1].name}
                  </p>
                ))}
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default JoindreFiles;
