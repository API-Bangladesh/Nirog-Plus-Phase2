import React, { useState, useEffect } from "react";
import "./Rating.css";

const Edema = ({ formData, setFormData }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    let myFormData = { ...formData };
    myFormData.GeneralExamination[0].edemaSeverity = value;
    setFormData(myFormData);
    console.log(myFormData.GeneralExamination[0]);
  }, [value]);

  return (
    <>
      <fieldset className="rating">
        <input
          type="radio"
          id="star12"
          name="edema"
          value="3"
          checked={value === "3"}
          onChange={(e) => setValue(e.target.value)}
        />
        <label
          className="full"
          htmlFor="star12"
          onDoubleClick={() => setValue(null)}
        ></label>

        <input
          type="radio"
          id="star11"
          name="edema"
          value="2"
          checked={value === "2"}
          onChange={(e) => setValue(e.target.value)}
        />
        <label
          className="full"
          htmlFor="star11"
          onDoubleClick={() => setValue(null)}
        ></label>

        <input
          type="radio"
          id="star10"
          name="edema"
          value="1"
          checked={value === "1"}
          onChange={(e) => setValue(e.target.value)}
        />
        <label
          className="full"
          htmlFor="star10"
          onDoubleClick={() => setValue(null)}
        ></label>
      </fieldset>
    </>
  );
};

export default Edema;
