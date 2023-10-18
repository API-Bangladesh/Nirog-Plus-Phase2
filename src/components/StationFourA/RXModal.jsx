import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./TPuserInput.css";
import axios from "axios";
import { API_URL } from "../../helper/Constants";
import { useSelector } from 'react-redux';

function MyVerticallyCenteredModal({ show, onHide, formData, setFormData }) {
  const {patient} = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const [medicineName, setMedicineName] = useState("");
  // const [dose, setDose] = useState("");
  // const [doseValue, setDoseValue] = useState("");
  const [status, setStatus] = useState("");
  const [frequencyHour, setFrequencyHour] = useState("");
  const [frequencyValue, setFrequencyValue] = useState("");
  const [allergyToMedication, setAllergyToMedication] = useState("");

  const [medicineNameList, setMedicineNameList] = useState([]);
  const [error, setError] = useState('');
  // const [showMedicine, setShowMedicine] = useState(false)
  const [dos, setDos] = useState("");
  const [dosUnit, setDosUnit] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("");

  const dose = dos + dosUnit;
  const durationVal = duration + durationUnit;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/current-medication-token`)
      .then((response) => {
        setMedicineNameList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 
   useEffect(() => {
     let result;
     if (frequencyHour == 4) {
       result = "1+1+1+1+1+1";
     } else if (frequencyHour == 6) {
       result = "1+1+1+1";
     } else if (frequencyHour == 8) {
       result = "1+1+1";
     } else if (frequencyHour == 12) {
       result = "1+0+1";
     } else if (frequencyHour == 24) {
       result = "0+0+1";
     } else {
       result = "N/A";
     }
     setFrequencyValue(result);
   }, [frequencyHour]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let myFormData = { ...formData };

    if(medicineName === ''){
      setError('This field can not be empty!');
    }else{
      myFormData.CurrentMedicationTaken.push({
        PatientId: PatientId, 
        medicineName: medicineName,
        durationId: "D796D547-1815-4EB7-A74D-03AB1342A625",
        doseValue: durationVal,
        dose: dose,
        frequencyHour: frequencyValue,
        allergyToMedication: allergyToMedication,
        Status: status,
        CreateUser: "Nazmul",
        UpdateUser: "Nazmul1",
        OrgId: OrgId,
      });
  
      setFormData(myFormData);
      setMedicineName("");
      setDos("");
      setDosUnit("");
      setDuration("");
      setDurationUnit("");
      setStatus("");
      onHide();
    }
    console.log(myFormData);
  };
  // console.log(medicineName);

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
          Current Medication Taken
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 pb-0">
        <div className="mb-2 pb-0 m-0">
          <div className="mb-2 pb-0 m-0">
            <input
              type="text"
              value={medicineName}
              onChange={(e) => {
                setMedicineName(e.target.value);
                setError("");
              }}
              // className="form-control input-padding rounded-pill py-2 border-0"
              className={`form-control input-padding rounded-pill py-2 border-0 ${
                error ? "error-input" : ""
              }`}
              placeholder="Enter Medicine Name"
              list="browsers"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <datalist id="browsers">
              {medicineNameList.map((item, key) => {
                return <option key={key} value={item.DrugCode} />;
              })}
            </datalist>
          </div>
        </div>

        {
          medicineName === 'Others' &&
          <div className="mb-3 input-shadow rounded-pill">
            <input
              type="text"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              className="form-control input-padding rounded-pill py-2 border-0"
              placeholder="Add Medicine"
            />
          </div>
        }

        <div className="form-check mb-3 ms-3 mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="medicineSelect"
            value={allergyToMedication}
            onChange={(e) => setAllergyToMedication(e.target.checked)}
          />
          <label
            className="form-check-label"
            htmlFor="allergy"
            for="medicineSelect"
          >
            Allergy to medication
          </label>
        </div>

        <div className="mb-3 input-shadow rounded-pill">
          <select
            id="Select"
            onChange={(e) => setFrequencyHour(e.target.value)}
            className="form-select input-padding rounded-pill select-form-padding"
          >
            <option value="" selected>
              Frequency Hours
            </option>
            <option value="0">0</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
        </div>

        {/* new drop div */}
        <div className="row mb-3 input-shadow rounded-pill">
           <div className="col-lg-6">
              <input
                type="text"
                value={dos}
                onChange={(e) => setDos(e.target.value)}
                className="form-control input-padding rounded-pill py-2 border-0"
                placeholder="Dos : 10, 20..."
              />
            </div>
          <div className="col-lg-6">
            <select
              id="Select"
              onChange={(e) =>  setDosUnit(e.target.value)}
              className="form-select input-padding rounded-pill select-form-padding"
            >
              <option>unit</option>
              <option>mg</option>
              <option>ml</option>
              <option>pcs</option>
              <option>spoon</option>
            </select>
          </div>
        </div>

        {/* new div here */}
        <div className="row mb-3 input-shadow rounded-pill">
           <div className="col-lg-6">
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="form-control input-padding rounded-pill py-2 border-0"
                placeholder="Duration : 1, 2..."
              />
            </div>
          <div className="col-lg-6">
            <select
              id="Select"
              onChange={(e) =>  setDurationUnit(e.target.value)}
              className="form-select input-padding rounded-pill select-form-padding"
            >
              <option>unit</option>
              <option>day</option>
              <option>week</option>
              <option>month</option>
              <option>year</option>
            </select>
          </div>
        </div>

        {/* <div className="mb-3 input-shadow rounded-pill">
          <input
            type="text"
            onChange={(e) => setDoseValue(e.target.value)}
            value={doseValue}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Duration : 2 D,M,Y"
          />
        </div> */}

      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center border-0 pt-0">
        <Button
          type="button"
          onClick={(e) => handleSubmit(e)}
          className="border-0 text-capitalize add-button rounded add-button-padding font-16"
        >
          save
        </Button>
        <Button
          onClick={onHide}
          className="bg-danger border-0 text-capitalize rounded add-button-padding font-16"
        >
          cancel
        </Button>
        {/* </div> */}
      </Modal.Footer>
    </Modal>
  );
}

const TPuserInputModal = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant=""
        onClick={() => setModalShow(true)}
        className="add-button"
      >
        Add
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </>
  );
};

export default TPuserInputModal;
