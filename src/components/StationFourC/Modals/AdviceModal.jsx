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

  const [adviceId, setAdviceId] = useState("");
  const [adviceText, setAdviceText] = useState("");
  const [advice, setAdvice] = useState("");
  const [status, setStatus] = useState("");

  const [adviceList, setAdviceList] = useState([]);
  const [error, setError] = useState('');
  const [showField, setShowField] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/advice-data`, {})
      .then((response) => {
        setAdviceList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(adviceText === ''){
      setError('This field can not be empty!');
    }

    let myFormData = { ...formData };

    if(adviceText){
      myFormData.Advice.push({
        PatientId: PatientId,
        adviceId: adviceId,
        adviceText: adviceText,
        advice: advice,
        Status: status,
        CreateUser: "nazmul",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      });
  
      setFormData(myFormData);
      setAdviceId("");
      setAdvice("");
      setStatus("");
      onHide();
      setAdviceText("");
      setShowField(false);
      // console.log(myFormData.Advice);
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
          Add Advice
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 ">
        <form action="">
          <div className="mb-3 pb-0 m-0 input-shadow rounded-pill">
            <select
              id="Select"
              value={adviceId}
              onChange={(e) => {
                let getAdviceText =
                  e.target.selectedOptions[0].getAttribute("AdviceText");
                setAdviceId(e.target.value);
                setAdviceText(getAdviceText);
                setError('');
                if(getAdviceText == "AD5"){
                  console.log(getAdviceText);
                  setShowField(true);
                }
              }}
              // className="form-select input-padding rounded-pill select-form-padding"
              className={`form-select input-padding rounded-pill select-form-padding ${error ? 'error-input' : ""}`}
            >
              <option selected value="">
                Select Advice Code
              </option>
              {adviceList?.map((item, key) => {
                return (
                  <option
                  key={key}
                  AdviceText={item.AdviceCode}
                  value={item.AdviceId}
                  >
                    <span> {item.AdviceInBangla} </span>
                  </option>
                );
              })}
            </select>
              {error && <p style={{ color: 'red' }}>{error}</p>} 
          </div>

          <div className="mb-3 input-shadow rounded-pill">
            <select
              id="Select"
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              className="form-select input-padding rounded-pill select-form-padding"
            >
              <option selected value="">
                Select Advice
              </option>
              <option value="General Health Advice">
                General Health Advice
              </option>
              <option value="Preventive Care Advice">
                Preventive Care Advice
              </option>
              <option value="Chronic Disease Management Advice">
                Chronic Disease Management Advice
              </option>
              <option value="Medication Advice">Medication Advice</option>
              <option value="Lifestyle Modification Advice">
                Lifestyle Modification Advice
              </option>
              <option value="Mental Health Advice">Mental Health Advice</option>
              <option value="Pregnancy and Parenting Advice">
                Pregnancy and Parenting Advice
              </option>
            </select>
          </div>
            
          {
            showField ?
            <div className="mb-3 pb-0 m-0 input-shadow rounded-pill">
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-control input-padding rounded-pill py-2 border-0"
              placeholder="Add advice"
            />
            </div>
            :
            ""
          }
        </form>
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
