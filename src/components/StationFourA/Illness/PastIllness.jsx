import React, { useEffect, useState } from "react";
import OthersField from "./OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { useSelector } from "react-redux";
import { loggedInUserData } from "../../../helper/localStorageHelper";

const PatientIllness = ({ formData, setFormData }) => {
  const [isShown, setIsShown] = useState(false);
  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const userData = loggedInUserData();
  const userName = userData?.name;

  // pastIllness
  const [pastIllness, setpastIllness] = useState([]);

  const getpastIllnessData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/patient-ho-past-illness`
      );

      if (response.status === 200) {
        setpastIllness(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getpastIllnessData();
  }, []);

  const handleChangeRadio = (illnessId, value) => {
    let myFormData = { ...formData };

    const index = myFormData.PatientHOPastIllness.findIndex(
      (object) => object.illnessId === illnessId
    );

    if (index === -1) {
      myFormData.PatientHOPastIllness.push({
        PatientId: PatientId,
        illnessId: illnessId,
        otherIllness: "",
        Status: value,
        CreateUser: userName,
        UpdateUser: userName,
        OrgId: OrgId,
      });
    }

    if (index !== -1) {
      myFormData.PatientHOPastIllness = myFormData.PatientHOPastIllness.filter(
        (item) => {
          if (item.illnessId == illnessId) {
            item.Status = value;
          }
          return item;
        }
      );
    }

    setFormData(myFormData);
    console.log(myFormData?.PatientHOPastIllness);
  };

  const handleRemove = (illnessId) => {
    let myFormData = { ...formData };

    myFormData.PatientHOPastIllness = myFormData.PatientHOPastIllness.filter(
      (item) => {
        return item.illnessId != illnessId;
      }
    );

    setFormData(myFormData);
    console.log(myFormData?.PatientHOPastIllness);
  };

  const handleClick = () => {
    setIsShown((current) => !current);
    setFormData({ ...formData, PatientHOPastIllness: [] });
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
            // id="flexSwitchCheckChecked"
            // defaultChecked=""
          />
        </div>
      </div>

      {isShown && (
        <div className="col-lg-12">
          {pastIllness.map((item) => (
            <div
              key={item.IllnessId}
              className="d-flex justify-content-between"
            >
              <div className="">
                <p className="font-16">{item.IllnessCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.IllnessId}
                    id={item.IllnessId + "hopastillness1"}
                    value="no"
                    onChange={(e) =>
                      handleChangeRadio(item.IllnessId, e.target.value)
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      // e.target.value = null;
                      handleRemove(item.IllnessId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item.IllnessId + "hopastillness1"}
                  >
                    no
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.IllnessId}
                    id={item.IllnessId + "hopastillness2"}
                    value="yes"
                    onChange={(e) =>
                      handleChangeRadio(item.IllnessId, e.target.value)
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      // e.target.value = null;
                      handleRemove(item.IllnessId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item.IllnessId + "hopastillness2"}
                  >
                    yes
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
