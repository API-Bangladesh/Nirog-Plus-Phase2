import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import SectionBannerDemo from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import {BsFillCheckCircleFill, BsFillPrinterFill} from "react-icons/bs";
// import {FcPrint} from "react-icons/fc";
import "./Counter.css";

const Counter = ({ link, title }) => {
  return (
    <>
      <div id="counter">
        <SectionBannerDemo title={title} />
        <div className="container">
          <div className="healthBox">
            <div className="healthCenter mb-5">
              <p className="text-dark mb-1 font-22"><b>Health Center :</b> Helth Care Digital Diagonstic Center</p>
              <h5 className="text-secondary font-18">Date : 23-May-2023</h5>
            </div>
            <div className="counterItem my-3 d-flex align-items-center">
              <h4 className="d-inline-block me-3 mb-0">Total :</h4>
              <h4 className="countNum mb-0 countBg1"><BsFillCheckCircleFill className="font-18 me-2"/> <span>220</span></h4>
            </div>
            <div className="counterItem my-3 d-flex align-items-center">
              <h4 className="d-inline-block me-3 mb-0">Completed :</h4>
              <h4 className="countNum mb-0 countBg2"><BsFillCheckCircleFill className="font-18 me-2"/> <span>200</span></h4>
            </div>
            <div className="counterItem mt-3 d-flex align-items-center">
              <h4 className="d-inline-block me-3 mb-0">In Progress :</h4>
              <h4 className="countNum mb-0 countBg3">
              <div className="spinner-grow text-light me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
                <span>20</span></h4>
            </div>
          </div>
          <div className="printButton text-end mt-4">
            {/* <button type="button" className="btn btn-dark"><BsFillPrinterFill/> Print</button> */}

            <button type="button" className="btn btn-secondary">
            <BsFillPrinterFill/> Print
          </button>
          
          </div>
          <Table responsive="sm md lg xl" className="patientTable">
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Doctor Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Number of Patient</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>101</td>
                <td>Dr. Abdul Kayum</td>
                <td>Male</td>
                <td>Physiotherapy</td>
                <td>50 (10)</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>102</td>
                <td>Dr. Mijanur Rahman</td>
                <td>Male</td>
                <td>Surgery</td>
                <td>80 (4)</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>103</td>
                <td>Dr. Abul Kalam Azad</td>
                <td>Male</td>
                <td>Medicine</td>
                <td>90 (6)</td>
              </tr>
            </tbody>
          </Table>

        </div>
        <GlobalButton />
      </div>
    </>
  );
};

export default Counter;
