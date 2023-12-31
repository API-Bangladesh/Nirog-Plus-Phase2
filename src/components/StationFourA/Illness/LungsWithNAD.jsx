import React from "react";
import { useState, useEffect } from "react";

const LungsWithNAD = ({ formData, setFormData }) => {
  const [isLungsWithNAD, setIsLungsWithNAD] = useState(false);
  const [lungsWithNAD, setLungsWithNAD] = useState("");

  const handleClick = () => {
    setIsLungsWithNAD((current) => !current);
  };

  useEffect(() => {
    if (!isLungsWithNAD) {
      setLungsWithNAD("");
    }
  }, [isLungsWithNAD]);

  useEffect(() => {
    let myFormData = { ...formData };
    myFormData.GeneralExamination[0].isLungsWithNAD = isLungsWithNAD;
    myFormData.GeneralExamination[0].lungsWithNAD = lungsWithNAD;

    setFormData(myFormData);
    console.log(myFormData.GeneralExamination[0]);
  }, [isLungsWithNAD, lungsWithNAD]);

  return (
    <>
      <div className="col-lg-12">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={handleClick}
            checked={isLungsWithNAD}
            role="switch"
            name="flexSwitchCheckChecked"
          />
        </div>
      </div>

      {isLungsWithNAD && (
        <div className="col-lg-12">
          <textarea
            id="LungsWithNADText"
            rows="3"
            className="comment form-control"
            placeholder="type here"
            value={lungsWithNAD}
            onChange={(e) => setLungsWithNAD(e.target.value)}
          ></textarea>
        </div>
      )}
    </>
  );
};

export default LungsWithNAD;
