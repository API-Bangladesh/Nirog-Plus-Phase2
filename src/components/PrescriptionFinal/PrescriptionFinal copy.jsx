import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PrescriptionFinal.css";
import ApiLogo from "../../assets/img/apilogo.png";
import GlobalButton from "./../GlobalBtn/GlobalButton";
import Signature from "../../assets/img/signature.png";
import {
  BsFileEarmarkPdfFill,
  BsImages,
  BsFillPrinterFill,
} from "react-icons/bs";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { API_URL } from "../../helper/Constants";
import { useSelector } from "react-redux";

const PrescriptionFinal = () => {
  const { patient } = useSelector((state) => state.patients);
  const patientId = patient?.PatientId;

  // Declare State
  const [patientInfo, setPatientInfo] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [heightWeight, setHeightWeight] = useState([]);
  const [bp, setBp] = useState([]);
  const [glucoseHb, setGlucoseHb] = useState([]);
  const [provisionalDX, setProvisionalDX] = useState([]);
  const [labInvestigation, setLabInvestigation] = useState([]);
  const [rxDetail, setRxDetail] = useState([]);
  const [advice, setAdvice] = useState([]);
  const [referral, setReferral] = useState([]);
  const [followUpDate, setFollowUpDate] = useState([]);

  // store data
  const patientInfos = patientInfo;
  const prescriptions = prescription;
  const chiefComplaints = complaints;
  const heightWeights = heightWeight;
  const bps = bp;
  const glucoseHbs = glucoseHb;
  const provisionalDXs = provisionalDX;
  const labInvestigations = labInvestigation;
  const rxDetails = rxDetail;
  const advices = advice;
  const referrals = referral;
  const followUpDates = followUpDate;
  //console.log(prescriptions);

  // Get the desired patient data
  // const patient = { patientId: "C52C9718-8B90-4B44-9267-000011CE53A6" };

  useEffect(() => {
    axios
      .post(`${API_URL}/api/prescription`, {
        patientId: patientId,
      })
      .then((response) => {
        setPatientInfo(response.data.PatientDetails);
        setPrescription(response.data.prescriptionCreation);
        setComplaints(response.data.Complaints);
        setHeightWeight(response.data.HeightWeight);
        setBp(response.data.BP);
        setGlucoseHb(response.data.GlucoseHb);
        setProvisionalDX(response.data.ProvisionalDx);
        setLabInvestigation(response.data.Investigation);
        setRxDetail(response.data.Treatment);
        setAdvice(response.data.Advice);
        setReferral(response.data.PatientReferral);
        setFollowUpDate(response.data.FollowUpDate);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // empty dependency array to run the effect only once

  return (
    <>
      <section id="prescriptionFinal">
        <div className="container px-4">
          <header className="header">
            <p className="mb-0 pt-2 fs-">
              <b>Location :</b> Ukhia Upazila
            </p>
            <h4 className="mb-0 p-3 text-center">
              Prescription {`${patient?.PatientCode}`}
            </h4>
          </header>

          {patientInfos.map((item, index) => (
            <div
              key={index}
              className="topHead border border-start-0 border-end-0 py-2"
            >
              <span className="me-3">
                <b>Name :</b> {item.GivenName} {item.FamilyName}
              </span>
              <span className="me-3">
                <b>Age :</b> {parseInt(item.Age)}
              </span>
              <span className="me-3">
                <b>Gender :</b> {item.gender.GenderCode}
              </span>
              <span className="me-3">
                <b>Date :</b> {prescriptions[0]?.CreateDate}
              </span>
            </div>
          ))}



          <div className="d-flex">
            <div className="leftBar py-3">
              <div className="textItem">
                <h6 className="testTitle">
                  <b>Complaints</b>
                </h6>
                {chiefComplaints.map((item, index) => (
                  <div key={index}>
                    {item.CreateDate}:{item.ChiefComplain} for{" "}
                    {item.CCDurationValue} {item.DurationInEnglish}
                  </div>
                ))}
              </div>
              <div className="textItem mt-4">
                <h6 className="testTitle">
                  <b>O/S</b>
                </h6>
                {heightWeights.map((item, index) => (
                  <div key={index}>
                    <p>Height: {item.Height} cm</p>
                    <p>Weight: {item.Weight} kg</p>
                    <p>BMI: {item.BMI}</p>
                  </div>
                ))}

                {bps.map((item, index) => (
                  <div key={index}>
                    <p>Pulse: {item.HeartRate}</p>
                    <p>
                      Blood Pressure: {item.BPSystolic1} / {item.BPDiastolic1}{" "}
                      mmHg
                    </p>
                  </div>
                ))}
                {glucoseHbs.map((item, index) => (
                  <div key={index}>
                    <p>RBS: {item.RBG} mMol</p>
                    <p>FBS: {item.FBG} mMol</p>
                    <p>Hemoglobin: {item.Hemoglobin} g/dL </p>
                  </div>
                ))}
              </div>



              <div className="textItem mt-4">
                <h6 className="testTitle">
                  <b>Provisional Dx</b>
                </h6>
                {/* <b>Date: {provisionalDXs[0].CreateDate}</b> */}

                {provisionalDXs.map((item, index) => (
                  <div key={index}>
                    <b>Date: {item.CreateDate}</b>
                    <p>
                      {index + 1}:{" "}
                      {item.ProvisionalDiagnosis != ""
                        ? item.ProvisionalDiagnosis
                        : item.OtherProvisionalDiagnosis}{" "}
                      {item.DiagnosisStatus == "P"
                        ? "[Presumptive]"
                        : item.DiagnosisStatus == "C"
                        ? "[Confirmed]"
                        : "[Unspecified]"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="textItem mt-4">
                <h6 className="testTitle">
                  <b>Lab Invenstigations</b>
                </h6>
                {labInvestigations.map((item, index) => (
                  <div key={index}>
                    <b>Date: {item.CreateDate}</b>
                    <p>
                      {index + 1}:{" "}
                      {item.Investigation != ""
                        ? item.Investigation
                        : item.OtherInvestigation}{" "}
                      <br></br>
                      {/* {item.OtherInvestigation != ""
                      ? item.OtherInvestigation
                      : ""} */}
                    </p>
                  </div>
                ))}
              </div>
            </div>


            <div className="rightBar py-3 px-4">
              <h2 className="rx">&#8478;</h2>
              {rxDetails.map((item, index) => (
                <div key={index}>
                  <p>
                    <b>{index + 1}</b>:&nbsp; {item.Description}
                    <br></br>
                    {item.Frequency} &nbsp; {item.InstructionInBangla} &nbsp; -
                    &nbsp;
                    {item.DrugDurationValue.includes("d") ||
                    item.DrugDurationValue.includes("D")
                      ? item.DrugDurationValue.replace(/d/i, " দিন")
                      : item.DrugDurationValue.includes("m") ||
                        item.DrugDurationValue.includes("M")
                      ? item.DrugDurationValue.replace(/m/i, " মাস")
                      : item.DrugDurationValue.includes("y") ||
                        item.DrugDurationValue.includes("Y")
                      ? item.DrugDurationValue.replace(/y/i, " বছর")
                      : item.DrugDurationValue.includes("c") ||
                        item.DrugDurationValue.includes("C")
                      ? item.DrugDurationValue.replace(/c/i, " চলবে")
                      : ""}
                  </p>
                </div>
              ))}

              <br />
              <br />
              <br />
              <p>
                <b>Follow-up / পরবর্তী সাক্ষাৎ</b>
                {followUpDates.map((item, index) => (
                  <div key={index}>
                    <p>
                      <b>{index + 1}</b>:&nbsp;{item.FollowUpDate}:{" "}
                      {item.Comment}
                    </p>
                  </div>
                ))}
              </p>

              
              <p className="mb-5">
                <b>Advice / পরামর্শ</b>
                {advices.map((item, index) => (
                  <div key={index}>
                    <p>
                      <b>{index + 1}</b>:&nbsp; {item.AdviceInBangla}
                    </p>
                  </div>
                ))}
              </p>
              <p className="mb-5">
                <b>Referral / রেফারেল</b>

                {referrals.map((item, index) => (
                  <div key={index}>
                    <p>
                      <b>{index + 1}</b>:&nbsp;{item.CreateDate}:{" "}
                      {item.Description}, {item.HealthCenterName}
                    </p>
                  </div>
                ))}
              </p>
            </div>
          </div>

          
          <div className="bottom">
            <div className="row">
              <div className="col-lg-6">
                <address className="mb-0 py-3">
                  <p className="fs mb-0 pb-0">
                    Haefa USA
                    <br /> 311 Bedford St, Lexington MA 07420, USA <br />
                    Email: healthonwheels.usa@gmail.com <br /> Website:
                    www.healthonwheels.usa.org
                  </p>
                </address>
              </div>
              <div className="col-lg-6">
                <address className="d-flex align-items-end flex-column mb-0 py-3">
                  <div className="dev position-relative">
                    <p className="mb-0 fs">
                      Haefa Bangladesh
                      <br /> House: 31, Road: 16 Sector: 13 Uttara
                      <br /> Email: healthonwheels.usa@gmail.com
                      <br />
                      Website: www.healthonwheels.usa.org
                    </p>

                    <div className="signatureBox">
                      <img
                        src={Signature}
                        alt="img"
                        className="signatureImage"
                      />
                      <p className="mb-0">Jiaur Rahman</p>
                      <i className="my-0">MBBS, MPH, MS(Orthopedics)</i>
                    </div>
                  </div>
                </address>
              </div>
            </div>
          </div>

          <p className="mb-0 fs text-center pb-4">
            Powered By: <img src={ApiLogo} alt="img" className="apiLogo" />
          </p>
        </div>
      </section>

      <div className="export container bg-light mt-3 p-3 d-flex justify-content-end">
        {/* <div className="prinBtns2">
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Instructions</Tooltip>} >
              <Button className="me-2  bg-dark border-0">
                <BsFileEarmarkPdfFill />
              </Button>
            </OverlayTrigger>
        </div> */}

        <div className="prinBtns">
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Print</Tooltip>}
          >
            <Button className="me-2 border-0">
              <BsFillPrinterFill />
            </Button>
          </OverlayTrigger>

          {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Download pdf</Tooltip>} >
              <Button className="me-2 border-0">
                <BsFileEarmarkPdfFill />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Download Image</Tooltip>} >
              <Button className="me-2 border-0">
                <BsImages />
              </Button>
            </OverlayTrigger> */}
        </div>
      </div>
      <GlobalButton />
    </>
  );
};

export default PrescriptionFinal;
