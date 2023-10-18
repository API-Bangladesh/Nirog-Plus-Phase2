import React, { useEffect, useState } from "react";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import SectionTitle from "../SectionTitleDemo/SectionTitle";
import "./StationCardiovascular.css";
import StationButton from "../Buttons/StationButton/StationButton";
import { AiFillCaretLeft } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { API_URL } from "../../helper/Constants";
import { useSelector } from 'react-redux';

const StationCardiovascular = () => {
  const {patient} = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [BMI, setBMI] = useState("");
  const [smoker, setSmoker] = useState("");
  const [smokerValue, setSmokerValue] = useState("");
  const [systolic, setSystolic] = useState("");
  const [bpMedication, setBpMedication] = useState("");
  const [bpMedicationValue, setBpMedicationValue] = useState("");
  const [diabetes, setDiabetes] = useState("");
  const [diabetesValue, setDiabetesValue] = useState("");
  const [cra, setCra] = useState("");
  useEffect(() => {
    let result;
    if (smoker == "Yes") {
      result = 0.65451;
    } else {
      result = 0;
    }
    setSmokerValue(result);
  }, [smoker]);

  useEffect(() => {
    let result;
    if (diabetes == "Absent") {
      result = 0;
    } else if (diabetes == "Present") {
      result = 0.57367;
    } else {
      result = 0;
    }
    setDiabetesValue(result);
  }, [diabetes]);

  useEffect(() => {
    let result;
    if (bpMedication == "Yes") {
      result = 1.99881;
    } else if (bpMedication == "No") {
      result = 1.93303;
    } else {
      result = 0;
    }
    setBpMedicationValue(result);
  }, [bpMedication]);

  useEffect(() => {
    if (age && smoker && systolic && bpMedication && diabetes) {
      let riskFactor =
        Math.log(age) * 3.06117 +
        Math.log(systolic) * bpMedicationValue +
        smokerValue +
        diabetesValue -
        23.9802;
      let risk = (100 * (1 - 0.88936 ** Math.exp(riskFactor))).toFixed(2);

      setCra(risk);
    }
  }, [age, diabetes, bpMedication, smoker, systolic]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a data object with the form input values
    const data = {
      PatientId,
      Age: age,
      Sex: sex,
      BMI: BMI,
      CigaretteSmoker: smoker,
      SystolicBloodPressure: systolic,
      OnBloodPressureMedication: bpMedication,
      Diabetese: diabetes,
      Result: cra,
      CRAType: "Non Lab",
      CreateUser: "Mihal",
      OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
    };
    axios
      .post(`${API_URL}/api/cra-non-lab-create`, data)
    
      .then((response) => {
        // Handle the response from the API if needed
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        }).then(function () {
          window.location = "cardiovascular-risk-lab";
        });
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the API request
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred.",
        });
        
      });
  };

  return (
    <>
      <section>
        <SectionBanner title="Station 4D - (cardiovascular risk - Non Lab based)" />
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <SectionTitle title="CRA" />
                {/* age */}
                <div className="mb-3">
                  <label htmlFor="Page" className="form-label text-capitalize">
                    Age
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="74"
                    name="age"
                    id="age"
                    value={age}
                    onChange={(event) => {
                      setAge(event.target.value);
                    }}
                    className="form-control form-radious inputBox"
                    placeholder="Between : 40-74"
                  />
                </div>

                {/* Sex */}
                <div className="mb-3">
                  <label htmlFor="PAge" className="form-label text-capitalize">
                    Sex
                  </label>
                  <select
                    id="Select"
                    className="form-select inputBox"
                    onChange={(event) => {
                      setSex(event.target.value);
                    }}
                  >
                    <option>-- Select --</option>
                    <option> Male </option>
                    <option> Female </option>
                    <option> Others </option>
                  </select>
                </div>

                {/* BMI */}
                <div className="mb-3">
                  <label htmlFor="PAge" className="form-label text-capitalize">
                    BMI
                  </label>
                  <select
                    id="Select"
                    className="form-select inputBox"
                    onChange={(event) => {
                      setBMI(event.target.value);
                    }}
                  >
                    <option>-- Select --</option>
                    <option>{"<"} 20 kg/m2 </option>
                    <option> 20-24 kg/m2</option>
                    <option> 25-29 kg/m2</option>
                    <option> 30-35 kg/m2</option>
                    <option> 30-35 kg/m2</option>
                    <option>{"≥"} 35 kg/m2</option>
                  </select>
                </div>
                {/* Cigarette smoker */}
                <div className="mb-3">
                  <label htmlFor="PAge" className="form-label text-capitalize">
                    Cigarette smoker
                  </label>
                  <select
                    id="Select"
                    className="form-select inputBox"
                    onChange={(event) => {
                      setSmoker(event.target.value);
                    }}
                  >
                    <option>-- Select --</option>
                    <option> Yes </option>
                    <option>No </option>
                  </select>
                </div>

                {/* Systolic blood pressure */}
                <div className="mb-3">
                  <label htmlFor="PAge" className="form-label text-capitalize">
                    Systolic Blood Pressure
                  </label>
                  <input
                    type="number"
                    name="systolic_blood_pressure"
                    id="systolic_blood_pressure"
                    onChange={(event) => {
                      setSystolic(event.target.value);
                    }}
                    className="form-control form-radious inputBox"
                  />
                </div>

                {/* On BP Medication */}
                <div className="mb-3">
                  <label htmlFor="PAge" className="form-label text-capitalize">
                    On Blood Pressure Medication
                  </label>
                  <select
                    id="Select"
                    className="form-select inputBox"
                    onChange={(event) => {
                      setBpMedication(event.target.value);
                    }}
                  >
                    <option>-- Select --</option>
                    <option>Yes </option>
                    <option>No </option>
                  </select>
                </div>

                {/* Diabetese */}
                <div className="mb-3">
                  <label htmlFor="PAge" className="form-label text-capitalize">
                    Diabetese
                  </label>
                  <select
                    id="Select"
                    className="form-select inputBox"
                    onChange={(event) => {
                      setDiabetes(event.target.value);
                    }}
                  >
                    <option>-- Select --</option>
                    <option>Present </option>
                    <option>Absent </option>
                  </select>
                </div>
              </div>

              <h1 className="text-capitalize fw-normal font-32 text-center my-2">
                result
              </h1>
              <div className="d-flex justify-content-center">
                <div className="col-lg-6 mt-3">
                  <h6>
                    Important: Inputs must be complete to perform calculation
                  </h6>
                  <div className="mb-3 position-relative">
                    <div className="iputComon">%</div>
                    <label htmlFor="" className="form-label text-capitalize">
                      Risk
                    </label>
                    <input
                      type="text"
                      name=""
                      id="result"
                      value={cra}
                      placeholder=""
                      className="form-control form-radious inputBox"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-3 position-relative">
              {/* <Link> */}
              <Button
                className="border-0 button-color text-white py-2 px-3 text-capitalize rounded"
                type="submit"
              >
                save & next
              </Button>
              {/* </Link> */}

              <StationButton
                btnBg="button-bg"
                btnOne="Skip"
                type="submit"
                link="/cardiovascular-risk-lab"
              />

              <div className="previewBtn">
              <Link to="/prescription"
                  className="border-0 button-color text-white py-2 px-3 text-capitalize rounded"
                >
                  Histrory
                </Link>
            </div>
            </div>
          </form>
        </div>
        <GlobalButton />
      </section>
    </>
  );
};

export default StationCardiovascular;
