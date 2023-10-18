import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import "./SettingsOnOff.css";

const SettingsOnOff = () => {
  const [height, setHeight] = useState(0);

  return (
    <>
      <div className="form-switch">
        <input
          aria-expanded={height !== 0}
          aria-controls="example-panel"
          onClick={() => setHeight(height === 0 ? "auto" : 0)}
          className="form-check-input"
          type="checkbox"
          role="switch"
          id=""
        />
        {/* {height === 0 ? "off" : "On"} */}
        {height === 0 ? "" : ""}
      </div>

      <AnimateHeight
        id="example-panel"
        duration={400}
        height={height} // see props documentation below
      >
        <div className="containBox w-50 text-start pt-4 pb-2 px-3">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Old
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ex : Password@99#!"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              New
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ex : Password#!&&&TW##"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
               New Again
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ex : Password#!&&&TW##"
            />
          </div>
        </div>
      </AnimateHeight>
    </>
  );
};

export default SettingsOnOff;
