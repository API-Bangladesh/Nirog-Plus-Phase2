import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
          Patient Data Edit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        {/* Patient data view  */}
        <PatientDataOnlyView />

      </Modal.Body>
    </Modal>
  );
}

const PatientDataEdit = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Button
        variant=""
        onClick={() => setModalShow(true)}
        className="button-dark font-13 border-0 text-white py-1 px-2 text-capitalize rounded"
      >
        Edit
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default PatientDataEdit;
