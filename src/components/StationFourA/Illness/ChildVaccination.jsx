import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { loggedInUserData } from "../../../helper/localStorageHelper";
import { useSelector } from "react-redux";

const PatientIllness = ({ formData, setFormData }) => {
  const [isShown, setIsShown] = useState(false);
  const [ChildVaccination, setChildVaccination] = useState([]);

  const { patient } = useSelector((state) => state.patients);
  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const userData = loggedInUserData();
  const userName = userData?.name;

  const handleClick = () => {
    setIsShown((current) => !current);
    setFormData({ ...formData, ChildVaccination: [] });
    console.log(formData?.ChildVaccination);
  };

  //ChildVaccination
  const getChildVaccinationData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/child-vaccination`);

      if (response.status === 200) {
        setChildVaccination(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChildVaccinationData();
  }, []);

  const handleChangeRadio = (illnessId, value) => {
    let myFormData = { ...formData };

    const index = myFormData.ChildVaccination.findIndex(
      (object) => object.vaccineId === illnessId
    );

    let checkIndex = checkboxs.findIndex(item => item.vaccineId === illnessId)

    let isGivenByNirog = checkIndex === -1 ? "" : checkboxs[checkIndex].isGivenByNirog

    console.log(isGivenByNirog)

    if (index === -1) {
      myFormData.ChildVaccination.push({
        PatientId: PatientId,
        vaccineId: illnessId,
        otherVaccine: value,
        Status: "Child",
        isGivenByNirog: isGivenByNirog,
        CreateUser: userName,
        UpdateUser: userName,
        OrgId: OrgId,
      });
    }

    if (index !== -1) {
      myFormData.ChildVaccination = myFormData.ChildVaccination.filter(
        (item) => {
          if (item.vaccineId == illnessId) {
            item.otherVaccine = value;
          }
          return item;
        }
      );
    }

    setFormData(myFormData);
    console.log(myFormData?.ChildVaccination);
  };

  const handleRemove = (illnessId) => {
    let myFormData = { ...formData };

    myFormData.ChildVaccination = myFormData.ChildVaccination.filter(
      (item) => {
        return item.vaccineId != illnessId;
      }
    );

    setFormData(myFormData);
    console.log(myFormData?.ChildVaccination);

    // myFormData.ChildVaccination.map((item) => {
    //   if (item.vaccineId === illnessId) {
    //     myFormData.ChildVaccination.pop(item);
    //   }
    // });
    // console.log("doubleClicked!");
    // setFormData(myFormData);
    // console.log(myFormData?.ChildVaccination);
  };

  const [checkboxs, setCheckboxs] = useState([])

  const handleChangeRadioTwo = (illnessId, e) => {
    let myCheckboxs = [...checkboxs];
    const checked = e.target.checked;

    const index = myCheckboxs.findIndex(
      (object) => object.vaccineId === illnessId
    );

    if (index === -1) {
      myCheckboxs.push({
        vaccineId: illnessId,
        isGivenByNirog: checked ? "yes" : "",
      });
    }

    if (index !== -1) {
      myCheckboxs = myCheckboxs.filter(
        (item) => {
          if (item.vaccineId == illnessId) {
            item.isGivenByNirog = checked ? "yes" : "";
          }
          return item;
        }
      );
    }

    let myFormData = { ...formData };

    // Update the main form data with both radio and checkbox changes
    myFormData.ChildVaccination = myFormData.ChildVaccination.map((item) => {
      if (item.vaccineId === illnessId) {
        item.isGivenByNirog = checked ? "yes" : ""; // Update checkbox value
      }
      return item;
    });

    setFormData(myFormData);

    setCheckboxs(myCheckboxs);
    console.log(myCheckboxs)

    // myFormData.ChildVaccination.map((item) => {
    //   if (item.vaccineId === illnessId) {
    //     item.isGivenByNirog = value;
    //   }
    // });
  };

  return (
    <>
      <div className="col-lg-12 d-flex">
        <div className="form-check form-switch btn">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={handleClick}
            role="switch"
            name="flexSwitchCheckChecked"
          />
        </div>
      </div>

      {isShown && (
        <div className="col-lg-12">
          <div className="d-flex justify-content-end">
            <p className="text-center font-12 mb-2 lh-1">
              Given by
              <br />
              nirog team?
            </p>
          </div>

          {ChildVaccination.map((item, index) => (
            <div className="d-flex justify-content-between" key={index}>
              <div className="">
                <p className="font-16">{item.VaccineCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.VaccineId}
                    id={item.VaccineId + "bcg1"}
                    value="no"
                    onChange={(e) =>
                      handleChangeRadio(item.VaccineId, e.target.value)
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      // e.target.value = null;
                      handleRemove(item.VaccineId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item.VaccineId + "bcg1"}
                  >
                    no
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.VaccineId}
                    id={item.VaccineId + "bcg2"}
                    value="yes"
                    onChange={(e) =>
                      handleChangeRadio(item.VaccineId, e.target.value)
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      // e.target.value = null;
                      handleRemove(item.VaccineId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item.VaccineId + "bcg2"}
                  >
                    yes
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="inlineRadioOptions"
                    id={item.VaccineId + "inlineRadio2"}
                    value="yes"
                    onChange={(e) =>
                      handleChangeRadioTwo(item.VaccineId, e)
                    }
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item.VaccineId + "inlineRadio2"}
                  ></label>
                </div>
              </div>
            </div>
          ))}
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
