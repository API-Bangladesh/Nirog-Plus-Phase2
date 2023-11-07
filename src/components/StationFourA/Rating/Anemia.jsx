import React, { useEffect, useState } from "react";
import "./Rating.css";

const Anemia = ({ formData, setFormData }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    let myFormData = { ...formData };
    myFormData.GeneralExamination[0].anemiaSeverity = value;
    setFormData(myFormData);
    console.log(myFormData.GeneralExamination[0]);
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
        />
        <label
          className="full"
          htmlFor="star3"
          onDoubleClick={() => setValue(null)}
        ></label>

        <input
          type="radio"
          id="star2"
          name="anemia"
          value="2"
          checked={value === "2"}
          onChange={(e) => setValue(e.target.value)}
        />
        <label
          className="full"
          htmlFor="star2"
          onDoubleClick={() => setValue(null)}
        ></label>

        <input
          type="radio"
          id="star1"
          name="anemia"
          value="1"
          checked={value === "1"}
          onChange={(e) => setValue(e.target.value)}
        />
        <label
          className="full"
          htmlFor="star1"
          onDoubleClick={() => setValue(null)}
        ></label>
      </fieldset>
    </>
  );
};

export default Anemia;
