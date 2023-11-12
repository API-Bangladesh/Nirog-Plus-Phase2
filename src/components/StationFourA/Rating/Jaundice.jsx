import React, { useState, useEffect } from "react";
import "./Rating.css";

const Jaundice = ({ formData, setFormData }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    let myFormData = { ...formData };
    myFormData.GeneralExamination[0].jaundiceSeverity = value;
    setFormData(myFormData);
    console.log(myFormData.GeneralExamination[0]);
  }, [value]);

  return (
    <>
      <fieldset className="rating">
        <input
          type="radio"
          id="star6"
          name="jaundice"
          value="3"
          checked={value === "3"}
          onChange={(e) => setValue(e.target.value)}
        />
        <label
          className="full"
          htmlFor="star6"
          onDoubleClick={() => setValue(null)}
        ></label>

        <input
          type="radio"
          id="star5"
          name="jaundice"
          value="2"
          checked={value === "2"}
          onChange={(e) => setValue(e.target.value)}
        />
        <label
          className="full"
          htmlFor="star5"
          onDoubleClick={() => setValue(null)}
        ></label>

        <input
          type="radio"
          id="star4"
          name="jaundice"
          value="1"
          checked={value === "1"}
          onChange={(e) => setValue(e.target.value)}
        />
        <label
          className="full"
          htmlFor="star4"
          onDoubleClick={() => setValue(null)}
        ></label>
      </fieldset>
    </>
  );
};

export default Jaundice;
