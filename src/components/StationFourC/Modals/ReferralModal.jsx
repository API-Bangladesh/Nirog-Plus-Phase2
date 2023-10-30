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

  const [rId, setrId] = useState("");
  const [description, setDescription] = useState("");
  const [healthCenterName, setHealthCenterName] = useState("");
  const [healthCenterId, setHealthCenterId] = useState("");
  const [healthCenterCode, setHealthCenterCode] = useState("");
  const [status, setStatus] = useState("");

  const [referralList, setReferralList] = useState([]);
  const [healthCenterList, setHealthCenterList] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/referral-section`, {})
      .then((response) => {
        setReferralList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  // useEffect(() => {
  //   if (healthCenterCode) {
  //     axios
  //       .get(`${API_URL}/api/health-center`, {
  //         params: {
  //           keyword: healthCenterCode,
  //           limit: 5,
  //         },
  //       })
  //       .then((response) => {
  //         setHealthCenterList(response.data.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [healthCenterCode]);
  useEffect(() => {
    if (healthCenterName) {
      axios
        .get(`${API_URL}/api/health-center`, {
          params: {
            keyword: healthCenterName,
            // limit: 8,
          },
        })
        .then((response) => {
          setHealthCenterList(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [healthCenterName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let myFormData = { ...formData };
 
    if(rId === ''){
      setError1('  This field can not be empty!');
    }
    if(healthCenterCode === ''){
      setError2('  This field can not be empty!');
    }

    if(rId && healthCenterCode){
      myFormData.Referral.push({
        PatientId: PatientId,
        rId: rId,
        description,
        healthCenterName,
        healthCenterId: healthCenterId,
        Status: status,
        CreateUser: "nazmul",
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      });
  
      setFormData(myFormData);
      setrId("");
      setHealthCenterId("");
      setStatus("");
      setShowSuggestion("");
      setHealthCenterName("");
      setDescription("");
      setHealthCenterCode("");
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
      <Modal.Header className="modal-header" onClick={onHide}  closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-light font-18"
        >
          Referral Section
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 ">
        <div className="mb-3 input-shadow rounded-pill">
          <select
            id="Select"
            // className="form-select input-padding rounded-pill select-form-padding"
            className={`form-select input-padding rounded-pill select-form-padding ${error1 ? 'error-input' : ''}`}
            value={rId}
            onChange={(e) => {
              let getDescription = e.target.selectedOptions[0].getAttribute("Description");
              setDescription(getDescription);
              setError1("");
              setrId(e.target.value)}
            }
          >
            <option selected value="">
              Select Referral
            </option>
            {referralList?.map((item, key) => {
              return (
                <option key={key}
                description = {item.Description}
                value={item.RId}>
                {item.RCode}
                </option>
              );
            })}
          </select>
            {error1 && <p style={{ color: 'red' }}>{error1}</p>} 
        </div>

        <div className="mb-3 pb-0 m-0 input-shadow rounded-pill position-relative">
          <input
            type="text"
            value={healthCenterName}
            onChange={(e) => {
              setHealthCenterName(e.target.value);
              setShowSuggestion(true);
              setError2("");
            }}
            // className="form-control input-padding rounded-pill py-2 border-0"
            className={`form-control input-padding rounded-pill py-2 border-0 ${error2 ? 'error-input' : ''}`}
            placeholder="Health Center"
          />

          <ul className="autocompleteDataList">
            {showSuggestion && healthCenterList?.map((item, key) => {
              // console.log(item);
              return (
                <li
                  key={key}
                  healthCenterName = {item.HealthCenterName}
                  onClick={() => {
                    setHealthCenterId(item.HealthCenterId);
                    setHealthCenterCode(item.HealthCenterCode);
                    setHealthCenterName(item.HealthCenterName);
                    setHealthCenterList([]);
                    setShowSuggestion(false);
                  }}
                >
                  {item.HealthCenterName}
                </li>
              );
            })}
          </ul>
          {error2 && <p style={{ color: 'red' }}>{error2}</p>} 
        </div>

        <div className="mb-3 pb-0 m-0 input-shadow rounded-pill">
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-control input-padding rounded-pill py-2 border-0"
            placeholder="Status"
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
