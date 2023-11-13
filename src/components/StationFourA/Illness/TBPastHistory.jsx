import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import OthersField from "./OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { useSelector } from "react-redux";
import { loggedInUserData } from "../../../helper/localStorageHelper";
import TBpastHistoryModal from "../../StationFourC/Modals/TBpastHistoryModal";
import { AiOutlineClose } from "react-icons/ai";

const TBPastHistoryComponent = ({ formData, setFormData }) => {
  const [isShown, setIsShown] = useState(false);
  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const userData = loggedInUserData();
  const userName = userData?.name;

  const handleClick = () => {
    setIsShown((current) => !current);
    setFormData({ ...formData, TBEvidences: [], TBPastHistories: [] });
  };

  const [TBPastHistory, setTBPastHistory] = useState([]);
  const [TBPastEvidenced, setTBPastEvidenced] = useState([]);

  const getTBPastHistoryData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tb_past_history`);
      console.log(response.data.data);
      if (response.status === 200) {
        setTBPastHistory(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTBPastEvidencedData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tb_past_evidenced`);
      console.log(response.data.data);
      if (response.status === 200) {
        setTBPastEvidenced(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTBPastHistoryData();
    getTBPastEvidencedData();
  }, []);

  const [pastHistoryYear, setPastHistoryYear] = useState("");

  useEffect(() => {
    let myFormData = { ...formData };

    myFormData.TBPastHistories = myFormData.TBPastHistories.map((item) => ({
      ...item,
      TBHistoryOthers2: pastHistoryYear,
    }));

    myFormData.TBEvidences = myFormData.TBEvidences.map((item) => ({
      ...item,
      TBEPastEvidencedOthers: pastHistoryYear,
    }));

    setFormData(myFormData);
    console.log(myFormData?.TBPastHistories);
  }, [pastHistoryYear]);

  const handleChangeRadio = (TBHistoryId, value) => {
    let myFormData = { ...formData };

    const index = myFormData.TBPastHistories.findIndex(
      (object) => object.TBPastHistoryQuestionId === TBHistoryId
    );

    if (index === -1) {
      myFormData.TBPastHistories.push({
        PatientId: PatientId,
        TBPastHistoryQuestionId: TBHistoryId,
        TBHistoryAnswer1: value,
        TBHistoryOthers1: "",
        Status: value,
        CreateUser: userName,
        UpdateUser: userName,
        OrgId: OrgId,
        TBHistoryOthers2: pastHistoryYear,
      });
    }

    if (index !== -1) {
      myFormData.TBPastHistories = myFormData.TBPastHistories.filter((item) => {
        if (item.TBPastHistoryQuestionId == TBHistoryId) {
          item.Status = value;
        }
        return item;
      });
    }

    setFormData(myFormData);
    console.log(myFormData?.TBPastHistories);
  };

  const handleRemove = (TBHistoryId) => {
    let myFormData = { ...formData };

    myFormData.TBPastHistories = myFormData.TBPastHistories.filter((item) => {
      return item.TBPastHistoryQuestionId != TBHistoryId;
    });

    setFormData(myFormData);
  };

  const handleCheckboxChange = (e, item) => {
    let myFormData = { ...formData };

    const index = myFormData.TBEvidences.findIndex(
      (object) => object.TBEPastEvidencedId === item.TBEPastEvidenceId
    );

    if (index === -1) {
      myFormData.TBEvidences.push({
        PatientId: PatientId,
        TBEPastEvidencedId: item.TBEPastEvidenceId,
        TBEPastEvidencedCode: item.TBEPastEvidenceCode,
        Status: e.target.checked ? "yes" : "no",
        CreateUser: userName,
        UpdateUser: userName,
        OrgId: OrgId,
        TBEPastEvidencedOthers: pastHistoryYear,
      });
    }

    if (index !== -1) {
      myFormData.TBEvidences = myFormData.TBEvidences.filter((object) => {
        return object.TBEPastEvidencedId != item.TBEPastEvidenceId;
      });
    }

    setFormData(myFormData);
    // console.log(myFormData?.TBEvidences, e.target.checked);
  };

  const [cat1Data, setCat1Data] = useState([]);
  const [cat2Data, setCat2Data] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/tb_cat`, {
          params: {
            CatType: "CAT1",
          },
        });
        const response2 = await axios.get(`${API_URL}/api/tb_cat`, {
          params: {
            CatType: "CAT2",
          },
        });

        if (response.status === 200 && response2.status === 200) {
          setCat1Data(response.data.TBCatData);
          setCat2Data(response2.data.TBCatData);
          console.log(response2);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [isDiv1Open, setIsDiv1Open] = useState(false);
  const [isDiv2Open, setIsDiv2Open] = useState(false);

  const handleRadio1Click = () => {
    setIsDiv1Open(!isDiv1Open);
    setIsDiv2Open(false); // Close the other div
  };

  const handleRadio2Click = () => {
    setIsDiv2Open(!isDiv2Open);
    setIsDiv1Open(false); // Close the other div
  };

  const currentYear = new Date().getFullYear();
  const yearList = Array.from(
    { length: 100 },
    (_, index) => currentYear - index
  );

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
          <div className="d-flex justify-content-between align-items-center">
            <div className="">
              <p className="font-16">When did he suffer TB in past</p>
            </div>
            <div className="selectYear mb-3">
              <Form.Select
                aria-label="Default select example"
                className="ps-3"
                onChange={(e) => setPastHistoryYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {yearList.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="pt-2 ps-3 pb-1 mb-3 rounded bg-light">
            <div className="">
              <p className="font-16 mb-2">Evidenced was</p>
            </div>
            <div className="selectCheckBox mb-3 ps-4 ">
              {/* {TBPastEvidenced.map((item, key) => (
                <div
                  key={item.TBEPastEvidenceId}
                  className="d-flex justify-content-between pe-3 mb-1"
                >
                  <label className="form-check-label" htmlFor="evidenced_1">
                    {item.TBEPastEvidenceCode}
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="evidenced_1"
                  />
                </div>
              ))} */}

              {TBPastEvidenced.map((item, key) => (
                <div
                  key={item.TBEPastEvidenceId}
                  className="d-flex justify-content-between pe-3 mb-1"
                >
                  <label
                    className="form-check-label"
                    htmlFor={`evidenced_${item.TBEPastEvidenceId}`}
                  >
                    {item.TBEPastEvidenceCode}
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={`evidenced_${item.TBEPastEvidenceId}`}
                    onChange={(e) => handleCheckboxChange(e, item)}
                  />
                </div>
              ))}
            </div>
          </div>

          {TBPastHistory.map((item, key) => (
            <div key={item.TBHistoryId}>
              <div className="d-flex justify-content-between">
                <div className="">
                  <p className="font-16"> {item.TBHistoryIdCode}</p>
                </div>
                <div className="">
                  {item.TBPastHistoryAnswer1 &&
                    item.TBPastHistoryAnswer1 !== "" && (
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={item.TBHistoryId}
                          id={item.TBHistoryId + "inlineRadio1"}
                          value={item.TBPastHistoryAnswer1}
                          onChange={(e) =>
                            handleChangeRadio(item.TBHistoryId, e.target.value)
                          }
                          onDoubleClick={(e) => {
                            e.target.checked = false;
                            handleRemove(item.TBHistoryId);
                          }}
                          onClick={
                            item.TBHistoryIdCode === "Treatment received"
                              ? handleRadio1Click
                              : null
                          }
                        />
                        <label
                          className="form-check-label text-capitalize"
                          htmlFor={item.TBHistoryId + "inlineRadio1"}
                        >
                          {item.TBPastHistoryAnswer1}
                        </label>
                      </div>
                    )}

                  {item.TBPastHistoryAnswer2 &&
                    item.TBPastHistoryAnswer2 !== "" && (
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={item.TBHistoryId}
                          id={item.TBHistoryId + "inlineRadio2"}
                          value={item.TBPastHistoryAnswer2}
                          onChange={(e) =>
                            handleChangeRadio(item.TBHistoryId, e.target.value)
                          }
                          onDoubleClick={(e) => {
                            e.target.checked = false;
                            handleRemove(item.TBHistoryId);
                          }}
                          onClick={
                            item.TBHistoryIdCode === "Treatment received"
                              ? handleRadio2Click
                              : null
                          }
                        />
                        <label
                          className="form-check-label text-capitalize"
                          htmlFor={item.TBHistoryId + "inlineRadio2"}
                        >
                          {item.TBPastHistoryAnswer2}
                        </label>
                      </div>
                    )}

                  {item.TBPastHistoryQuestion &&
                    item.TBPastHistoryQuestion !== "" && (
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={item.TBHistoryId}
                          id={item.TBHistoryId + "inlineRadio3"}
                          value={item.TBPastHistoryQuestion}
                          onChange={(e) =>
                            handleChangeRadio(item.TBHistoryId, e.target.value)
                          }
                          onDoubleClick={(e) => {
                            e.target.checked = false;
                            handleRemove(item.TBHistoryId);
                          }}
                        />
                        <label
                          className="form-check-label text-capitalize"
                          htmlFor={item.TBHistoryId + "inlineRadio3"}
                        >
                          {item.TBPastHistoryQuestion}
                        </label>
                      </div>
                    )}
                </div>
              </div>

              {item.TBHistoryIdCode === "Treatment received" && isDiv1Open && (
                <div className="slide-down">
                  <div className="slide-down">
                    {cat1Data?.map((item, index) => (
                      <div
                        className="itemCard position-relative bg-light border ps-3 py-2 mb-2"
                        key={index}
                      >
                        <p className="mb-0 font-13">
                          {item.CreateDate}: {item.DrugCode}
                        </p>
                        <p className="mb-0 font-13">
                          {item.Frequency}, for {item.DrugDose}
                        </p>
                        <p className="mb-0 font-13">
                          {item.InstructionInBangla}
                        </p>

                        {/* <div className="actionBox">
                        <TBpastHistoryModal />
                        <button className="btn btn-sm btn-danger py-1 px-2 font-12 ms-1">
                          <AiOutlineClose />
                        </button>
                      </div> */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {item.TBHistoryIdCode === "Treatment received" && isDiv2Open && (
                <div className="slide-down">
                  {cat2Data?.map((item, index) => (
                    <div
                      className="itemCard position-relative bg-light border ps-3 py-2 mb-2"
                      key={index}
                    >
                      <p className="mb-0 font-13">
                        {item.CreateDate}: {item.DrugCode}
                      </p>
                      <p className="mb-0 font-13">
                        {item.Frequency}, for {item.DrugDose}
                      </p>
                      <p className="mb-0 font-13">{item.InstructionInBangla}</p>

                      {/* <div className="actionBox">
                        <TBpastHistoryModal />
                        <button className="btn btn-sm btn-danger py-1 px-2 font-12 ms-1">
                          <AiOutlineClose />
                        </button>
                      </div> */}
                    </div>
                  ))}
                </div>
              )}
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

export default TBPastHistoryComponent;
