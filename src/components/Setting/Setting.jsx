import React from "react";
import { Link } from "react-router-dom";
import SectionBannerDemo from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import { FcExport,FcVoicePresentation, FcDataBackup, FcPrivacy, FcBiotech, FcElectricalSensor, FcInspection} from "react-icons/fc";
import "./Setting.css";
import SettingsOnOff1 from "../SettingsOnOff/SettingsOnOff1";
import SettingsOnOff2 from "../SettingsOnOff/SettingsOnOff2";

const Setting = ({ link, title }) => {


  return (
    <>
      <div id="setting">
        <SectionBannerDemo title={title} />
        <div className="container" id="container">
          <div className="settingItem">
            <div className="item rounded mb-4 p-3 d-flex justify-content-between">
              <p className="mb-0 font-16 text-muted">
                <FcExport className="font-25 ms-1 me-3"/>
                Login required every time
              </p>
              <div className="form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id=""
                />
              </div>
            </div>
            <div className="item rounded mb-4 p-3 d-flex justify-content-between">
              <p className="mb-0 font-16 text-muted">
                <FcVoicePresentation className="font-25 ms-1 me-3"/>
                User can view patient data
              </p>
              <div className="form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id=""
                />
              </div>
            </div>
            <div className="item rounded mb-4 p-3 d-flex justify-content-between">
              <p className="mb-0 font-16 text-muted">
                <FcInspection className="font-25 ms-1 me-3"/>
                User can edit patient data
              </p>
              <div className="form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id=""
                />
              </div>
            </div>
            <div className="item rounded mb-4 p-3 d-flex justify-content-between">
              <p className="mb-0 font-16 text-muted">
                <FcBiotech className="font-25 ms-1 me-3"/>
                User can view counter
              </p>
              <div className="form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id=""
                />
              </div>
            </div>
            <div className="item rounded mb-4 p-3 d-flex justify-content-between">
              <p className="mb-0 font-16 text-muted">
                <FcDataBackup className="font-25 ms-1 me-3"/>
                Use local DB
              </p>
              <div className="form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id=""
                />
              </div>
            </div>
            <div className="item rounded mb-4 p-3 position-relative">
              <p className="settingTitle mb-0 font-16 text-muted">
                <FcElectricalSensor className="font-25 ms-1 me-3"/>
                Use remote DB
              </p>
              <div className="text-end pe-2">
                 <SettingsOnOff1/>
              </div>
            </div>
            <div className="item rounded mb-4 p-3 position-relative">
              <p className="settingTitle mb-0 font-16 text-muted">
                <FcPrivacy className="font-25 ms-1 me-3"/>
                Change password
              </p>
              <div className="text-end pe-2">
                 <SettingsOnOff2/>
              </div>
            </div>
            
          </div>
        </div>
        <GlobalButton />
      </div>
    </>
  );
};

export default Setting;
