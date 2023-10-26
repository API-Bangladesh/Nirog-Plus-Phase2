import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import OthersField from "../Illness/OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { useSelector } from "react-redux";
import { loggedInUserData } from "../../../helper/localStorageHelper";

const PatientIllness = ({ formData, setFormData }) => {
   const [isShown, setIsShown] = useState(false);
   const { patient } = useSelector((state) => state.patients);

   const [PatientId] = useState(patient?.PatientId);
   const [OrgId] = useState(patient?.OrgId);

   const userData = loggedInUserData();
   const userName = userData?.name;

   const handleClick = (event) => {
      setIsShown((current) => !current);
   };

   // PresentIllness
   const [PresentIllness, setPresentIllness] = useState([]);

   const getPresentIllnessData = async () => {
      try {
         const response = await axios.get(
            `${API_URL}/api/patient-ho-present-illness`
         );
         if (response.status === 200) {
            setPresentIllness(response.data.data);
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getPresentIllnessData();
   }, []);

   const handleChangeRadio = (illnessId, value) => {
      let myFormData = { ...formData };

      const index = myFormData.PatientHOPresentIllness.findIndex(
         (object) => object.illnessId === illnessId
      );

      if (index === -1) {
         myFormData.PatientHOPresentIllness.push({
            PatientId: PatientId,
            illnessId: illnessId,
            otherIllness: "",
            Status: value,
            CreateUser: userName,
            UpdateUser: userName,
            OrgId: OrgId,
         });
      }

      if (index === 0) {
         myFormData.PatientHOPresentIllness =
            myFormData.PatientHOPresentIllness.filter((item) => {
               if (item.illnessId == illnessId) {
                  item.Status = value;
               }
               return item;
            });
      }

      setFormData(myFormData);
      console.log(myFormData?.PatientHOPresentIllness);
   };

   const handleRemove = (illnessId) => {
      let myFormData = { ...formData };

      myFormData.PatientHOPresentIllness =
         myFormData.PatientHOPresentIllness.filter((item) => {
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
               <div className="d-flex justify-content-between align-items-center">
                  <div className="">
                     <p className="font-16">When did he suffer TB in past</p>
                  </div>
                  <div className="selectYear mb-3">
                     <Form.Select
                        aria-label="Default select example"
                        className="ps-3"
                     >
                        <option>Select Year</option>
                        <option value="1">2020</option>
                        <option value="2">2021</option>
                        <option value="3">2022</option>
                        <option value="3">2023</option>
                     </Form.Select>
                  </div>
               </div>
               <div className="pt-2 ps-3 pb-1 mb-3 rounded bg-light">
                  <div className="">
                     <p className="font-16 mb-2">Evidenced was</p>
                  </div>
                  <div className="selectCheckBox mb-3 ps-4 ">
                     <div className="d-flex justify-content-between pe-3 mb-1">
                        <label className="form-check-label" for="evidenced_1">
                           Sputum was positive
                        </label>
                        <input
                           className="form-check-input"
                           type="checkbox"
                           value=""
                           id="evidenced_1"
                        />
                     </div>
                     <div className="d-flex justify-content-between pe-3 mb-1">
                        <label className="form-check-label" for="evidenced_2">
                           Chest X-ray was suggestive
                        </label>
                        <input
                           className="form-check-input"
                           type="checkbox"
                           value=""
                           id="evidenced_2"
                        />
                     </div>
                     <div className="d-flex justify-content-between pe-3 mb-1">
                        <label className="form-check-label" for="evidenced_3">
                           MTB detected by gene X-pert
                        </label>
                        <input
                           className="form-check-input"
                           type="checkbox"
                           value=""
                           id="evidenced_3"
                        />
                     </div>
                     <div className="d-flex justify-content-between pe-3 mb-1">
                        <label className="form-check-label" for="evidenced_4">
                           Diagnosed by qualified physician
                        </label>
                        <input
                           className="form-check-input"
                           type="checkbox"
                           value=""
                           id="evidenced_4"
                        />
                     </div>
                     <div className="d-flex justify-content-between pe-3 mb-1">
                        <label className="form-check-label" for="evidenced_5">
                           No evidence (Trial drug)
                        </label>
                        <input
                           className="form-check-input"
                           type="checkbox"
                           value=""
                           id="evidenced_5"
                        />
                     </div>
                  </div>
               </div>

               {PresentIllness.map((item, key) => (
                  <div
                     key={item.IllnessId}
                     value={item.IllnessId}
                     className="d-flex justify-content-between"
                  >
                     <div className="">
                        <p className="font-16"> {item.IllnessCode}</p>
                     </div>
                     <div className="">
                        <div className="form-check form-check-inline">
                           <input
                              className="form-check-input"
                              type="radio"
                              name={item.IllnessId}
                              id="inlineRadio1"
                              value="no"
                              onChange={(e) =>
                                 handleChangeRadio(
                                    item.IllnessId,
                                    e.target.value
                                 )
                              }
                              onDoubleClick={(e) => {
                                 e.target.checked = false;
                                 e.target.value = null;
                                 handleRemove(item.IllnessId);
                              }}
                           />
                           <label
                              className="form-check-label text-capitalize"
                              htmlFor="inlineRadio1"
                           >
                              no nnjnjh
                           </label>
                        </div>

                        <div className="form-check form-check-inline">
                           <input
                              className="form-check-input"
                              type="radio"
                              name={item.IllnessId}
                              id="inlineRadio2"
                              value="yes"
                              onChange={(e) =>
                                 handleChangeRadio(
                                    item.IllnessId,
                                    e.target.value
                                 )
                              }
                              onDoubleClick={(e) => {
                                 e.target.checked = false;
                                 e.target.value = null;
                                 handleRemove(item.IllnessId);
                              }}
                           />
                           <label
                              className="form-check-label text-capitalize"
                              htmlFor="inlineRadio2"
                           >
                              yes
                           </label>
                        </div>
                     </div>
                  </div>
               ))}

               {/* Other */}
               <div className="mb-1">
                  <p className="font-16 mb-1">Others</p>
                  <div className="position-relative onBtn">
                     <OthersField />
                  </div>
               </div>
            </div>
         )}

         {/* show component on click  */}
         {isShown || (
            <div>
               <h2></h2>
            </div>
         )}
      </>
   );
};

export default PatientIllness;
