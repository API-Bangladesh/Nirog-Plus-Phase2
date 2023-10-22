import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import PatientShortInfo from "../Common/PatientShortInfo";
import { loggedInUserData } from "../../helper/localStorageHelper";
import "./TbStatus.css";

import AdditionalSymptoms from "../StationFourA/Illness/AdditionalSymptoms";
import ExaminationFinding from "../StationFourA/Illness/ExaminationFinding";
import TBPastHistory from "../StationFourA/Illness/TBPastHistory";


const TbStatus = () => {
  const userData = loggedInUserData();
  const user = userData.name;
  // console.log(user);

  const { patient } = useSelector((state) => state.patients);


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


  return (
    <>
      <section>
        <SectionBanner title={`TB Status - ${patient?.GivenName}`} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="show-data mb-4">
                <PatientShortInfo />
              </div>
            </div>
          </div>
          <form className="mt-3">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <h6>Additional History for Suspected TB Cases (PTB only)</h6>
                <Accordion>
                
                  <Accordion.Item
                    eventKey="1"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Additional Symptoms</Accordion.Header>
                    <Accordion.Body>
                      <div className="">
                        <div className="">
                          <p className="font-16 fw-semibold">
                            Do you have any of the following Symptoms?
                          </p>
                        </div>
                        <div className="position-relative">
                        <AdditionalSymptoms className="toggle-btn" formData={formData} setFormData={setFormData}/>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item
                    eventKey="2"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>Examination Finding: Please Auscultate Lungs</Accordion.Header>
                    <Accordion.Body>
                      <div className="">
                        <div className="">
                          <p className="font-16 fw-semibold">
                            Do you have any of the following Symptoms?
                          </p>
                        </div>
                        <div className="position-relative">
                        <ExaminationFinding className="toggle-btn" formData={formData} setFormData={setFormData}/>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item
                    eventKey="3"
                    className="input-shadow mb-3 rounded"
                  >
                    <Accordion.Header>TB Past History</Accordion.Header>
                    <Accordion.Body>
                      <div className="">
                        <div className="">
                          <p className="font-16 fw-semibold">
                            Do you have Past TB History?
                          </p>
                        </div>
                        <div className="position-relative">
                        <TBPastHistory className="toggle-btn" formData={formData} setFormData={setFormData}/>
                        </div>
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

export default TbStatus;
