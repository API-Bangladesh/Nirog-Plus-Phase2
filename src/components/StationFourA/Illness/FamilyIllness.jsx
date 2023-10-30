import React, { useEffect, useState } from "react";
import OthersField from "../Illness/OthersField";
import axios from "axios";
import { API_URL } from "../../../helper/Constants";
import { loggedInUserData } from "../../../helper/localStorageHelper";
import { useSelector } from "react-redux";
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

   //FamilyIllness
   const [FamilyIllness, setFamilyIllness] = useState([]);

   const getFamilyIllnessData = async () => {
      try {
         const response = await axios.get(
            `${API_URL}/api/patient-ho-family-illness`
         );

         if (response.status === 200) {
            setFamilyIllness(response.data.data);
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getFamilyIllnessData();
   }, []);

   const handleChangeRadio = (illnessId, value) => {
      let myFormData = { ...formData };

      const index = myFormData.PatientHOFamilyIllness.findIndex(
         (object) => object.illnessId === illnessId
      );

      if (index === -1) {
         myFormData.PatientHOFamilyIllness.push({
            PatientId: PatientId,
            illFamilyMemberId: "DB30904B-5844-4888-B22D-0F4E1F50FB74",
            illnessId: illnessId,
            otherIllness: "",
            Status: value,
            CreateUser: userName,
            UpdateUser: userName,
            OrgId: OrgId,
         });
      }

      if (index === 0) {
         myFormData.PatientHOFamilyIllness =
            myFormData.PatientHOFamilyIllness.filter((item) => {
               if (item.illnessId == illnessId) {
                  item.Status = value;
               }
               return item;
            });
      }

      setFormData(myFormData);
      console.log(myFormData?.PatientHOFamilyIllness);
   };

   const handleRemove = (illnessId) => {
      let myFormData = { ...formData };

      myFormData.PatientHOFamilyIllness =
         myFormData.PatientHOFamilyIllness.filter((item) => {
            return item.illnessId != illnessId;
         });

      setFormData(myFormData);
   };

   const [isDiv1Open, setIsDiv1Open] = useState(false);
   const [isDiv2Open, setIsDiv2Open] = useState(false);

   const handleRadio1Click = () => {
      setIsDiv1Open(!isDiv1Open);
      setIsDiv2Open(false); // Close the other div
   };

   const handleRadio2Click = () => {
      setIsDiv2Open(!isDiv2Open);
      setIsDiv1Open(false); // Close the other div
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
               {FamilyIllness.map((item, i) => (
                  <div className="DemoAll">
                     <div
                        key={item.IllnessId}
                        value={item.IllnessId}
                        className="d-flex justify-content-between"
                     >
                        <p className="font-16">{item.IllnessCode}</p>
                        <div className="">
                           <div className="form-check form-check-inline">
                              <input
                                 onClick={handleRadio1Click}
                                 className="form-check-input"
                                 type="radio"
                                 name={i}
                                 id="Hypertension1"
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
                                 htmlFor="Hypertension1"
                              >
                                 no
                              </label>
                           </div>
                           <div className="form-check form-check-inline">
                              <input
                                 onClick={handleRadio2Click}
                                 className="form-check-input"
                                 type="radio"
                                 name={i}
                                 id="Hypertension2"
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
                                 htmlFor="Hypertension2"
                              >
                                 yes
                              </label>
                           </div>
                        </div>
                     </div>

                     {/* Yes selected data start Here  */}
                     {isDiv2Open && (
                        <div className="slide-down bg-light mb-4 py-2 d-flex">
                           <div class="form-check ms-3">
                              <input
                                 class="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="father"
                              />
                              <label
                                 class="form-check-label"
                                 for="father"
                              >
                                 Father
                              </label>
                           </div>
                           <div class="form-check ms-3">
                              <input
                                 class="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="mother"
                              />
                              <label
                                 class="form-check-label"
                                 for="mother"
                              >
                                 Mother
                              </label>
                           </div>
                           <div class="form-check ms-3">
                              <input
                                 class="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="siblings"
                              />
                              <label
                                 class="form-check-label"
                                 for="siblings"
                              >
                                 Siblings
                              </label>
                           </div>
                           <div class="form-check ms-3">
                              <input
                                 class="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="aunt"
                              />
                              <label
                                 class="form-check-label"
                                 for="aunt"
                              >
                                 Aunt
                              </label>
                           </div>
                           <div class="form-check ms-3">
                              <input
                                 class="form-check-input"
                                 type="checkbox"
                                 value=""
                                 id="grandParents"
                              />
                              <label
                                 class="form-check-label"
                                 for="grandParents"
                              >
                                 Grand Parents
                              </label>
                           </div>

                        </div>
                     )}
                     {/* Yes selected data end Here  */}
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
