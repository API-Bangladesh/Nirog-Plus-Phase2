import React, { useEffect, useState } from "react";
import OthersField from "./OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { useSelector } from "react-redux";
import { loggedInUserData } from "../../../helper/localStorageHelper";

const ExaminationFindings = ({ formData, setFormData }) => {
  const [isShown, setIsShown] = useState(false);
  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const userData = loggedInUserData();
  const userName = userData?.name;

  const handleClick = () => {
    setIsShown((current) => !current);
    setFormData({ ...formData, TBEFindings: [] });
  };

  // TBEFindings
  const [TBEFindings, setTBEFindings] = useState([]);

  const getTBEFindingsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tb_eFinding`, {
        data: {
          CatType: "CAT1",
        },
      });
      // console.log(response.data.data);
      if (response.status === 200) {
        setTBEFindings(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTBEFindingsData();
  }, []);

  const handleChangeRadio = (TBEFindingId, TBEFindingCode, value) => {
    let myFormData = { ...formData };

    const index = myFormData.TBEFindings.findIndex(
      (object) => object.TBEFindingId === TBEFindingId
    );

    if (index === -1) {
      myFormData.TBEFindings.push({
        PatientId: PatientId,
        TBEFindingId: TBEFindingId,
        TBEFindingCode: TBEFindingCode,
        TBEFindingOthers: "",
        Status: value,
        CreateUser: userName,
        UpdateUser: userName,
        OrgId: OrgId,
      });
    }

    if (index !== -1) {
      myFormData.TBEFindings = myFormData.TBEFindings.filter((item) => {
        if (item.TBEFindingId == TBEFindingId) {
          item.Status = value;
        }
        return item;
      });
    }

    setFormData(myFormData);
    // console.log(myFormData?.TBEFindings);
  };

  const handleRemove = (TBEFindingId) => {
    let myFormData = { ...formData };

    myFormData.TBEFindings = myFormData.TBEFindings.filter((item) => {
      return item.TBEFindingId != TBEFindingId;
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
            name="flexSwitchCheckChecked"
          />
        </div>
      </div>

      {isShown && (
        <div className="col-lg-12">
          {TBEFindings.map((item, key) => (
            <div
              key={item.TBEFindingId}
              className="d-flex justify-content-between"
            >
              <div className="">
                <p className="font-16">{item.TBEFindingCode}</p>
              </div>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.TBEFindingId}
                    id={item.TBEFindingId + "1"}
                    value="no"
                    onChange={(e) =>
                      handleChangeRadio(
                        item.TBEFindingId,
                        item.TBEFindingCode,
                        e.target.value
                      )
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      // e.target.value = null;
                      handleRemove(item.TBEFindingId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item.TBEFindingId + "1"}
                  >
                    no
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={item.TBEFindingId}
                    id={item.TBEFindingId + "2"}
                    value="yes"
                    onChange={(e) =>
                      handleChangeRadio(
                        item.TBEFindingId,
                        item.TBEFindingCode,
                        e.target.value
                      )
                    }
                    onDoubleClick={(e) => {
                      e.target.checked = false;
                      // e.target.value = null;
                      handleRemove(item.TBEFindingId);
                    }}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item.TBEFindingId + "2"}
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

export default ExaminationFindings;
