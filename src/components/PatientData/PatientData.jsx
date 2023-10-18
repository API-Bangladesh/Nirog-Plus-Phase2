import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import barCode from "../../assets/img/qr-code.png";
import SectionBannerDemo from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import SingleButton from "../Buttons/SingleButton/SingleButton";
import ViewEditButton from "../Buttons/ViewEditButton/ViewEditButton";
import { BsUpcScan } from "react-icons/bs";
import PatientDataView from "../PatientDataView/PatientDataView";
import PatientDataEdit from "../PatientDataView/PatientDataEdit";
import "./PatientData.css";

const PatientData = ({ link, title }) => {
  return (
    <>
      <div id="patientData">
        <SectionBannerDemo title={title}/>
        <div className="container">
          <h3 className="sectionTitle text-center mb-4">Search Patient</h3>
          <div className="checkbox">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                defaultChecked
                type="radio"
                name="RadioDefault"
                id="card"
              />
              <label className="form-check-label text-capitalize" htmlFor="card">
                Card
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="RadioDefault"
                id="nid"
              />
              <label className="form-check-label text-capitalize" htmlFor="nid">
                NID
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="RadioDefault"
                id="name"
              />
              <label className="form-check-label text-capitalize" htmlFor="name">
                Name
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="RadioDefault"
                id="mobilenumber"
              />
              <label
                className="form-check-label text-capitalize"
                htmlFor="mobilenumber"
              >
                mobile number
              </label>
            </div>
          </div>

          <div className="search">
            <form action="" className="searchBox">
              <input type="text" placeholder="Search.." name="search" />
            </form>
            <div className="barCodeBox">
              <img src={barCode} alt="img" />
              <div className="camera">
                <BsUpcScan />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3">
              <div className="mt-5 mb-2">
                <label htmlFor="" className="form-label text-capitalize">
                  Community health center
                </label>
                <select id="Select" className="form-select inputBox">
                  <option selected value="">-- Select --</option>
                  <option>Union Sub-Centre (Balukhali)</option>
                  <option>Kurmitola General Hospital</option>
                  <option>Cantonment Diagnostic Center</option>
                  <option>
                    Gazipur Metropolitan Hospital & Diagnostic Center
                  </option>
                  <option>Healing Aid Hospital and diagnostic</option>
                  <option>Shomorita Hospital Ltd.</option>
                  <option>Al Markajul Islami Hospital</option>
                  <option>AL Raji Hospital and Diagnostic Center</option>
                  <option>Medicare medical services</option>
                  <option>Womens children and general Hospital</option>
                  <option>Popular Diagnostic Center</option>
                  <option>Bangladesh eye Hospital Ltd.</option>
                  <option>Helth care Digital Diagonstic Center</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="mt-5 mb-2">
                <label htmlFor="" className="form-label text-capitalize">
                  Start date
                </label>
                <input
                  type="date"
                  name=""
                  id="startdate"
                  className="form-control form-radious inputBox"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="mt-5 mb-2">
                <label htmlFor="" className="form-label text-capitalize">
                  End Date
                </label>
                <input
                  type="date"
                  name=""
                  id="enddate"
                  className="form-control form-radious inputBox"
                />
              </div>
            </div>
            <div className="col-lg-3 d-flex align-items-end justify-content-start">
              <div className="mb-2">
                <SingleButton btnOne="Submit" link="/patient-list"/>
              </div>
            </div>
          </div>

          <Table responsive="sm md lg xl" className="patientTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>MS</th>
                <th>FP</th>
                {/* <th>Status</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>101</td>
                <td>Jiaur Rahman</td>
                <td>Male</td>
                <td>Yes</td>
                <td>No</td>
                {/* <td>
                  <div className="status form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                  </div>
                </td> */}

                <td>
                <div className="d-flex">
                <PatientDataView/>
                <PatientDataEdit/>
                <ViewEditButton btnthree="Add Fingerprint" link="/patient-list"/>
                </div>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>101</td>
                <td>Jiaur Rahman</td>
                <td>Male</td>
                <td>Yes</td>
                <td>No</td>
                {/* <td>
                  <div className="status form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                  </div>
                </td> */}

                <td>
                <div className="d-flex">
                <PatientDataView/>
                <PatientDataEdit/>
                <ViewEditButton btnthree="Add Fingerprint" link="/patient-list"/>
                </div>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>101</td>
                <td>Jiaur Rahman</td>
                <td>Male</td>
                <td>Yes</td>
                <td>No</td>
                {/* <td>
                  <div className="status form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                  </div>
                </td> */}

                <td>
                <div className="d-flex">
                <PatientDataView/>
                <PatientDataEdit/>
                <ViewEditButton btnthree="Add Fingerprint" link="/patient-list"/>
                </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <GlobalButton />
      </div>
    </>
  );
};

export default PatientData;
