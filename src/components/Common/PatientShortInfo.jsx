import React from "react";
import { useSelector } from "react-redux";

function PatientShortInfo() {
  const { patient } = useSelector((state) => state.patients);
  const { height_weights, glucose_hbs, bps } = patient;
  // console.log(glucose_hbs);

  return (
    <ul>
      <li className="mb-1">
        <abbr className="me-2">Age:</abbr>
        <kbd className="me-2">{patient?.Age ? patient?.Age : "N/A"}</kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Height & Weight:</abbr>
        <kbd className="me-2">
          Height:{" "}
          {height_weights?.Height ? `${height_weights?.Height}cm` : "N/A"}
        </kbd>
        <kbd className="me-2">
          Weight:{" "}
          {height_weights?.Weight ? `${height_weights?.Weight}kg` : "N/A"}
        </kbd>
        <kbd className="me-2">
          BMI: {height_weights?.BMI ? `${height_weights?.BMI}` : "N/A"}
        </kbd>
        <kbd className="me-2">
          BMI Class:{" "}
          {height_weights?.BMIStatus ? `${height_weights?.BMIStatus}` : "N/A"}
        </kbd>
        <kbd className="me-2">
          MUAC: {height_weights?.MUAC ? `${height_weights?.MUAC}cm` : "N/A"}
        </kbd>
        <kbd className="me-2">
          MUAC Class:{" "}
          {height_weights?.MUACStatus ? `${height_weights?.MUACStatus}` : "N/A"}
        </kbd>
        <kbd className="me-2">
          Blood Group:{" "}
          {height_weights?.blood?.BloodGroupCode
            ? `${height_weights?.blood?.BloodGroupCode}`
            : "N/A"}
        </kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Temperature:</abbr>
        <kbd className="me-2">
          Body Temperature:{" "}
          {bps?.CurrentTemparature ? `${bps?.CurrentTemparature}℉` : "N/A"}
        </kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Pulse / HR:</abbr>
        <kbd className="me-2">
          Heart Rate: {bps?.HeartRate ? `${bps?.HeartRate}/min` : "N/A"}
        </kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Blood Pressure:</abbr>
        <kbd className="me-2">
          Systolic: {bps?.BPSystolic1 ? `${bps?.BPSystolic1}mmHg` : "N/A"}
        </kbd>
        <kbd className="me-2">
          Diastolic: {bps?.BPDiastolic1 ? `${bps?.BPDiastolic1}mmHg` : "N/A"}
        </kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Repeat BP (&gt; 140/90):</abbr>
        <kbd className="me-2">
          Systolic: {bps?.BPSystolic2 ? `${bps?.BPSystolic2}mmHg` : "N/A"}
        </kbd>
        <kbd className="me-2">
          Diastolic: {bps?.BPDiastolic2 ? `${bps?.BPDiastolic2}mmHg` : "N/A"}
        </kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Respiratory:</abbr>
        <kbd className="me-2">
          Respiratory Rate:{" "}
          {bps?.RespiratoryRate ? `${bps?.RespiratoryRate}/min` : "N/A"}
        </kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">SpO2</abbr>
        <kbd className="me-2">
          SpO2: {bps?.SpO2Rate ? `${bps?.SpO2Rate}%` : "N/A"}
        </kbd>
        <kbd className="me-2">
          SpO2 Rate:{" "}
          {bps?.IndicatesNormalOxygenSaturation
            ? `${bps?.IndicatesNormalOxygenSaturation}`
            : "N/A"}
        </kbd>
      </li>
      <li className="mb-1">
        <abbr className="me-2">Glucose & Hemoglobin:</abbr>
        <kbd className="me-2">
          RBG: {glucose_hbs?.RBG ? `${glucose_hbs?.RBG}mmol/L` : "N/A"}
        </kbd>
        {/* <kbd className="me-2">2 Hours After Breakfast</kbd> */}
        <kbd className="me-2">
          FBG:{glucose_hbs?.FBG ? `${glucose_hbs?.FBG}mmol/L` : "N/A"}
        </kbd>
        <kbd className="me-2">
          Hemoglobin:{" "}
          {glucose_hbs?.Hemoglobin ? `${glucose_hbs?.Hemoglobin}g/dl` : "N/A"}
        </kbd>
      </li>
    </ul>
  );
}

export default PatientShortInfo;
