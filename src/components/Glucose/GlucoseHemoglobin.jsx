import React, { useEffect, useState } from "react";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import SectionTitle from "../SectionTitleDemo/SectionTitle";
import SingleButton from "../Buttons/SingleButton/SingleButton";
import StationButton from "../Buttons/StationButton/StationButton";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../helper/Constants";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUserData } from "../../helper/localStorageHelper";
import { ADD_PATIENT } from "./../../redux/state-slice/patients-slice";

const GlucoseHemoglobin = () => {
  const dispatch = useDispatch();
  const userData = loggedInUserData();
  const userName = userData?.name;

  const { patient } = useSelector((state) => state.patients);
  console.log(patient)

  const [PatientId] = useState(patient?.PatientId);
  const [RBG, setRBG] = useState("");
  const [FBG, setFBG] = useState("");
  const [HrsFromLastEat, setHrsFromLastEat] = useState("");
  const [Hemoglobin, setHemoglobin] = useState("");

  const token = localStorage.getItem("token");
  const myTokenData = JSON.parse(token);
  const tokenData = myTokenData?.user?.station;
  const stations = tokenData.split(",");

  const handleSubmit = async (e, redirectUrl = "") => {
    e.preventDefault();

    // console.log(`${RBG}  ${FBG} ${HrsFromLastEat} ${Hemoglobin},`);
    try {
      const response = await axios.post(
        `${API_URL}/api/patient-glucose-hemoglobin-create`,
        {
          PatientId,
          RBG,
          FBG,
          HrsFromLastEat,
          Hemoglobin,
          OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
          CreateUser: userName,
        }
      );

      // console.log(response);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      }).then(function () {

        const updatedPatientData = {
          ...patient,
          glucose_hbs: {
            ...patient?.glucose_hbs,
            RBG,
            FBG,
            HrsFromLastEat,
            Hemoglobin
          },
        };
        dispatch(ADD_PATIENT(updatedPatientData));

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          window.location.href = "/glucose-hemoglobin-table";
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

  return (
    <>
      <section>
        <SectionBanner
          title={`Station 3 - ${
            patient?.GivenName + " " + patient?.FamilyName
          }`}
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <SectionTitle title="Glucose & Hemoglobin" />
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">mmol/L</div>
                <label htmlFor="RBG" className="form-label text-capitalize">
                  RBG
                </label>
                <input
                  id="RBG"
                  type="number"
                  value={RBG}
                  onChange={(event) => {
                    setRBG(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="EX: 00.00"
                />
              </div>

              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">mmol/L</div>
                <label htmlFor="FBG" className="form-label text-capitalize">
                  FBG
                </label>
                <input
                  id="FBG"
                  type="number"
                  value={FBG}
                  onChange={(event) => {
                    setFBG(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="EX: 00.00"
                />
              </div>
              <div className="mb-3 shadowme">
                <label
                  htmlFor="HrsFromLastEat"
                  className="form-label text-capitalize"
                >
                  Hours Since Last Meal
                </label>
                <input
                  id="HrsFromLastEat"
                  type="number"
                  value={HrsFromLastEat}
                  onChange={(event) => {
                    setHrsFromLastEat(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 3"
                />
              </div>
              <div className="mb-3 shadowme position-relative">
                <div className="iputComon">mmol/L</div>
                <label
                  htmlFor="Hemoglobin"
                  className="form-label text-capitalize"
                >
                  Hemoglobin
                </label>
                <input
                  id="Hemoglobin"
                  type="number"
                  value={Hemoglobin}
                  onChange={(event) => {
                    setHemoglobin(event.target.value);
                  }}
                  className="form-control form-radious inputBox"
                  placeholder="Ex : 13.8"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-3 position-relative">
            <section>
              <div className="container">
                {stations?.includes("station_4") ? (
                  <Button
                    className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined btn btn-primary"
                    block="block"
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined btn btn-primary"
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
              {stations?.includes("station_4") && (
                <a
                  className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	button-bg"
                  onClick={(e) => handleSubmit(e, "/user-data")}
                >
                  Save &amp; Station 4
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

export default GlucoseHemoglobin;
