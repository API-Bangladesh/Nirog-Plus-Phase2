import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { loggedInUserData } from "../../../helper/localStorageHelper";
import { useSelector } from "react-redux";

const PatientIllness = ({formData, setFormData}) => {
  const [isShown, setIsShown] = useState(false);
  const [ChildVaccination, setChildVaccination] = useState([]);

  const { patient } = useSelector((state) => state.patients);
  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const userData = loggedInUserData();
  const userName = userData?.name;
  let myFormData = { ...formData };

  const handleClick = (event) => {
    setIsShown((current) => !current);
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
    
    const index = myFormData.ChildVaccination.findIndex(
      (object) => object.illnessId === illnessId
    );

    if (index === -1) {
      myFormData.ChildVaccination.push({
        PatientId: PatientId,
        vaccineId: illnessId,
        otherVaccine: value,
        Status: "Child",
        isGivenByNirog: "",
        CreateUser: userName,
        UpdateUser: userName,
        OrgId: OrgId,
      });
    }

    if (index === 0) {
      myFormData.ChildVaccination =
        myFormData.ChildVaccination.filter((item) => {
          if (item.illnessId == illnessId) {
            item.Status = value;
          }
          return item;
        });
    }

    setFormData(myFormData);
    console.log(myFormData?.ChildVaccination);
  };
  

  const handleRemove = (illnessId) => {
    // myFormData.ChildVaccination =
    //   myFormData.ChildVaccination.filter((item) => {
    //     return item.illnessId != illnessId;
    //   });
    myFormData.ChildVaccination.map((item)=>{
      if(item.vaccineId === illnessId){
        myFormData.ChildVaccination.pop(item);
      }
    });
    console.log("doubleClicked!");
    setFormData(myFormData);
  };

  const handleChangeRadioTwo = (illnessId, value) => {
    myFormData.ChildVaccination.map((item)=>{
      if(item.vaccineId === illnessId){
        item.isGivenByNirog = value;
      }
  })
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
            id="flexSwitchCheckChecked"
            defaultChecked=""
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
          
          {ChildVaccination.map((item) => (
            <div className="d-flex justify-content-between">
              <div className="">
                <p className="font-16">{item.VaccineCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.VaccineCode}
                    id="bcg1"
                    value="no"
                    onChange={(e) =>
                      handleChangeRadio(item.VaccineId, e.target.value)
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                      handleRemove(item.VaccineId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="bcg1"
                  >
                    no
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.VaccineCode}
                    id="bcg2"
                    value="yes"
                    onChange={(e) =>
                      handleChangeRadio(item.VaccineId, e.target.value)
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      e.target.value = null;
                      handleRemove(item.VaccineId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="bcg2"
                  >
                    yes
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="yes"
                    onClick={(e)=>handleChangeRadioTwo(item.VaccineId, e.target.value)}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor="inlineRadio2"
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
