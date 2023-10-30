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

  // FamilyIllness expansion state
  const [familyIllnessExpanded, setFamilyIllnessExpanded] = useState(
    FamilyIllness.map(() => false)
  );

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

  const handleChangeRadio = (i, illnessId, value, e) => {
    const updatedExpansion = [...familyIllnessExpanded];
    updatedExpansion[i] = e.target.checked && value === "yes";
    setFamilyIllnessExpanded(updatedExpansion);

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
        OtherIllFamilyMember: "",
      });
    }

    if (index === 0) {
      myFormData.PatientHOFamilyIllness =
        myFormData.PatientHOFamilyIllness.filter((item) => {
          if (item.illnessId == illnessId) {
            item.Status = value;
            item.OtherIllFamilyMember = "";
          }
          return item;
        });
    }

    setFormData(myFormData);
    console.log(myFormData?.PatientHOFamilyIllness);
  };

  const handleRemove = (illnessId, i) => {
    const updatedExpansion = [...familyIllnessExpanded];
    updatedExpansion[i] = false;
    setFamilyIllnessExpanded(updatedExpansion);

    let myFormData = { ...formData };

    myFormData.PatientHOFamilyIllness =
      myFormData.PatientHOFamilyIllness.filter((item) => {
        // return item.illnessId != illnessId;
        if (item.illnessId !== illnessId) {
          return true;
        } else {
          item.OtherIllFamilyMember = "";
          return false;
        }
      });

    setFormData(myFormData);
    console.log(myFormData?.PatientHOFamilyIllness);
  };

  const handleCheckboxChange = (IllnessId, familyMember, index) => {
    const updatedExpansion = [...familyIllnessExpanded];
    updatedExpansion[index] = true; // Ensure the section is expanded
    setFamilyIllnessExpanded(updatedExpansion);

    // Update the OtherIllFamilyMember field based on the selected checkboxes
    let myFormData = { ...formData };

    // Find the relevant item in PatientHOFamilyIllness
    const item = myFormData.PatientHOFamilyIllness.find(
      (object) => object.illnessId === IllnessId
    );

    if (item) {
      // Split the existing OtherIllFamilyMember string into an array
      const familyMembersArray = item.OtherIllFamilyMember.split(",");

      // Check if the family member is already included
      const isFamilyMemberIncluded = familyMembersArray.includes(familyMember);

      if (isFamilyMemberIncluded) {
        // Remove the family member from the array
        const updatedFamilyMembersArray = familyMembersArray.filter(
          (member) => member !== familyMember
        );

        // Join the array back into a string with commas
        // item.OtherIllFamilyMember = updatedFamilyMembersArray.join(",");
        item.OtherIllFamilyMember = updatedFamilyMembersArray
        .filter((member) => member) // Filter out empty values
        .join(",");
      } else {
        // Add the family member to the array
        familyMembersArray.push(familyMember);

        // Join the array back into a string with commas
        // item.OtherIllFamilyMember = familyMembersArray.join(",");
        item.OtherIllFamilyMember = familyMembersArray
        .filter((member) => member) // Filter out empty values
        .join(",");
      }
      setFormData(myFormData);
      console.log(myFormData?.PatientHOFamilyIllness);
    }
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
            <div className="DemoAll" key={i}>
              <div
                key={item.IllnessId}
                value={item.IllnessId}
                className="d-flex justify-content-between"
              >
                <p className="font-16">{item.IllnessCode}</p>
                <div className="">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={i}
                      id="Hypertension1"
                      value="no"
                      onChange={(e) =>
                        handleChangeRadio(i, item.IllnessId, e.target.value, e)
                      }
                      onDoubleClick={(e) => {
                        e.target.checked = false;
                        e.target.value = null;
                        handleRemove(item.IllnessId, i);
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
                      className="form-check-input"
                      type="radio"
                      name={i}
                      id="Hypertension2"
                      value="yes"
                      onChange={(e) =>
                        handleChangeRadio(i, item.IllnessId, e.target.value, e)
                      }
                      onDoubleClick={(e) => {
                        e.target.checked = false;
                        e.target.value = null;
                        handleRemove(item.IllnessId, i);
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
              {familyIllnessExpanded[i] && (
                <div className="slide-down bg-light mb-4 py-2 d-flex">
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="father"
                      id="father"
                      onChange={() =>
                        handleCheckboxChange(item.IllnessId, "father", i)
                      }
                    />
                    <label className="form-check-label" htmlFor="father">
                      Father
                    </label>
                  </div>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="mother"
                      id="mother"
                      onChange={() =>
                        handleCheckboxChange(item.IllnessId, "mother", i)
                      }
                    />
                    <label className="form-check-label" htmlFor="mother">
                      Mother
                    </label>
                  </div>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="siblings"
                      onChange={() =>
                        handleCheckboxChange(item.IllnessId, "siblings", i)
                      }
                    />
                    <label className="form-check-label" htmlFor="siblings">
                      Siblings
                    </label>
                  </div>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="aunt"
                      onChange={() =>
                        handleCheckboxChange(item.IllnessId, "aunt", i)
                      }
                    />
                    <label className="form-check-label" htmlFor="aunt">
                      Aunt
                    </label>
                  </div>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="grandParents"
                      onChange={() =>
                        handleCheckboxChange(item.IllnessId, "grandParents", i)
                      }
                    />
                    <label className="form-check-label" htmlFor="grandParents">
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
