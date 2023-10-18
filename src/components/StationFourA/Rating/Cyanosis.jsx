import React, { useState, useEffect } from "react";
import "./Rating.css";

const Cyanosis = ({ formData, setFormData }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value) {
      let myFormData = { ...formData };
      myFormData.GeneralExamination[0].cyanosis = value;

      setFormData(myFormData);
    }
  }, [value]);

  return (
    <>
      <fieldset className="rating">
        <input
          type="radio"
          id="star9"
          name="cyanosis"
          value="3"
          onChange={(e) => setValue(e.target.value)}
        />
        <label className="full" htmlFor="star9"></label>

        <input
          type="radio"
          id="star8"
          name="cyanosis"
          value="2"
          onChange={(e) => setValue(e.target.value)}
        />
        <label className="full" htmlFor="star8"></label>

        <input
          type="radio"
          id="star7"
          name="cyanosis"
          value="1"
          onChange={(e) => setValue(e.target.value)}
        />
        <label className="full" htmlFor="star7"></label>
      </fieldset>
    </>
  );
};

export default Cyanosis;
