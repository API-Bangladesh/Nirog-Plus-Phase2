import React, { useEffect, useState } from "react";
import "./Rating.css";

const Anemia = ({ formData, setFormData }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value) {
      let myFormData = { ...formData };
      myFormData.GeneralExamination[0].anemiaSeverity = value;

      setFormData(myFormData);
    }
  }, [value]);

  return (
    <>
      <fieldset className="rating">
        <input
          type="radio"
          id="star3"
          name="anemia"
          value="3"
          checked={value === "3"}
          onChange={(e) => setValue(e.target.value)}
          onDoubleClick={(e) => {
            e.target.checked = false;
            e.target.value = null;
          }}
        />
        <label className="full" htmlFor="star3"></label>

        <input
          type="radio"
          id="star2"
          name="anemia"
          value="2"
          checked={value === "2"}
          onChange={(e) => setValue(e.target.value)}
          onDoubleClick={(e) => {
            e.target.checked = false;
            e.target.value = null;
          }}
        />
        <label className="full" htmlFor="star2"></label>

        <input
          type="radio"
          id="star1"
          name="anemia"
          value="1"
          checked={value === "1"}
          onChange={(e) => setValue(e.target.value)}
          onDoubleClick={(e) => {
            e.target.checked = false;
            e.target.value = null;
          }}
        />
        <label className="full" htmlFor="star1"></label>
      </fieldset>
    </>
  );
};

export default Anemia;
