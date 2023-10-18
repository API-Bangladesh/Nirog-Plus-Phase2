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
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [investigationCode, setInvestigationCode] = useState("");
  const [investigationId, setInvestigationId] = useState("");
  const [otherInvestigation, setOtherInvestigation] = useState("");
  const [positiveNegativeStatus, setPositiveNegativeStatus] = useState("");
  const [instruction, setInstruction] = useState("");
  const [refLabInvestigationCodeList, setRefLabInvestigationCodeList] = useState([]);
  const [investigaion, setInvestigation] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    if (investigationCode) {
      axios
        .get(`${API_URL}/api/investigations`, {
          params: {
            keyword: investigationCode,
            limit: 20,
          },
        })
        .then((response) => {
          setRefLabInvestigationCodeList(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [investigationCode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let myFormData = { ...formData };
    if(investigationCode === ''){
      setError('  This field can not be empty!');
    }else{
      myFormData.LabInvestigation.push({
        PatientId: PatientId,
        investigationId: investigationId,
        investigaion,
        otherInvestigation: "",
        instruction: positiveNegativeStatus,
        positiveNegativeStatus: positiveNegativeStatus,
        Status: "A",
        CreateUser: "Mizanur Rahaman",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      });
  
      setFormData(myFormData);
  
      setInvestigationId("");
      setInvestigationCode("");
      // setOtherInvestigation("");
      setPositiveNegativeStatus("");
      setInstruction("");
      setInvestigation("");
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
          Lab Investigations
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 ">
        <div className="mb-3 pb-0 m-0 input-shadow rounded-pill">
          <input
            type="text"
            value={investigationCode}
            onChange={(e) => 
              {
                setInvestigationCode(e.target.value);
                setShowSuggestion(true);
                setError('');
              }}
            // className="form-control input-padding rounded-pill py-2 border-0"
            className={`form-control input-padding rounded-pill py-2 border-0 ${error ? 'error-input' : ''}`}
            placeholder="search"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>} 
          <ul className="autocompleteDataList">
            {showSuggestion && refLabInvestigationCodeList.map((item, key) => {
              return (
                <li
                  key={key}
                  onClick={() => {
                    setInvestigationId(item.RefLabInvestigationId);
                    setInvestigation(item.Investigation);
                    setInvestigationCode(item.RefLabInvestigationCode);
                    setRefLabInvestigationCodeList([]);
                    setShowSuggestion(false);
                  }}
                >
                  {item.RefLabInvestigationCode}
                </li>
              );
            })}
          </ul>
        </div>

        {/* <div className="mb-3 input-shadow rounded-pill">
          <select
            id="Select"
            value={otherInvestigation}
            onChange={(e) => setOtherInvestigation(e.target.value)}
            className="form-select input-padding rounded-pill select-form-padding"
          >
            <option selected value="">
              -- Select --
            </option>
            <option value="Complete Blood Count (CBC)">
              Complete Blood Count (CBC)
            </option>
            <option value="Lipid Profile">Lipid Profile</option>
            <option value="Liver Function Tests (LFTs)">
              Liver Function Tests (LFTs)
            </option>
            <option value="Kidney Function Tests (KFTs)">
              Kidney Function Tests (KFTs)
            </option>
            <option value="Electrolyte Panel">Electrolyte Panel</option>
            <option value="Thyroid Function Tests (TFTs)">
              Thyroid Function Tests (TFTs)
            </option>
            <option value="HbA1c (Glycated Hemoglobin)">
              HbA1c (Glycated Hemoglobin)
            </option>
            <option value="Coagulation Profile">Coagulation Profile</option>
            <option value="Urinalysis">Urinalysis</option>
            <option value="Stool Analysis">Stool Analysis</option>
            <option value="Serum Iron Studies">Serum Iron Studies</option>
            <option value="Vitamin D Levels">Vitamin D Levels</option>
            <option value="C-Reactive Protein (CRP)">
              C-Reactive Protein (CRP)
            </option>
            <option value="Rheumatoid Factor (RF)">
              Rheumatoid Factor (RF)
            </option>
            <option value="Antinuclear Antibody (ANA) Test">
              Antinuclear Antibody (ANA) Test
            </option>
            <option value="HIV Antibody Test">HIV Antibody Test</option>
            <option value="Hepatitis Panel (Hepatitis B and C)">
              Hepatitis Panel (Hepatitis B and C)
            </option>
            <option value="Pap Smear">Pap Smear</option>
            <option value="Prostate-Specific Antigen (PSA) Test">
              Prostate-Specific Antigen (PSA) Test
            </option>
            <option value="Serum Creatinine">Serum Creatinine</option>
            <option value="Chest X Ray">Chest X Ray</option>
            <option value="ECG">ECG</option>
          </select>
        </div> */}

        <div className="my-3 d-flex justify-content-center">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              onChange={(e) => setPositiveNegativeStatus(e.target.value)}
              value="Y"
              checked={"Y" === positiveNegativeStatus}
              onDoubleClick={() => setPositiveNegativeStatus("")}
            />
            <label
              className="form-check-label text-capitalize"
              htmlFor="inlineRadio1"
            >
              Positive
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="N"
              onChange={(e) => setPositiveNegativeStatus(e.target.value)}
              checked={"N" === positiveNegativeStatus}
              onDoubleClick={() => setPositiveNegativeStatus("")}
            />
            <label
              className="form-check-label text-capitalize"
              htmlFor="inlineRadio2"
            >
              Negative
            </label>
          </div>
        </div>
        <div className="mb-3 pb-0 m-0 input-shadow rounded-pill">
          <input
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Comments"
          />
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
