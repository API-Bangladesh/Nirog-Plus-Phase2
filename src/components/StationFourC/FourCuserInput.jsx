import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import FourCuserInputModal from "./Modals/ProvitionalModal";
import InvestigationModal from "./Modals/InvestigationModal";
import TreatmentModal from "./Modals/TreatmentModal";
import ReferralModal from "./Modals/ReferralModal";
import AdviceModal from "./Modals/AdviceModal";
import SingleButton from "../Buttons/SingleButton/SingleButton";
import DoubleButton from "./../Buttons/DoubleButton/DoubleButton";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { API_URL } from "../../helper/Constants";
import { useSelector } from "react-redux";
import PatientShortInfo from "../Common/PatientShortInfo";
import { AiOutlineClose } from "react-icons/ai";
import { loggedInUserData } from "../../helper/localStorageHelper";

const FourCuserInput = () => {
  const userData = loggedInUserData();
  const user = userData.name;
  // console.log(user);

  const { patient } = useSelector((state) => state.patients);
  const { Age } = patient;
  // console.log(Age);

  const [PatientId] = useState(patient?.PatientId);
  const [formData, setFormData] = useState({
    ProvisionalDiagnosis: [],
    LabInvestigation: [],
    TreatmentSuggestion: [],
    Referral: [],
    Advice: [],
    FollowUpDate: [
      {
        PatientId: PatientId,
        followUpDate: "",
        comment: "",
        Status: "",
        CreateUser: user,
        OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      },
    ],
  });

  console.log(formData.TreatmentSuggestion);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/patient-s4c-create`,
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      }).then(function () {
        window.location = "cardiovascular-risk-nonlab";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred.",
      });
    }
  };

  const handleRemoveByKey = (e, property, key) => {
    e.preventDefault();

    let myFormData = { ...formData };
    myFormData[property].splice(key, 1);

    setFormData(myFormData);
  };

  const handleFollowUpDate = (e, property, value) => {
    e.preventDefault();

    let myFormData = { ...formData };
    console.log(value);
    myFormData.FollowUpDate[0][property] = value;
    setFormData(myFormData);
  };

  return (
    <>
      <section>
        <SectionBanner title={`Station 4C - ${patient?.GivenName}`} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="show-data mb-4">
                <PatientShortInfo />
              </div>
            </div>
          </div>
          <form className="mt-3" onSubmit={(e) => handleSubmit(e)}>
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <Accordion>
                  {/* Provitional Diagnosis */}
                  <Accordion.Item
                    eventKey="0"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Provisional Diagnosis</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-column align-items-center">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Provisional Diagnosis</th>
                              <th>OtherProvisional Diagnosis</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.ProvisionalDiagnosis &&
                              formData.ProvisionalDiagnosis.map((item, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{item.provisionalDiagnosis}</td>
                                    <td>{item.otherProvisionalDiagnosis}</td>
                                    <td>{item.diagnosisStatus}</td>
                                    <td>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={(e) =>
                                          handleRemoveByKey(
                                            e,
                                            "ProvisionalDiagnosis",
                                            key
                                          )
                                        }
                                      >
                                        <AiOutlineClose className="fs-5" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <FourCuserInputModal
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Provitional Diagnosis */}
                  <Accordion.Item
                    eventKey="1"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Lab Investigations</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-column align-items-center">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>InvestigationId</th>
                              {/* <th>OtherInvestigation</th> */}
                              <th>Instruction</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.LabInvestigation &&
                              formData.LabInvestigation.map((item, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{item.investigaion}</td>
                                    {/* <td>{item.otherInvestigation}</td> */}
                                    <td>{item.instruction}</td>
                                    <td>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={(e) =>
                                          handleRemoveByKey(
                                            e,
                                            "LabInvestigation",
                                            key
                                          )
                                        }
                                      >
                                        <AiOutlineClose className="fs-5" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <InvestigationModal
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Provitional Diagnosis */}
                  <Accordion.Item
                    eventKey="2"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Treatment Suggestions</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-column align-items-center">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Drug Name</th>
                              <th>Other Drug</th>
                              <th>Frequency Hours</th>
                              <th>Drug Dose</th>
                              <th>Duration</th>
                              <th>Instruction</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.TreatmentSuggestion &&
                              formData.TreatmentSuggestion.map((item, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{item?.drugCode}</td>
                                    <td>{item?.hourly}</td>
                                    <td>
                                      <div>{item?.frequency}</div>
                                      <div>{item?.comment}</div>
                                    </td>
                                    <td>{item?.drugDose}</td>
                                    <td>{item?.drugDurationValue}</td>
                                    <td>{item?.banglaInstruction}</td>
                                    <td>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={(e) =>
                                          handleRemoveByKey(
                                            e,
                                            "TreatmentSuggestion",
                                            key
                                          )
                                        }
                                      >
                                        <AiOutlineClose className="fs-5" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <TreatmentModal
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item
                    eventKey="5"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Follow up Advice</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex justify-content-center">
                        {/* <ReferralModal /> */}
                      </div>
                      <div className="mb-3 pb-0 m-0 input-shadow shadow rounded-pill">
                        <input
                          type="date"
                          value={formData.FollowUpDate.followUpDate}
                          onChange={(e) =>
                            handleFollowUpDate(
                              e,
                              "followUpDate",
                              e.target.value
                            )
                          }
                          className="dateIcon form-control input-padding rounded-pill py-2 border-0"
                        />
                      </div>
                      <div className="mb-3 mt-3 input-shadow shadow rounded-pill">
                        <select
                          id="Select"
                          className="form-select input-padding rounded-pill select-form-padding"
                          value={formData.FollowUpDate.Status}
                          onChange={(e) =>
                            handleFollowUpDate(e, "Status", e.target.value)
                          }
                        >
                          <option selected value="">
                            Health Status
                          </option>
                          <option value="Average">Average</option>
                          <option value="Good">Good</option>
                          <option value="Normal">Normal</option>
                        </select>
                      </div>
                      <div className="mb-3 pb-0 m-0 input-shadow shadow rounded-pill">
                        <input
                          type="text"
                          value={formData.FollowUpDate.comment}
                          onChange={(e) =>
                            handleFollowUpDate(e, "comment", e.target.value)
                          }
                          className="form-control input-padding rounded-pill py-2 border-0"
                          placeholder="Comment"
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Advice Section	 */}
                  <Accordion.Item
                    eventKey="4"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Advice</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-column align-items-center">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>adviceId</th>
                              <th>advice</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.Advice &&
                              formData.Advice.map((item, key) => {
                                console.log(item);
                                return (
                                  <tr key={key}>
                                    <td>{item.adviceText}</td>
                                    <td>{item.advice}</td>
                                    <td>{item.Status}</td>

                                    <td>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={(e) =>
                                          handleRemoveByKey(e, "Advice", key)
                                        }
                                      >
                                        <AiOutlineClose className="fs-5" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <AdviceModal
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Referral Section	 */}
                  <Accordion.Item
                    eventKey="3"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Referral Section</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-column align-items-center">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>Health Center Name</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.Referral &&
                              formData.Referral.map((item, key) => {
                                console.log(item);
                                return (
                                  <tr key={key}>
                                    <td>{item.description}</td>
                                    <td>{item.healthCenterName}</td>
                                    <td>{item.Status}</td>
                                    <td>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={(e) =>
                                          handleRemoveByKey(e, "Referral", key)
                                        }
                                      >
                                        <AiOutlineClose className="fs-5" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <ReferralModal
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>

            <div className="text-center mt-3 position-relative">
              <Button
                className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined"
                type="submit"
              >
                Save & Next
              </Button>
              {/* <SingleButton
                btnOne="save & Next"
                link="/cardiovascular-risk-nonlab"
              /> */}

              <div className="previewBtn">
                <Link
                  to="/prescription"
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

export default FourCuserInput;
