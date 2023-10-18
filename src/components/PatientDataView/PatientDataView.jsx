import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// import PatientReg from "./../PatientReg/PatientReg";
import PatientDataOnlyView from "./../PatientDataOnlyView/PatientDataOnlyView";
import "./PatientDataView.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
           Patient Data View
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* Patient data view  */}
        <PatientDataOnlyView/>
       
      </Modal.Body>
    </Modal>
  );
}

const PatientDataView = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Button
        variant=""
        onClick={() => setModalShow(true)}
        className="button-dark font-13 border-0 text-white py-1 px-2 me-2 text-capitalize rounded"
      >
        View
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default PatientDataView;
