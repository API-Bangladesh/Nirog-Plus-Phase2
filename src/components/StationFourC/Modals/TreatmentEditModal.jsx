import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../FourCuserInput.css";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { loggedInUserData } from "../../../helper/localStorageHelper";
import { useSelector } from "react-redux";

function MyVerticallyCenteredModal({
  show,
  onHide,
  formData,
  setFormData,
  editData,
}) {
  const { patient } = useSelector((state) => state.patients);
  const [PatientId] = useState(patient?.PatientId);
  const doctorName = loggedInUserData().name;

  const [drugCode, setDrugCode] = useState("");
  const [drugId, setDrugId] = useState("");
  const [instruction, setInstruction] = useState();
  const [durationId, setDurationId] = useState("");
  const [drugSubstance, setDrugSubstance] = useState("");
  const [drugSubstanceUnit, setDrugSubstanceUnit] = useState("");
  const [drugPcs, setDrugPcs] = useState("");
  const [drugPcsUnit, setDrugPcsUnit] = useState("");
  const [drugDurationOnlyValue, setDrugDurationOnlyValue] = useState("");
  const [drugDurationValueUnit, setDrugDurationValueUnit] = useState("");

  const [showSuggestion, setShowSuggestion] = useState(false);
  const [drugCodeList, setDrugCodeList] = useState([]);

  const [frequencyList, setFrequencyList] = useState([]);
  // const [frequencyHour, setFrequencyHour] = useState("");
  const [frequencyValue, setFrequencyValue] = useState("");
  const [specialInstruction, setSpecialInstruction] = useState("");
  const [specialInstructionList, setSpecialInstructionList] = useState([]);
  const [banglaInstruction, setBanglaInstruction] = useState("");
  const [addDrug, setAddDrug] = useState("");

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  // let drugDose = drugSubstance + drugSubstanceUnit; //ex:10mg
  // let drugPieces = drugPcs + " " + drugPcsUnit; //1 spoon
  // let drugDurationValue = drugDurationOnlyValue + " " + drugDurationValueUnit; //20 day

  function extractNumericValueAndUnit(data) {
    const regex = /^([\d.]+)\s*([a-zA-Z]+)$/; // Regex to match numeric value and unit

    const match = data.match(regex);

    if (match) {
      const numericValue = parseFloat(match[1]); // Convert the matched numeric value to a float
      const unit = match[2];

      return { numericValue, unit };
    }

    return null; // Return null if no match is found
  }

  function extractValues(expression) {
    // Use regular expression to find all numbers or fractions
    const matches = expression.match(/(\d+\/\d+|\d+)/g) || [];

    // Filter out zeros and convert to integers or floats
    const nonZeroValues = matches
      .filter((match) => match !== "0")
      .map((match) => (match.includes("/") ? eval(match) : parseInt(match)));

    // Return the count of non-zero values and their sum
    const sumOfNonZeroValues = nonZeroValues.reduce(
      (sum, value) => sum + value,
      0
    );

    return {
      count: 24 / nonZeroValues.length,
      value: sumOfNonZeroValues / nonZeroValues.length,
    };
  }

  function extractValuesFromString(inputString) {
    const match = inputString.match(/(\d+)\s*(\w+)/);

    if (match) {
      const numericValue = parseInt(match[1]);
      const unit = match[2];

      return {
        numericValue,
        unit,
      };
    } else {
      return null; // Return null if no match is found
    }
  }

  // useEffect(() => {
  //   let result;
  //   if (frequencyHour === "" || drugPcs === "") {
  //     result = "N/A";
  //   } else if (frequencyHour == 4) {
  //     result = `${drugPcs}+${drugPcs}+${drugPcs}+${drugPcs}+${drugPcs}+${drugPcs}`;
  //   } else if (frequencyHour == 6) {
  //     result = `${drugPcs}+${drugPcs}+${drugPcs}+${drugPcs}`;
  //   } else if (frequencyHour == 8) {
  //     result = `${drugPcs}+${drugPcs}+${drugPcs}`;
  //   } else if (frequencyHour == 12) {
  //     result = `${drugPcs}+0+${drugPcs}`;
  //   } else if (frequencyHour == 24) {
  //     result = `0+0+${drugPcs}`;
  //   } else {
  //     result = "N/A";
  //   }
  //   setFrequencyValue(result);
  // }, [frequencyHour, drugPcs]);

  useEffect(() => {
    if (drugCode) {
      axios
        .get(`${API_URL}/api/treatment-suggestins`, {
          params: {
            keyword: drugCode,
            // limit: 20,
          },
        })
        .then((response) => {
          setDrugCodeList(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [drugCode]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/frequency-hours`, {})
      .then((response) => {
        setFrequencyList(response.data.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/special-instruction`, {})
      .then((response) => {
        setSpecialInstructionList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (show && editData) {
      // console.log(editData)
      setDrugCode(editData.drugCode || "");
      setDrugId(editData.drugId || "");
      setInstruction(editData.instruction || "");
      setDurationId(editData.durationId || "");

      // Extract numeric values and units for drug dose
      const drugDoseData = extractNumericValueAndUnit(editData.drugDose);
      setDrugSubstance(drugDoseData?.numericValue || "");
      setDrugSubstanceUnit(drugDoseData?.unit || "");

      // Extract numeric values and units for frequency
      const frequencyData = extractValues(editData.frequency);
      // setFrequencyHour(frequencyData?.count || "");
      setFrequencyValue(editData.frequency || "");
      const drugPcsData = extractNumericValueAndUnit(editData.otherDrug);
      // setDrugPcs(frequencyData?.value || "");
      // setDrugPcsUnit("");
      setDrugPcs(drugPcsData?.numericValue || "");
      setDrugPcsUnit(drugPcsData?.unit || "");

      const drugDuration = extractValuesFromString(editData.drugDurationValue);

      setDrugDurationOnlyValue(drugDuration?.numericValue || "");
      setDrugDurationValueUnit(drugDuration?.unit || "");
      // setShowSuggestion(editData.showSuggestion || false);

      setSpecialInstruction(editData.banglaInstruction || "");
      setBanglaInstruction(editData.banglaInstruction || "");
      setAddDrug(editData.addDrug || "");

      // console.log(editData);
      // console.log(drugPcsData);
    } else {
      // Clear modal fields when not in edit mode
      setDrugId("");
      setDrugCode("");
      // ... (clear other fields)
    }
  }, [show, editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let myFormData = { ...formData };

    if (drugCode === "") {
      setError("  This field can not be empty!");
      return;
    }
    if (banglaInstruction === "") {
      setError2("This field can not be empty!");
      return;
    }
    if (drugCode && banglaInstruction) {
      const index = myFormData.TreatmentSuggestion.findIndex(
        (entry) => entry.drugId === editData.drugId
      );

      if (index !== -1) {
        myFormData.TreatmentSuggestion[index] = {
          ...myFormData.TreatmentSuggestion[index],
          PatientId: PatientId,
          drugId: drugId,
          drugCode,
          instruction,
          banglaInstruction,
          durationId: "D796D547-1815-4EB7-A74D-03AB1342A625",
          frequencyId: "143927E4-67BC-41FD-B092-063033E34366",
          frequency: frequencyValue,
          refInstructionId: specialInstruction,
          drugDurationValue:
            drugDurationOnlyValue + " " + drugDurationValueUnit,
          otherDrug: drugPcs + " " + drugPcsUnit, //drugPieces is set in comment field!
          drugDose: drugSubstance + drugSubstanceUnit,
          specialInstruction: banglaInstruction,
          comment: "",
          hourly: addDrug,
          Status: "",
          CreateUser: doctorName,
          OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
        };
      }

      setFormData(myFormData);
      // setDrugId("");
      // setInstruction("");
      // setDrugCodeList([]);
      // setDrugCode("");
      // setDurationId("");
      // setFrequencyValue("");
      // setDrugDurationOnlyValue("");
      onHide();
      // setShowSuggestion("");
      // setDrugSubstance("");
      // setBanglaInstruction("");
      // setSpecialInstruction("");
      // setAddDrug("");
      console.log(myFormData?.TreatmentSuggestion);
    }
  };

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal-header" onClick={onHide} closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-light font-18"
        >
          Treatment Suggestions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 ">
        <div className="mb-3 pb-0 m-0 input-shadow rounded-pill">
          <input
            type="text"
            value={drugCode}
            onChange={(e) => {
              setDrugCode(e.target.value);
              setShowSuggestion(true);
              setError("");
            }}
            // className="form-control input-padding rounded-pill py-2 border-0"
            className={`form-control input-padding rounded-pill py-2 border-0 ${
              error ? "error-input" : ""
            }`}
            placeholder="Drug"
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <ul className="autocompleteDataList">
            {showSuggestion &&
              drugCodeList?.map((item, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => {
                      setDrugId(item.DrugId);
                      setInstruction(item.Description);
                      setDrugCode(item.DrugCode);
                      setDrugCodeList([]);
                      setShowSuggestion(false);
                    }}
                  >
                    {item.DrugCode}
                  </li>
                );
              })}
          </ul>
        </div>

        {drugCode === "Others" && (
          <div className="mb-3 pb-0 m-0 input-shadow rounded-pill">
            <input
              type="text"
              value={addDrug}
              onChange={(e) => {
                setAddDrug(e.target.value);
              }}
              // className="form-control input-padding rounded-pill py-2 border-0"
              className={`form-control input-padding rounded-pill py-2 border-0 ${
                error ? "error-input" : ""
              }`}
              placeholder="Add Drug"
            />
          </div>
        )}

        {/*updated div here */}
        <div className="row mb-3 input-shadow rounded-pill">
          <div className="col-lg-6">
            <input
              type="text"
              value={drugSubstance}
              onChange={(e) => setDrugSubstance(e.target.value)}
              className="form-control input-padding rounded-pill py-2 border-0"
              placeholder="Drug substance: 10, 20"
            />
          </div>

          <div className="col-lg-6">
            <select
              id="Select"
              onChange={(e) => setDrugSubstanceUnit(e.target.value)}
              className="form-select input-padding rounded-pill select-form-padding"
              value={drugSubstanceUnit}
            >
              <option value="">Unit</option>
              <option value="mg">mg</option>
              <option value="ml">ml</option>
              <option value="g">g</option>
            </select>
          </div>
        </div>

        <div className="mb-3 input-shadow rounded-pill">
          <select
            id="Select"
            // onChange={(e) => setFrequencyHour(e.target.value)}
            onChange={(e) => setFrequencyValue(e.target.value)}
            className="form-select input-padding rounded-pill select-form-padding"
            value={frequencyValue}
          >
            <option value="">Frequency Hours</option>

            {frequencyList?.length > 0 && frequencyList.map((item, index) => <option value={item.FrequencyInEnglish} key={index}>{item.FrequencyInEnglish}</option>)}


            {/* <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="24">24</option> */}
          </select>
        </div>

        {/* Added a new div */}
        <div className="row mb-3 input-shadow rounded-pill">
          <div className="col-lg-6">
            <select
              id="Select"
              onChange={(e) => setDrugPcs(e.target.value)}
              className="form-select input-padding rounded-pill select-form-padding"
              value={drugPcs}
            >
              <option value="">Drug quantity</option>
              <option value="1/2">1/2</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div className="col-lg-6">
            <select
              id="Select"
              onChange={(e) => setDrugPcsUnit(e.target.value)}
              className="form-select input-padding rounded-pill select-form-padding"
              value={drugPcsUnit}
            >
              <option value="">Unit</option>
              <option value="pcs">pcs</option>
              <option value="spoon">spoon</option>
            </select>
          </div>
        </div>

        <div className="row mb-3 input-shadow rounded-pill">
          <div className="col-lg-6">
            <input
              type="text"
              value={drugDurationOnlyValue}
              onChange={(e) => setDrugDurationOnlyValue(e.target.value)}
              className="form-control input-padding rounded-pill py-2 border-0"
              placeholder="Duration : 1, 2..."
            />
          </div>
          <div className="col-lg-6">
            <select
              id="Select"
              onChange={(e) => setDrugDurationValueUnit(e.target.value)}
              className="form-select input-padding rounded-pill select-form-padding"
              value={drugDurationValueUnit}
            >
              <option value="">Unit</option>
              <option value="Day">Day</option>
              <option value="Week">Week</option>
              <option value="Month">Month</option>
              <option value="Year">Year</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <select
            id="Select"
            value={banglaInstruction}
            onChange={(e) => {
              setSpecialInstruction(e.target.value);
              setBanglaInstruction(
                e.target.options[e.target.selectedIndex].getAttribute(
                  "data-bangla-instruction"
                )
              );
              setError2("");
            }}
            // className="form-control input-padding rounded-pill py-2 border-0"
            className={`form-control input-padding rounded-pill py-2 border-0 ${
              error2 ? "error-input" : ""
            }`}
          >
            <option value="">-- Select --</option>
            {specialInstructionList.map((item) => (
              <option
                key={item.RefInstructionId}
                // value={item.RefInstructionId}
                value={item.InstructionInBangla}
                data-bangla-instruction={item.InstructionInBangla}
              >
                {item.InstructionInBangla}
              </option>
            ))}
          </select>
          {error2 && <p style={{ color: "red" }}>{error2}</p>}
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center border-0 pt-0">
        <Button
          onClick={(e) => handleSubmit(e)}
          type="button"
          className="border-0 text-capitalize add-button font-16"
        >
          save
        </Button>
        <Button
          type="button"
          onClick={onHide}
          className="bg-danger border-0 text-capitalize font-16"
        >
          cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// const TPuserInputModal = (props) => {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button
//         variant=""
//         onClick={() => setModalShow(true)}
//         className="add-button"
//       >
//         Add
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//         {...props}
//       />
//     </>
//   );
// };

export default MyVerticallyCenteredModal;
