import React from "react";
import { useState, useEffect } from "react";

const HeartWithNAD = ({ formData, setFormData }) => {
  const [isHeartWithNAD, setIsHeartWithNAD] = useState(false);
  const [heartWithNAD, setHeartWithNAD] = useState("");

  const handleClick = () => {
    setIsHeartWithNAD((current) => !current);
  };

  useEffect(() => {
    if (!isHeartWithNAD) {
      setHeartWithNAD("");
    }
  }, [isHeartWithNAD]);

  useEffect(() => {
    let myFormData = { ...formData };
    myFormData.GeneralExamination[0].isHeartWithNAD = isHeartWithNAD;
    myFormData.GeneralExamination[0].heartWithNAD = heartWithNAD;

    setFormData(myFormData);
  }, [isHeartWithNAD, heartWithNAD]);

  return (
    <>
      <div className="col-lg-12">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={handleClick}
            checked={isHeartWithNAD}
            role="switch"
            id="flexSwitchCheckChecked"
            defaultChecked=""
          />
        </div>
      </div>

      {isHeartWithNAD && (
        <div className="col-lg-12">
          <textarea
            rows="3"
            className="comment form-control"
            placeholder="type here"
            value={heartWithNAD}
            onChange={(e) => setHeartWithNAD(e.target.value)}
          ></textarea>
        </div>
      )}
    </>
  );
};

export default HeartWithNAD;
