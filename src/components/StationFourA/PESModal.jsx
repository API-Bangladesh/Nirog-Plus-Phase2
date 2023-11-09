import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./TPuserInput.css";
import { useSelector } from "react-redux";

function MyVerticallyCenteredModal({ show, onHide, formData, setFormData }) {
  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);
  const [physicalFinding, setPhysicalFinding] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let myFormData = { ...formData };
    if (physicalFinding === "") {
      setError(" This field can not be empty!");
    } else {
      myFormData.SystemicExamination.push({
        PatientId: PatientId,
        physicalFinding: physicalFinding,
        Status: status,
        CreateUser: "Nazmul",
        UpdateUser: "Nazmul1",
        OrgId: OrgId,
      });
      setFormData(myFormData);
      setPhysicalFinding("");
      setStatus("");
      onHide();
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
          Systemic Examination
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3">
        <div className="mb-3 shadowme">
          {/* <label htmlFor="bmi" className="form-label text-capitalize">BMI class</label> */}
          <div className="mb-3 rounded">
            <select
              id="Select"
              value={physicalFinding}
              onChange={(e) => {
                setPhysicalFinding(e.target.value);
                setError("");
              }}
              // className="form-select inputBox rounded-pill"
              className={`form-select inputBox rounded-pill ${
                error ? "error-input" : ""
              }`}
            >
              <option selected value="">
                -- Select --
              </option>
              <option value="Cardiovascular System">
                Cardiovascular System
              </option>
              <option value="Respiratory System">Respiratory System</option>
              <option value="Nervous System">Nervous System</option>
              <option value="Abdominal">Abdominal</option>
              <option value="Musculoskeletal">Musculoskeletal</option>
            </select>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
        <div className="m-0 input-shadow rounded-pill">
          <input
            className="form-control shadowme input-padding rounded-pill py-2 border-0"
            type="text"
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Enter Status"
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center border-0 pt-0">
        {/* <div > */}
        <Button
          type="button"
          onClick={(e) => handleSubmit(e)}
          className="border-0 text-capitalize add-button rounded add-button-padding font-16"
        >
          Save
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
