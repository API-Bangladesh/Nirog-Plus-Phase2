import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import "./Prescription.css";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import DoubleButton from "./../Buttons/DoubleButton/DoubleButton";
import bloodpressure from "./../../assets/img/bloodpressure.png";
import Glucose from "./../../assets/img/GlucoseImage.jpg";
import Hemoglobin from "./../../assets/img/HemoglobinImage.png";
import { API_URL } from "../../helper/Constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getClassNameByValue,
  getClassNameForHB,
  getClassNameForBP,
} from "../../helper/lib";
import Flag from "../icons/Flag";

const Prescription = () => {
  const navigate = useNavigate();
  const { patient } = useSelector((state) => state.patients);
  // console.log(patient);
  const patientId = patient?.PatientId;

  const [prescriptionpreviewall, setPrescriptionpreviewalldata] = useState([]);
  // console.log(prescriptionpreviewall);

  useEffect(() => {
    prescriptionpreviewalldata();
  }, []);

  const prescriptionpreviewalldata = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/prescription-preview-all-data`,
        {
          params: {
            patientId: patientId,
          },
        }
      );
      setPrescriptionpreviewalldata(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching prescription preview data:", error);
    }
  };

  // console.log(prescriptionpreviewall.RxTaken);

  return (
    <>
      <SectionBanner
        title="Patient Health Status"
        patientName={`${patient?.GivenName + " " + patient?.FamilyName}`}
      />

      <section id="prescription">
        <div className="container bg-light py-5 px-5">
          <div className="patienStatus mb-4">
            <h3>Height and Weight</h3>
            {prescriptionpreviewall.HeightWeight?.map((item, index) => (
              <div key={index}>
                <span>{item.CreateDate} &gt;&gt;</span>
                {item.Height && <span>Height: {item.Height} cm</span>}
                {item.Weight && <span>Weight: {item.Weight} kg</span>}
                {item.BMI && (
                  <span>
                    BMI:{" "}
                    <span
                      className={getClassNameByValue("bmi", item.BMI).className}
                    >
                      {item.BMI} ({item.BMIStatus})
                      <Flag className="flag" />
                    </span>
                  </span>
                )}
                {item.MUAC && (
                  <span>
                    MUAC: {item.MUAC} ({item.MUACStatus})
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="patienStatus mb-4">
            <h3>BP, Temparature, HR</h3>
            {prescriptionpreviewall.BP?.map((item, index) => (
              <div key={index}>
                <span>{item.CreateDate} &gt;&gt;</span>
                {/* {item.Height && <span>Height: {item.Height} cm</span>} */}
                {/* {item.Weight && <span>Weight: {item.Weight} kg</span>} */}
                {item.BPSystolic1 && item.BPDiastolic1 && (
                  <span>
                    BP:{" "}
                    <span
                      className={
                        getClassNameForBP(item.BPSystolic1, item.BPDiastolic1)
                          .className
                      }
                    >
                      {item.BPSystolic1}/{item.BPDiastolic1}
                      <Flag className="flag" />
                    </span>
                  </span>
                )}
                {item.CurrentTemparature && (
                  <span>
                    Temparature:{" "}
                    <span
                      className={
                        getClassNameByValue("temp", item.CurrentTemparature)
                          .className
                      }
                    >
                      {item.CurrentTemparature}&deg;F
                      <Flag className="flag" />
                    </span>
                  </span>
                )}
                {item.HeartRate && (
                  <span>
                    Heart Rate:{" "}
                    <span
                      className={
                        getClassNameByValue("hr", item.HeartRate).className
                      }
                    >
                      {item.HeartRate}/min
                      <Flag className="flag" />
                    </span>
                  </span>
                )}
                {item.RespiratoryRate && (
                  <span>
                    Respiratory Rate:{" "}
                    <span
                      className={
                        getClassNameByValue("resp_rate", item.RespiratoryRate)
                          .className
                      }
                    >
                      {item.RespiratoryRate}/min
                      <Flag className="flag" />
                    </span>
                  </span>
                )}
                {item.SpO2Rate && (
                  <span>
                    SpO2 Rate:{" "}
                    <span
                      className={
                        getClassNameByValue("spo2", item.SpO2Rate).className
                      }
                    >
                      {item.SpO2Rate}/min
                      <Flag className="flag" />
                    </span>
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="patienStatus mb-4">
            <h3>GlucoseHb</h3>
            {prescriptionpreviewall.GlucoseHb?.map((item, index) => (
              <div key={index}>
                <span>{item.CreateDate} &gt;&gt;</span>
                <span>Hours From Last Eat: {item.HrsFromLastEat}</span>
                {item.Hemoglobin && (
                  <span>
                    Hemoglobin:{" "}
                    <span
                      className={
                        getClassNameForHB(patient.GenderId, item.Hemoglobin)
                          .className
                      }
                    >
                      {item.Hemoglobin} gm/dl
                      <Flag className="flag" />
                    </span>
                  </span>
                )}

                {item.FBG && (
                  <span>
                    FBG:{" "}
                    <span
                      className={getClassNameByValue("fbs", item.FBG).className}
                    >
                      {item.FBG} mmol/L
                      <Flag className="flag" />
                    </span>
                  </span>
                )}

                {item.RBG && (
                  <span>
                    RBG:{" "}
                    <span
                      className={getClassNameByValue("rbs", item.RBG).className}
                    >
                      {item.RBG} mmol/L
                      <Flag className="flag" />
                    </span>
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* <div className="patienStatus mb-4">
            <h3>GlucoseHb</h3>
            {prescriptionpreviewall.GlucoseHb?.map((item, index) => (
              <div key={index}>
                <span>Random Blood Glucose: {item.RBG}</span>
                <span>Fasting Blood Glucose: {item.FBG}</span>
                <span>Hemoglobin: {item.Hemoglobin}</span>
                <span>Hours From Last Eat: {item.HrsFromLastEat}</span>
                <span>Create Date: {item.CreateDate}</span>
              </div>
            ))}
          </div> */}

          {/* <div className="patienStatus mb-4">
            <h3>Hemoglobin</h3>
            <span>When Did You Last Eat?: 2.0 hours</span>
            <span>RBG: 9.5 mMol</span>
            <span>FBG: 0.0 mMol</span>
            <span>Hemoglobin: 11.0 g/dl</span>
          </div>  */}
          <div className="patienStatus mb-4">
            <h3>Chief Complaints</h3>
            {prescriptionpreviewall.Complaints?.map((item, index) => (
              <div key={index}>
                <span>
                  {item.CreateDate}: {item.ChiefComplain}
                </span>
              </div>
            ))}
          </div>

          <div className="patienStatus mb-4">
            <h3>Physical Findings</h3>
            {prescriptionpreviewall.PhysicalFindings?.map((item, index) => (
              <div key={index}>
                <span>
                  {item.CreateDate}: {item.PhysicalFinding}
                </span>
              </div>
            ))}
          </div>

          <div className="patienStatus mb-4">
            <h3>Patient H/O Present Illness</h3>
            {prescriptionpreviewall.PatientPresentllness?.map((item, index) => {
              if (item.Illness_status === "yes") {
                return (
                  <div key={index}>
                    <span>{item.CreateDate} &gt;&gt;</span>
                    {item.IllnessCode}
                  </div>
                );
              }
            })}
          </div>

          <div className="patienStatus mb-4">
            <h3>Patient H/O Past Illness</h3>
            {prescriptionpreviewall.PatientPastllness?.map((item, index) => {
              if (item.Illness_status === "yes") {
                return (
                  <div key={index}>
                    <span>{item.CreateDate} &gt;&gt;</span>
                    {item.IllnessCode}
                  </div>
                );
              }
            })}
          </div>

          <div className="patienStatus mb-4">
            <h3>Patient H/O Family Illness</h3>
            {prescriptionpreviewall.PatientFamilyllness?.map((item, index) => {
              if (item.family_status === "yes") {
                return (
                  <div key={index}>
                    <span>{item.CreateDate} &gt;&gt;</span>
                    {item.IllnessCode}
                  </div>
                );
              }
            })}
          </div>

          <div className="patienStatus mb-4">
            <h3>Patient Social Behavior</h3>
            {prescriptionpreviewall.PatientSocialBehavior?.map(
              (item, index) => {
                if (item.family_status === "Yes") {
                  return (
                    <div key={index}>
                      <span>{item.CreateDate} &gt;&gt;</span>
                      {item.SocialBehaviorCode}
                    </div>
                  );
                }
              }
            )}
          </div>

          <div className="patienStatus mb-4">
            <h3>Vaccination</h3>
            {prescriptionpreviewall.PatientVaccine?.map((item, index) => (
              <div key={index}>
                <span>{item.CreateDate} &gt;&gt;</span>
                Vaccine: {item.VaccineCode}, Other Vaccine: {item.OtherVaccine},
                Type: {item.Vaccine_status_type}
              </div>
            ))}
          </div>

          <div className="patienStatus mb-4">
            <h3>Child Mortality</h3>
            {prescriptionpreviewall.ChildMortality?.map((item, index) => (
              <div key={index}>
                <span>{item.CreateDate} &gt;&gt;</span>
                0-1: {item.ChildMortality0To1 ? item.ChildMortality0To1 : "N/A"}
                , Below 5:{" "}
                {item.ChildMortalityBelow5 ? item.ChildMortalityBelow5 : "N/A"},
                Over 5:{" "}
                {item.ChildMortalityOver5 ? item.ChildMortalityOver5 : "N/A"},
              </div>
            ))}
          </div>

          <div className="patienStatus mb-4">
            <h3>Menstrual History</h3>
            {prescriptionpreviewall.MenstrualHistory?.map((item, index) => (
              <div key={index}>
                <span>{item.CreateDate} &gt;&gt;</span>
                <span>
                  Product Usage:{" "}
                  {item.MenstruationProductCode
                    ? `${item.MenstruationProductCode} (${item.MenstruationProductUsageTimeCode})`
                    : "N/A"}
                </span>
                {item.Comment && <span>Comment: {item.Comment}</span>}
              </div>
            ))}
          </div>

          {/* <div className="patienStatus mb-4">
            <h3>General Examination</h3>
            <div className="d-flex">
              <div className="d-flex align-items-center border-bottom border-secondary py-1 me-4">
                <p className="font-16 mb-0">Anemia</p>
                <p className="text-center  mb-0">
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                </p>
              </div>
              <div className="d-flex align-items-center border-bottom border-secondary py-1 me-4">
                <p className="font-16 mb-0">Jaundice</p>
                <p className="text-center  mb-0">
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                </p>
              </div>
              <div className="d-flex align-items-center border-bottom border-secondary py-1 me-4">
                <p className="font-16 mb-0">Cyanosis</p>
                <p className="text-center  mb-0">
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                </p>
              </div>
              <div className="d-flex align-items-center border-bottom border-secondary py-1 me-4">
                <p className="font-16 mb-0">Edema</p>
                <p className="text-center  mb-0">
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                  <strong className="label">
                    <GoPlus className="font-18 ms-1" />
                  </strong>
                </p>
              </div>
            </div>
          </div> */}

          <div className="patienStatus mb-4">
            <h3>General Findings</h3>
            {prescriptionpreviewall.GeneralFindings?.map((item, index) => (
              <div key={index} className="mb-2">
                <span>{item.CreateDate} &gt;&gt;</span>
                <span>Anemia Severity: {item.AnemiaSeverity}</span>
                <span>Jaundice Severity: {item.JaundiceSeverity}</span>
                <span>Edema Severity: {item.EdemaSeverity}</span>
                <span>
                  Lymph Nodes With Palpable: {item.LymphNodesWithPalpable}
                </span>
                <span>
                  Lymph Nodes With Palpable Site:{" "}
                  {item.LymphNodesWithPalpableSite}
                </span>
                <span>
                  Lymph Nodes With Palpable Size:{" "}
                  {item.LymphNodesWithPalpableSize}
                </span>
                <span>Heart With NAD: {item.HeartWithNAD}</span>
                <span>Lungs With NAD: {item.LungsWithNAD}</span>
                <span>Other Symptom: {item.OtherSymptom}</span>
                <span>Cyanosis: {item.Cyanosis}</span>
              </div>
            ))}
          </div>

          <div className="patienStatus mb-4">
            <h3>Obstetrics Information</h3>
            {prescriptionpreviewall.Obstetrics?.map((item, index) => (
              <div key={index} className="mb-2">
                <span>{item.CreateDate} &gt;&gt;</span>
                <span>Gravida: {item.Gravida}</span>
                <span>Living Birth: {item.LivingBirth}</span>
                <span>Living Female: {item.LivingFemale}</span>
                <span>Living Male: {item.LivingMale}</span>
                <span>MR: {item.MR}</span>
                <span>Miscarraige Or Abortion: {item.MiscarraigeOrAbortion}</span>
                <span>Para: {item.Para}</span>
                <span>Still Birth: {item.StillBirth}</span>
              </div>
            ))}
          </div>

          <div className="patienStatus mb-4">
            <h3>Current Medication Taken</h3>
            {prescriptionpreviewall.RxTaken?.map((item, index) => (
              <div key={index}>
                <span>{item.CreateDate} &gt;&gt;</span>
                <span>
                  Drug:{" "}
                  {item.Rx === "Others" ? <>{item?.Status}</> : <>{item.Rx}</>}
                </span>
                {item.AllergyToMedication == 1 ? (
                  <span className="red text-decoration-none px-2">
                    Allergic to medication
                  </span>
                ) : (
                  ""
                )}
                <span>Frequency: {item.FrequencyHour}</span>
                <span>
                  <span>Dose: {item.Dose}</span>
                  Duration: &nbsp;
                  {item.RxDurationValue.includes("d") ||
                  item.RxDurationValue.includes("D")
                    ? item.RxDurationValue.replace(/d/i, " Day(s)")
                    : item.RxDurationValue.includes("m") ||
                      item.RxDurationValue.includes("M")
                    ? item.RxDurationValue.replace(/m/i, " Month(s)")
                    : item.RxDurationValue.includes("y") ||
                      item.RxDurationValue.includes("Y")
                    ? item.RxDurationValue.replace(/y/i, " Year(s)")
                    : item.RxDurationValue.includes("c") ||
                      item.RxDurationValue.includes("C")
                    ? item.RxDurationValue.replace(/c/i, " Continious")
                    : ""}
                </span>
              </div>
            ))}
          </div>

          {/* <div className="patienStatus mb-4">
            <h3>Current Medication Taken</h3>
            <span>Drug: Napa Extra</span>
            <span className="bg-danger text-decoration-none px-2">
              Allergy to medication
            </span>
            <span>Frequency Hours: 4</span>
            <span>Dos: 10mg</span>
            <span>Duration: 7 Days</span>
          </div> */}
        </div>

        <div className="text-center mt-4">
          {/* <DoubleButton
            btnone="Back"
            btntwo="Submit"
            link="/four-c-userinput"
            link2="/final-prescription"
          /> */}
          <button
            className="border-0 button-color text-white py-2 px-3 text-capitalize rounded me-3"
            onClick={() => navigate(-1)}
          >
            {" "}
            Back{" "}
          </button>
        </div>
      </section>

      <GlobalButton />
    </>
  );
};

export default Prescription;
