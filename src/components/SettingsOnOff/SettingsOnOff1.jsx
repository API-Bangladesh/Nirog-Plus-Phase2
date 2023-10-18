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
            <label htmlFor="" className="form-label">
              Host IP
            </label>
            <input
              type="number"
              className="form-control"
              id="hostip"
              placeholder="Ex : 230943898439843"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              User
            </label>
            <input
              type="text"
              className="form-control"
              id="user"
              placeholder="Ex : John Doe"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ex : Password@99#!"
            />
          </div>
        </div>
      </AnimateHeight>
    </>
  );
};

export default SettingsOnOff;
