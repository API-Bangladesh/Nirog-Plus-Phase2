import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../FourCuserInput.css";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { useSelector } from "react-redux";

function MyVerticallyCenteredModal({ show, onHide, formData, setFormData }) {
  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState("");
  const [otherProvisionalDiagnosis, setOtherProvisionalDiagnosis] = useState("");
  const [diagnosisStatus, setDiagnosisStatus] = useState("");
  const [provisionalDiagnosisList, setprovisionalDiagnosisList] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/provisional-diagonisis`, {
        params: {
          keyword: provisionalDiagnosis,
          limit: 20,
        },
      })
      .then((response) => {
        setprovisionalDiagnosisList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [provisionalDiagnosis]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let myFormData = { ...formData };

    if(provisionalDiagnosis === ''){
      setError('This field can not be empty!');
    }else{
      myFormData.ProvisionalDiagnosis.push({
        PatientId: PatientId,
        RefProvisionalDiagnosisId: "40391CDF-F43C-4A23-9CF2-000061D61331",
        category: "Loram Ipsam",
        provisionalDiagnosis: provisionalDiagnosis,
        otherProvisionalDiagnosis: otherProvisionalDiagnosis,
        diagnosisStatus: diagnosisStatus,
        Status: "A",
        CreateUser: "Maruf",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      });
  
      setFormData(myFormData);
      setProvisionalDiagnosis("");
      setOtherProvisionalDiagnosis("");
      setDiagnosisStatus("");
      onHide();
    }
  };

  const handleInputChange = (event) => {
    setDiagnosisStatus(event.target.value);
  };

  const handleDoubleClick = () => {
    setDiagnosisStatus("");
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
          Provitional Diagnosis
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3">
        <div className="mb-3 pb-0 m-0 input-shadow rounded-pill position-relative">
          <input
            type="text"
            value={provisionalDiagnosis}
            onChange={(e) => {
              setProvisionalDiagnosis(e.target.value);
              setShowSuggestion(true);
              setError('');
            }}
            // className="form-control input-padding rounded-pill py-2 border-0"
            className={`form-control input-padding rounded-pill py-2 border-0 ${error ? 'error-input' : ''}`}
            placeholder="Search (code/commen terms )"
            list="browsers"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>} 
          <ul className="autocompleteDataList">
          {showSuggestion && provisionalDiagnosisList.map((item, key) => {
              return (
                <li
                  key={key}
                  onClick={() => {
                    setShowSuggestion(false);
                    //I had to check only code or name?
                    setProvisionalDiagnosis(`${item.ProvisionalDiagnosisName}`);
                  }}
                >
                  {item.ProvisionalDiagnosisName}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-3 pb-0 m-0 input-shadow rounded-pill">
          <input
            type="text"
            value={otherProvisionalDiagnosis}
            onChange={(e) => setOtherProvisionalDiagnosis(e.target.value)}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Disease"
          />
        </div>

        <div className="d-flex justify-content-center">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="N"
              checked={"N" === diagnosisStatus}
              onDoubleClick={() => setDiagnosisStatus("")}
              onChange={(e) => setDiagnosisStatus(e.target.value)}
            />

            <label
              className="form-check-label text-capitalize"
              htmlFor="inlineRadio1"
            >
              Presumptive
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="Y"
              checked={"Y" === diagnosisStatus}
              onDoubleClick={() => setDiagnosisStatus("")}
              onChange={(e) => setDiagnosisStatus(e.target.value)}
            />
            <label
              className="form-check-label text-capitalize"
              htmlFor="inlineRadio2"
            >
              Confirmed
            </label>
          </div>
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
