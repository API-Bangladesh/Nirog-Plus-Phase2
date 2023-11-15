import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { loggedInUserData } from "../../../helper/localStorageHelper";
import { useSelector } from "react-redux";

const PatientIllness = ({ formData, setFormData }) => {
  const [isShown, setIsShown] = useState(false);
  const [AdultVaccination, setAdultVaccination] = useState([]);

  const { patient } = useSelector((state) => state.patients);
  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const userData = loggedInUserData();
  const userName = userData?.name;
  
  const handleClick = () => {
    setIsShown((current) => !current);
    setFormData({ ...formData, AdultVaccination: [] });
    console.log(formData?.AdultVaccination);
  };

  // AdultVaccination
  const getAdultVaccinationData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/adult-vaccination`);

      if (response.status === 200) {
        setAdultVaccination(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdultVaccinationData();
  }, []);

  const handleChangeRadio = (illnessId, value) => {
    let myFormData = { ...formData };

    const index = myFormData.AdultVaccination.findIndex(
      (object) => object.vaccineId === illnessId
    );

    let checkIndex = checkboxs.findIndex(item => item.vaccineId === illnessId)

    let isGivenByNirog = checkIndex === -1 ? "" : checkboxs[checkIndex].isGivenByNirog

    console.log(isGivenByNirog)

    if (index === -1) {
      myFormData.AdultVaccination.push({
        PatientId: PatientId,
        vaccineId: illnessId,
        otherVaccine: value,
        Status: "Adult",
        isGivenByNirog: isGivenByNirog,
        CreateUser: userName,
        UpdateUser: userName,
        OrgId: OrgId,
      });
    }

    if (index !== -1) {
      myFormData.AdultVaccination = myFormData.AdultVaccination.filter(
        (item) => {
          if (item.vaccineId == illnessId) {
            item.otherVaccine = value;
          }
          return item;
        }
      );
    }

    setFormData(myFormData);
    console.log(myFormData?.AdultVaccination);
  };

  const handleRemove = (illnessId) => {
    let myFormData = { ...formData };

    myFormData.AdultVaccination = myFormData.AdultVaccination.filter(
      (item) => {
        return item.vaccineId != illnessId;
      }
    );

    setFormData(myFormData);
    console.log(myFormData?.AdultVaccination);

    // myFormData.AdultVaccination.map((item) => {
    //   if (item.vaccineId === illnessId) {
    //     myFormData.AdultVaccination.pop(item);
    //   }
    // });
    // console.log("doubleClicked!");
    // setFormData(myFormData);
    // console.log(myFormData?.AdultVaccination);
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
    myFormData.AdultVaccination = myFormData.AdultVaccination.map((item) => {
      if (item.vaccineId === illnessId) {
        item.isGivenByNirog = checked ? "yes" : ""; // Update checkbox value
      }
      return item;
    });

    setFormData(myFormData);

    setCheckboxs(myCheckboxs);
    console.log(formData?.AdultVaccination);

    // myFormData.AdultVaccination.map((item) => {
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

          {AdultVaccination.map((item, i) => (
            <div className="d-flex justify-content-between" key={i}>
              <div className="">
                <p className="font-16">{item.VaccineCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.VaccineId}
                    id={item.VaccineId + "acg1"}
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
                    htmlFor={item.VaccineId + "acg1"}
                  >
                    no
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.VaccineId}
                    id={item.VaccineId + "acg2"}
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
                    htmlFor={item.VaccineId + "acg2"}
                  >
                    yes
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="inputOptions"
                    id={item.VaccineId + "AdultinlineRadio2"}
                    value="yes"
                    onClick={(e) =>
                      handleChangeRadioTwo(item.VaccineId, e)
                    }
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item.VaccineId + "AdultinlineRadio2"}
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
