import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { useSelector } from "react-redux";
import { loggedInUserData } from "../../../helper/localStorageHelper";

const PatientIllness = ({formData, setFormData}) => {
  const [isShown, setIsShown] = useState(false);
  const [answers, setAnswers] = useState([]);

  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);
  const [OrgId] = useState(patient?.OrgId);

  const userData = loggedInUserData();
  const userName = userData?.name;
  
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/patient-mental-health`)
      .then((response) => {
        //console.log(response.data.data);
        setAnswers(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChangeRadio = (illnessId, value) => {
    let myFormData = { ...formData };

    const index = myFormData.PatientMentalHealth.findIndex(
      (object) => object.illnessId === illnessId
    );

    if (index === -1) {
      myFormData.PatientMentalHealth.push({
        PatientId: PatientId,
        questionId: illnessId,
        answerId: value,
        comment: "Test",
        Status: "A",
        CreateUser: userName,
        UpdateUser: userName,
        OrgId: OrgId,
      });
    }

    if (index === 0) {
      myFormData.PatientMentalHealth =
        myFormData.PatientMentalHealth.filter((item) => {
          if (item.illnessId == illnessId) {
            item.Status = value;
          }
          return item;
        });
    }

    setFormData(myFormData);
    console.log(myFormData?.PatientMentalHealth);
  };
  

  const handleRemove = (illnessId) => {
    let myFormData = { ...formData };

    myFormData.PatientMentalHealth =
      myFormData.PatientMentalHealth.filter((item) => {
        return item.illnessId != illnessId;
      });

    setFormData(myFormData);
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onClick={handleClick}
            role="switch"
            id="flexSwitchCheckChecked"
            defaultChecked=""
          />
        </div>
      </div>

      {isShown && (
        <div className="col-lg-12">
          {answers?.map((answer, i) => (
            <div className="mb-2">
              <div className="">
                {i === 3 ? (
                  <p className="font-16 fw-semibold mb-2 mt-3">
                    {answer.QuestionTitle}
                  </p>
                ) : (
                  <p className="font-16 mb-1">
                    {i > 3 ? i - 3 : i + 1}. {answer.QuestionTitle}
                  </p>
                )}
                <input
                  className="form-check-input"
                  type="hidden"
                  name="inlineRadioOne"
                  value={answer.QuestionId}
                />
              </div>
              <div className="">
                {answer.get_answers.map((ans, j) => {
                  const randomNumber = Math.floor(Math.random() * 1000) + 1;
                  const uniqueId = `${ans.AnswerId}${j}${randomNumber}`;

                  return (
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value={ans.AnswerId}
                        name={`question-${i}`} 
                        id={ans.AnswerId + uniqueId}
                        onDoubleClick={(e) => {
                          e.target.checked = false;
                          e.target.value = null;
                          handleRemove(answer.QuestionId);
                        }}
                        // onChange={(e) => {
                        //   // Set the value of all other radio buttons in this question to null
                        //   document.querySelectorAll(`input[name="question-${i}"]`).forEach(input => {
                        //     if (input !== e.target) {
                        //       input.checked = false;
                        //       input.value = null;
                        //     }
                        //   });
                        // }}
                        onChange={() => handleChangeRadio(answer.QuestionId, ans.AnswerId)}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        for={ans.AnswerId + uniqueId}
                      >
                        {ans.AnswerTitle}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* show component on click  */}
      {isShown || <div></div>}
    </>
  );
};

export default PatientIllness;
