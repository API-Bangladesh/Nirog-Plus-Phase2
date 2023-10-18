import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SectionBannerDemo from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "./../GlobalBtn/GlobalButton";
import UserImage from "../../assets/img/profile.jpg";
import QrCode from "../../assets/img/qr-code.png";
import "./UserDtails.css";
import SingleButton from "./../Buttons/SingleButton/SingleButton";
import StationButton from "./../Buttons/StationButton/StationButton";
import {
  BsFileEarmarkPdfFill,
  BsImages,
  BsFillPrinterFill,
} from "react-icons/bs";
import { API_URL } from "../../helper/Constants";
import axios from "axios";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const UserDtails = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const PatientId = queryParams.get("PatientId");

  const [patient, setPatient] = useState({});
  const [patientImage, setPatientImage] = useState("");

  useEffect(() => {
    let patientImage = localStorage.getItem("patientImage");
    if (patientImage) {
      setPatientImage(patientImage);
    }
  }, []);

  useEffect(() => {
    axios
      .post(`${API_URL}/api/patient-show`, {
        PatientId: PatientId,
      })
      .then((response) => {
        if (response?.data?.PatientData) {
          setPatient(response.data.PatientData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${API_URL}/api/patient-photo`, {
        PatientId: PatientId,
        PatientImage: patientImage,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        }).then(function () {
          window.location.href = "/user-table";
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section>
        <SectionBannerDemo title="patient details" />

        <div className="container">
          <div className="profileBox bg-light p-3 position-relative rounded-3">
            <div className="profile">
              <p className="text-capitalize font-16 m-0">
                <span className="fw-bold">name: </span>
                {patient?.GivenName + " " + patient?.FamilyName}
              </p>
              <p className="text-capitalize font-16 m-0">
                <span className="fw-bold">age: </span> {patient?.Age}
              </p>
              <p className="text-capitalize font-16 m-0">
                <span className="fw-bold">gender: </span>
                {patient?.gender?.GenderCode}
              </p>
              <p className="text-capitalize font-16 m-0">
                <span className="fw-bold">NID / ID : </span> {patient?.IdNumber}
              </p>
              <p className="text-capitalize font-16 m-0">
                <span className="fw-bold">contact number : </span>{" "}
                {patient?.CellNumber}
              </p>
              <p className="text-capitalize font-16 m-0 mb-2">
                <address className="mb-0">
                  <strong>Present Address: </strong>
                  {[
                    patient?.address?.AddressLine1,
                    patient?.address?.AddressLine2,
                    patient?.address?.Village,
                    patient?.address?.upazilla_address?.name,
                    patient?.address?.PostCode,
                    patient?.address?.district_address?.name,
                    patient?.address?.Country,
                  ]
                  .filter((item) => item) // Remove undefined or falsy items
                  .join(', ')}

                  {/* {`${patient?.address?.AddressLine1 + " "} ${
                    patient?.address?.AddressLine2 + " "
                  } ${patient?.address?.Village + " "} ${
                    patient?.address?.Thana + " "
                  } ${patient?.address?.PostCode + " "} ${
                    patient?.address?.District + " "
                  } ${patient?.address?.Country}`} */}
                </address>

                {
                  patient?.address?.Camp || patient?.address?.BlockNumber || 
                    patient?.address?.Majhi || patient?.address?.TentNumber || patient?.address?.FCN 
                    ? 
                    <address className="mb-0">
                    <strong>FDMN Camp: </strong>
                    {`${patient?.address?.Camp + " "} ${
                      patient?.address?.BlockNumber + " "
                    } ${patient?.address?.Majhi + " "} ${
                      patient?.address?.TentNumber + " "
                    } ${patient?.address?.FCN}`}
                   </address>
                   :
                   ""
                }
                
              </p>
            </div>

            <div className="barCodeBox ms-0 p-0">
              <p className="text-uppercase mb-0">
                {patient?.RegistrationId}
              </p>
              <img className="barCode" src={QrCode} alt="img" />
            </div>


            <img src={patientImage} alt="userImg" className="userImg" />
          </div>

          <div className="ps-3 mt-3 printBox">
            <Link to="/" className="exportBtn">
              <BsFillPrinterFill />
            </Link>
          </div>

          <div className="text-center mt-3 position-relative">
            <Button
              className="border-0 button-color text-white py-2 px-3 text-capitalize rounded btn"
              onClick={(e) => handleSubmit(e)}
            >
              Save & Next
            </Button>
            {/* <StationButton
              btnOne="Save & station 1"
              link="/height-weight"
              btnBg="button-bg"
            /> */}
          </div>
        </div>

        <GlobalButton />
      </section>
    </>
  );
};

export default UserDtails;
