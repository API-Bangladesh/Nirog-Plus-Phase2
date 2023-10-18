import React, { useEffect, useState } from "react";
import OthersField from "../Illness/OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { loggedInUserData } from "../../../helper/localStorageHelper";
import { useSelector } from "react-redux";

const PatientIllness = ({ formData, setFormData }) => {
  const [isShown, setIsShown] = useState(false);
  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const userData = loggedInUserData();
  const userName = userData?.name;

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  //SocialHistory
  const [SocialHistory, setSocialHistory] = useState([]);
  const getSocialHistoryData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/social-history`);

      if (response.status === 200) {
        setSocialHistory(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSocialHistoryData();
  }, []);

  const handleChangeRadio = (illnessId, value) => {
    let myFormData = { ...formData };

    const index = myFormData.SocialHistory.findIndex(
      (object) => object.illnessId === illnessId
    );

    if (index === -1) {
      myFormData.SocialHistory.push({
        PatientId: PatientId,
        socialBehaviorId: "C91982FF-851A-4701-BD45-6A6C490E440B",
        otherSocialBehavior: "Test SocialHistory",
        Status: value,
        CreateUser: userName,
        UpdateUser: userName,
        OrgId: OrgId,
      });
    }

    if (index === 0) {
      myFormData.SocialHistory = myFormData.SocialHistory.filter((item) => {
        if (item.illnessId == illnessId) {
          item.Status = value;
        }
        return item;
      });
    }

    setFormData(myFormData);
    console.log(myFormData?.SocialHistory);
  };

  const handleRemove = (illnessId) => {
    let myFormData = { ...formData };

    myFormData.SocialHistory = myFormData.SocialHistory.filter((item) => {
      return item.illnessId != illnessId;
    });

    setFormData(myFormData);
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={handleClick}
            role="switch"
            id="flexSwitchCheckChecked"
            defaultChecked=""
          />
        </div>
      </div>

      {isShown && (
        <div className="col-lg-12">
          {SocialHistory.map((item) => (
            <div
              key={item.SocialBehaviorId}
              className="d-flex justify-content-between"
            >
              <div className="">
                <p className="font-16">{item.SocialBehaviorCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.SocialBehaviorId}
                    id="smoking1"
                    value={item.SocialBehaviorCode === "Housing Mediation"
                    ? "Catcha"
                    : item.SocialBehaviorCode === "Drinking Water Sources"
                    ? "Safe"
                    : "No"}
                    onChange={(e) =>
                      handleChangeRadio(item.SocialBehaviorId, e.target.value)
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                      handleRemove(item.SocialBehaviorId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="smoking1"
                  >
                    {item.SocialBehaviorCode === "Housing Mediation"
                      ? "Catcha"
                      : item.SocialBehaviorCode === "Drinking Water Sources"
                      ? "Safe"
                      : "No"}
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.SocialBehaviorId}
                    id="smoking2"
                    value={item.SocialBehaviorCode === "Housing Mediation"
                    ? "Paka"
                    : item.SocialBehaviorCode === "Drinking Water Sources"
                    ? "Unsafe"
                    : "Yes"}
                    onChange={(e) =>
                      handleChangeRadio(item.SocialBehaviorId, e.target.value)
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                      handleRemove(item.SocialBehaviorId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="smoking2"
                  >
                    {item.SocialBehaviorCode === "Housing Mediation"
                      ? "Paka"
                      : item.SocialBehaviorCode === "Drinking Water Sources"
                      ? "Unsafe"
                      : "Yes"}
                  </label>
                </div>
              </div>
            </div>
          ))}
          {/* Other */}
          <div className="mb-1">
            <p className="font-16 mb-1">Others</p>
            <div className="position-relative onBtn">
              <OthersField />
            </div>
          </div>
        </div>
      )}

      {/* show component on click  */}
      {isShown || (
        <div>
          <h2></h2>
        </div>
      )}
    </>
  );
};

export default PatientIllness;
