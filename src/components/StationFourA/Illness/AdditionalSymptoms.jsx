import React, { useEffect, useState } from "react";
import OthersField from "./OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { useSelector } from "react-redux";
import { loggedInUserData } from "../../../helper/localStorageHelper";

const AdditionalSymptoms = ({ formData, setFormData }) => {
  const [isShown, setIsShown] = useState(false);
  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const userData = loggedInUserData();
  const userName = userData?.name;

  const handleClick = () => {
    setIsShown((current) => !current);
    setFormData({ ...formData, TBSymptoms: [] });
  };

  // TBSymptoms
  const [TBSymptoms, setTBSymptoms] = useState([]);

  const getTBSymptomsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tb_symptom`, {
        data: {
          CatType: "CAT1",
        },
      });
      // console.log(response.data.data);
      if (response.status === 200) {
        setTBSymptoms(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTBSymptomsData();
  }, []);

  const handleChangeRadio = (TBSymptomId, TBSymptomCode, value) => {
    let myFormData = { ...formData };

    const index = myFormData.TBSymptoms.findIndex(
      (object) => object.TBSymptom === TBSymptomId
    );

    if (index === -1) {
      myFormData.TBSymptoms.push({
        PatientId: PatientId,
        TBSymptom: TBSymptomId,
        TBSymptomCode: TBSymptomCode,
        OthersSymptom: "",
        Status: value,
        CreateUser: userName,
        UpdateUser: userName,
        OrgId: OrgId,
      });
    }

    if (index !== -1) {
      myFormData.TBSymptoms = myFormData.TBSymptoms.filter((item) => {
        if (item.TBSymptom == TBSymptomId) {
          item.Status = value;
        }
        return item;
      });
    }

    setFormData(myFormData);
    // console.log(myFormData?.TBSymptoms);
  };

  const handleRemove = (TBSymptomId) => {
    let myFormData = { ...formData };

    myFormData.TBSymptoms = myFormData.TBSymptoms.filter((item) => {
      return item.TBSymptom != TBSymptomId;
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
          {TBSymptoms.map((item, key) => (
            <div
              key={item.TBSymptomId}
              className="d-flex justify-content-between"
            >
              <div className="">
                <p className="font-16">{item.TBSymptomCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.TBSymptomId}
                    id={item.TBSymptomId + "1"}
                    value="no"
                    onChange={(e) =>
                      handleChangeRadio(
                        item.TBSymptomId,
                        item.TBSymptomCode,
                        e.target.value
                      )
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      // e.target.value = null;
                      handleRemove(item.TBSymptomId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item.TBSymptomId + "1"}
                  >
                    no
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.TBSymptomId}
                    id={item.TBSymptomId + "2"}
                    value="yes"
                    onChange={(e) =>
                      handleChangeRadio(
                        item.TBSymptomId,
                        item.TBSymptomCode,
                        e.target.value
                      )
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      // e.target.value = null;
                      handleRemove(item.TBSymptomId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item.TBSymptomId + "2"}
                  >
                    yes
                  </label>
                </div>
              </div>
            </div>
          ))}

          {/* Other */}
          {/* <div className="mb-1">
            <p className="font-16 mb-1">Others</p>
            <div className="position-relative onBtn">
              <OthersField />
            </div>
          </div> */}
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

export default AdditionalSymptoms;
