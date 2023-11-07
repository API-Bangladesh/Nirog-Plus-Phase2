import React from "react";
import { useState } from "react";

const PatientIllness = () => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={handleClick}
            role="switch"
            name="flexSwitchCheckChecked"
          />
        </div>
      </div>

      {isShown && (
        <div className="col-lg-12">
          <div>
            <textarea
              name="othersField"
              rows="3"
              className="comment form-control"
              placeholder="type here"
            ></textarea>
          </div>
        </div>
      )}

      {/* show component on click  */}
      {isShown || (
        <div>
          <h2></h2>
        </div>
      )}
    </>
  );
};

export default PatientIllness;
