import React, { useEffect, useState } from "react";
import SectionBanner from "./../SectionBannerDemo/SectionBanner";
import GlobalButton from "./../GlobalBtn/GlobalButton";
import SectionTitle from "./../SectionTitleDemo/SectionTitle";
import "./StationTwo.css";
import { Link } from "react-router-dom";
import StationButton from "../Buttons/StationButton/StationButton";
import SingleButton from "../Buttons/SingleButton/SingleButton";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../../helper/Constants";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUserData } from "../../helper/localStorageHelper";
import { ADD_PATIENT } from "./../../redux/state-slice/patients-slice";

const StationTwo = () => {
  const dispatch = useDispatch();
  const { patient } = useSelector((state) => state.patients);
  console.log("Patient", patient)

  const [PatientId] = useState(patient?.PatientId);

  const userData = loggedInUserData();
  const userName = userData?.name;

  const [HeartRate, setHeartRate] = useState("");
  const [BPSystolic1, setBPSystolic1] = useState("");
  const [BPDiastolic1, setBPDiastolic1] = useState("");

  const [BPSystolic2, setBPSystolic2] = useState("");
  const [BPDiastolic2, setBPDiastolic2] = useState("");

  const [CurrentTemparature, setCurrentTemparature] = useState("");
  const [RespiratoryRate, setRespiratoryRate] = useState("");
  const [SpO2Rate, setSpO2Rate] = useState("");
  const [IndicatesNormalOxygenSaturation, setIndicatesNormalOxygenSaturation] =
    useState("");

  const token = localStorage.getItem("token");
  const myTokenData = JSON.parse(token);
  const tokenData = myTokenData?.user?.station;
  const stations = tokenData.split(",");

  const handleSubmit = async (e, redirectUrl = "") => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/patient-blood-pressure-create`,
        {
          PatientId,
          HeartRate,
          BPSystolic1,
          BPDiastolic1,
          BPSystolic2,
          BPDiastolic2,
          CurrentTemparature,
          RespiratoryRate,
          SpO2Rate,
          IndicatesNormalOxygenSaturation,
          OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
          CreateUser: userName,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      }).then(function () {

        const updatedPatientData = {
          ...patient,
          bps: {
            ...patient.bps,
            HeartRate,
            BPSystolic1,
            BPDiastolic1,
            BPSystolic2,
            BPDiastolic2,
            CurrentTemparature,
            RespiratoryRate,
            SpO2Rate,
            IndicatesNormalOxygenSaturation,
          },
        };
        dispatch(ADD_PATIENT(updatedPatientData));

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          window.location.href = "/blood-pressure-table";
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred.",
      });

      console.error(error);
    }
  };

  useEffect(() => {
    let result =
      SpO2Rate < 75 && SpO2Rate > 0
        ? "Severe Hypoxemic Oxygen Saturation"
        : SpO2Rate >= 75 && SpO2Rate <= 89.9
        ? "Moderate Hypoxemic Oxygen Saturation"
        : SpO2Rate >= 90 && SpO2Rate <= 94.9
        ? "Mild Hypoxemic Oxygen Saturation"
        : SpO2Rate >= 95 && SpO2Rate <= 100
        ? "Normal Oxygen Saturation"
        : "";
    setIndicatesNormalOxygenSaturation(result);
  }, [SpO2Rate]);

  return (
    <>
      <section>
        <SectionBanner
          title={`Station 2 - ${
            patient?.GivenName + " " + patient?.FamilyName
          }`}
        />
        <div className="container">
          {/* Heart Rate */}
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <SectionTitle title="Pulse" />
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">Min</div>
                <label
                  htmlFor="HeartRate"
                  className="form-label text-capitalize"
                >
                  Heart Rate
                </label>
                <input
                  id="HeartRate"
                  type="number"
                  value={HeartRate}
                  onChange={(event) => {
                    setHeartRate(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 100-170"
                />
              </div>

              {/* Blood Pressure*/}
              <SectionTitle title="Blood Pressure" />
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">mmHg</div>
                <label
                  htmlFor="BPSystolic1"
                  className="form-label text-capitalize"
                >
                  Systolic
                </label>
                <input
                  id="BPSystolic1"
                  type="number"
                  value={BPSystolic1}
                  onChange={(event) => {
                    setBPSystolic1(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 120"
                />
              </div>

              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">mmHg</div>
                <label
                  htmlFor="BPDiastolic1"
                  className="form-label text-capitalize"
                >
                  Diastolic
                </label>
                <input
                  id="BPDiastolic1"
                  type="number"
                  value={BPDiastolic1}
                  onChange={(event) => {
                    setBPDiastolic1(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 80"
                />
              </div>

              {/* Blood Pressure*/}
              <SectionTitle title="Repeat BP (>130/80 )" />
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">mmHg</div>
                <label
                  htmlFor="BPSystolic2"
                  className="form-label text-capitalize"
                >
                  Systolic{" "}
                </label>
                <input
                  id="BPSystolic2"
                  type="number"
                  value={BPSystolic2}
                  onChange={(event) => {
                    setBPSystolic2(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 135"
                />
              </div>
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">mmHg</div>
                <label
                  htmlFor="BPDiastolic2"
                  className="form-label text-capitalize"
                >
                  Diastolic{" "}
                </label>
                <input
                  id="BPDiastolic2"
                  type="number"
                  value={BPDiastolic2}
                  onChange={(event) => {
                    setBPDiastolic2(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 85"
                />
              </div>

              {/* Blood Pressure*/}
              <SectionTitle title="Temperature" />
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">
                  <span> &#8457; </span>
                </div>
                <label
                  htmlFor="Bodytemperature"
                  className="form-label text-capitalize"
                >
                  Body Temperature
                </label>
                <input
                  id="Bodytemperature"
                  type="number"
                  value={CurrentTemparature}
                  onChange={(event) => {
                    setCurrentTemparature(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 98"
                />
              </div>

              {/* Respiratory */}
              <SectionTitle title="Respiratory" />
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">min</div>
                <label
                  htmlFor="RespiratoryRate"
                  className="form-label text-capitalize"
                >
                  Respiratory Rate{" "}
                </label>
                <input
                  id="RespiratoryRate"
                  type="number"
                  value={RespiratoryRate}
                  onChange={(event) => {
                    setRespiratoryRate(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 15"
                />
              </div>

              {/* SpO2 Rate */}
              <SectionTitle title="SpO2" />
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">%</div>
                <label
                  htmlFor="SpO2Rate"
                  className="form-label text-capitalize"
                >
                  SpO2 Rate
                </label>
                <input
                  type="number"
                  name="SpO2Rate"
                  id="SpO2Rate"
                  onChange={(event) => {
                    setSpO2Rate(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 95"
                />
              </div>
              <div className="mb-3">
                <input
                  readOnly
                  type="text"
                  name="SpO2Rate2"
                  id="SpO2Rate2"
                  value={
                    IndicatesNormalOxygenSaturation === ""
                      ? "----"
                      : IndicatesNormalOxygenSaturation
                  }
                  className="form-control form-radious inputBox"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-3 position-relative">
            <section>
              <div className="container">
                {stations?.includes("station_3") ? (
                  <Button
                    className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined"
                    block="block"
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined"
                    block="block"
                    type="button"
                    onClick={(e) => handleSubmit(e, "/dashboard")}
                  >
                    Save
                  </Button>
                )}
              </div>
            </section>
            <section className="stationBtn">
              {stations?.includes("station_3") && (
                <a
                  className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	button-bg"
                  onClick={(e) => handleSubmit(e, "/glucose-hemoglobin")}
                >
                  Save &amp; Station 3
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

export default StationTwo;
