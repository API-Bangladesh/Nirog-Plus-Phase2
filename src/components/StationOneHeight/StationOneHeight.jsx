import React, { useEffect, useState } from "react";
import SectionBannerDemo from "../../components/SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import SectionTitle from "../SectionTitleDemo/SectionTitle";
// import StationButton from "../Buttons/StationButton/StationButton";
// import SingleButton from "../Buttons/SingleButton/SingleButton";
import "./StationOneHeight.css";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../../helper/Constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loggedInUserData } from "../../helper/localStorageHelper";

const StationOneHeight = () => {
  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  // const [OrgId] = useState(patient?.OrgId);

  const userData = loggedInUserData();
  const userName = userData?.name;

  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [BMI, setBMI] = useState("");
  const [BMIClass, setBMIClass] = useState("");
  const [MUAC, setMUAC] = useState("");
  const [MUACClass, setMUACClass] = useState("");
  const [RefBloodGroupId, setRefBloodGroupId] = useState("");
  const [OrgId] = useState("73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B");
  // const [CreateUser] = useState("mmr");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const myTokenData = JSON.parse(token);
  const tokenData = myTokenData?.user?.station;
  const stations = tokenData.split(",");

  const handleSubmit = async (e, redirectUrl) => {
    e.preventDefault();
    try {
      if (RefBloodGroupId === "") {
        setError("This field can not be empty!");
      } else {
        const response = await axios.post(
          `${API_URL}/api/patient-height-width-create`,
          {
            PatientId,
            Height,
            Weight,
            BMI,
            BMIClass,
            MUAC,
            MUACClass,
            RefBloodGroupId,
            OrgId: OrgId,
            CreateUser: userName,
          }
        );

        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        }).then(function () {
          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            window.location.href = "/blood-pressure-table";
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred.",
      });
      console.error(error);
    }
  };

  //genders
  const [bloodgroup, setDataBloodgroup] = useState([]);
  const getBloodGroupData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/patient-blood-group`);

      if (response.status === 200) {
        setDataBloodgroup(response.data.BloodGroup);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, []);

  useEffect(() => {
    let BMIValue = (Weight / ((Height / 100) * (Height / 100))).toFixed(2);

    // Check if BMI is a valid number
    if (isNaN(BMIValue) || !isFinite(BMIValue)) {
      BMIValue = "";
    }

    setBMI(BMIValue);

    let result =
      BMIValue === null || BMIValue === ""
        ? ""
        : BMIValue <= 0
        ? ""
        : BMIValue <= 18.5
        ? "UnderWeight"
        : BMIValue > 18.5 && BMIValue <= 24.9
        ? "Normal"
        : BMIValue > 24.9 && BMIValue <= 29.9
        ? "OverWeight"
        : "Obese";
    setBMIClass(result);
  }, [Height, Weight]);

  useEffect(() => {
    let result =
      MUAC < 11 && MUAC > 0
        ? "Severe Acute Malnutrition (SAM)"
        : MUAC >= 11 && MUAC < 12.5
        ? "Moderate Acute Malnutrition (MAM)"
        : MUAC >= 12.5 && MUAC < 13.5
        ? " At Risk for Acute Malnutrition "
        : MUAC >= 13.5
        ? "Normal"
        : "";
    setMUACClass(result);
  }, [MUAC]);

  return (
    <>
      <section className="Heightwidth">
        <SectionBannerDemo
          title="Station 1 - Height & Weight"
          patientName={`patient name: ${
            patient?.GivenName + " " + patient?.FamilyName
          }`}
        />

        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <SectionTitle title="Baseline data " />

              {/* Height */}
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">cm</div>
                <label htmlFor="Height" className="form-label text-capitalize">
                  Height
                </label>
                <input
                  type="number"
                  value={Height}
                  min="0"
                  onChange={(event) => {
                    setHeight(event.target.value);
                  }}
                  name="Height"
                  id="Height"
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 170"
                />
              </div>

              {/* Weight */}
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">kg</div>
                <label htmlFor="Weight" className="form-label text-capitalize">
                  Weight
                </label>
                <input
                  type="number"
                  value={Weight}
                  min="0"
                  onChange={(event) => {
                    setWeight(event.target.value);
                  }}
                  name="Weight"
                  id="Weight"
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 65"
                />
              </div>

              {/* BMI */}
              <div className="mb-3 shadowme">
                <label htmlFor="BMI" className="form-label text-capitalize">
                  BMI
                </label>
                <input
                  id="BMI"
                  type="text"
                  name="BMI"
                  value={Height == 0 || Weight == 0 ? "----" : BMI}
                  onChange={(event) => {
                    setBMI(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder=""
                  readOnly
                />
              </div>

              {/* BMI class */}
              <div className="mb-3 shadowme">
                <label
                  htmlFor="BMIClass"
                  className="form-label text-capitalize"
                >
                  BMI Class
                </label>
                <input
                  id="BMIClass"
                  type="text"
                  name="BMIClass"
                  readOnly
                  value={BMIClass === "" ? "----" : BMIClass}
                  className="form-control form-radious inputBox"
                  placeholder=""
                />
              </div>

              {/* MUAC */}
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">cm</div>
                <label htmlFor="MUAC" className="form-label text-capitalize">
                  MUAC
                </label>
                <input
                  id="MUAC"
                  type="number"
                  name="MUAC"
                  value={MUAC}
                  onChange={(event) => {
                    setMUAC(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 13"
                />
              </div>

              {/* MUAC class */}
              <div className="mb-3 shadowme">
                <label
                  htmlFor="MUACClass"
                  className="form-label text-capitalize"
                >
                  MUAC class
                </label>
                <div className="mb-3">
                  <input
                    id="MUACClass"
                    type="text"
                    name="MUACClass"
                    readOnly
                    value={MUACClass === "" ? "----" : MUACClass}
                    className="form-control form-radious inputBox"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="RefBloodGroupIdSelect"
                  className="form-label text-capitalize"
                >
                  blood group <span className="text-danger font-20 ">*</span>
                </label>
                <select
                  id="RefBloodGroupIdSelect"
                  value={RefBloodGroupId}
                  onChange={(event) => {
                    setRefBloodGroupId(event.target.value);
                    setError("");
                  }}
                  className={`form-select inputBox ${
                    error ? "error-input" : ""
                  }`}
                  // className="form-select inputBox"
                >
                  <option value="">-- Select --</option>
                  {bloodgroup.map((item) => (
                    <option
                      key={item.RefBloodGroupId}
                      value={item.RefBloodGroupId}
                    >
                      {item.BloodGroupCode}
                    </option>
                  ))}
                </select>
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
            </div>
          </div>
          <div className="text-center mt-3 position-relative">
            <section>
              <div className="container">
                {stations?.includes("station_2") ? (
                  <Button
                    className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined"
                    block="block"
                    onClick={(e) => handleSubmit(e, "/user-table")}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined"
                    block="block"
                    onClick={(e) => handleSubmit(e, "/dashboard")}
                  >
                    Save
                  </Button>
                )}
              </div>
            </section>
            <section className="stationBtn">
              {stations?.includes("station_2") && (
                <a
                  className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	button-bg"
                  onClick={(e) => handleSubmit(e, "/blood-pressure")}
                >
                  Save &amp; Station 2
                </a>
              )}
            </section>

            <div className="previewBtn">
              <Link
                to="/prescription"
                className="border-0 button-color text-white py-2 px-3 text-capitalize rounded"
              >
                Histrory
              </Link>
            </div>
          </div>
        </div>
        <GlobalButton />
      </section>
    </>
  );
};

export default StationOneHeight;
