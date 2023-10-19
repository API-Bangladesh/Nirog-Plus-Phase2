import React, { useEffect, useState } from "react";
import Select from "react-select";
import { BiError } from "react-icons/bi";
import "./PatientReg.css";
import SectionTitle from "../SectionTitleDemo/SectionTitle";
import GlobalButton from "../GlobalBtn/GlobalButton";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import axios from "axios";
import { Button } from "react-bootstrap";
import { API_URL } from "../../helper/Constants";
import _ from "lodash";
import {
   showSuccessNotification,
   showErrorNotification,
} from "../../helper/notificationHelper";
import { loggedInUserData } from "../../helper/localStorageHelper";

const PatientReg = () => {
   const userData = loggedInUserData();
   // console.log(userData)
   const userBarcode = userData.barcode_format.barcode_prefix;
   // console.log(userBarcode);
   //genders
   const [genders, setDataGender] = useState([]);
   const getGenderCodeData = async () => {
      try {
         const response = await axios.get(`${API_URL}/api/genders`);
         if (response.status === 200) {
            setDataGender(response.data.Gender);
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getGenderCodeData();
      getHeadOfFamilyData();
      getMaritalStatusData();
      getDistrictData();
      // getUnionData();
   }, []);

   //selftype
   const [selftype, setData] = useState([]);
   const getHeadOfFamilyData = async () => {
      try {
         const response = await axios.get(`${API_URL}/api/self-type`);
         if (response.status === 200) {
            setData(response.data.SelfType);
         }
      } catch (error) {
         console.error(error);
      }
   };

   //maritalstatus
   const [maritalstatus, setDataMaritalstatus] = useState([]);
   const getMaritalStatusData = async () => {
      try {
         const response = await axios.get(`${API_URL}/api/marital-status`);
         if (response.status === 200) {
            setDataMaritalstatus(response.data.MaritalStatus);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const [districts, setDistricts] = useState([]);
   const [districtsParmanent, setDistrictsParmanent] = useState([]);
   const [upazilas, setUpazilas] = useState([]);
   const [upazilasParmanent, setUpazilasParmanent] = useState([]);
   const [unions, setUnions] = useState([]);
   const [unionsParmanent, setUnionsParmanent] = useState([]);

   const [selectedAddress, setSelectedAddress] = useState({
      District: "",
      DistrictParmanent: "",
      Thana: "",
      ThanaParmanent: "",
      Union: "",
      UnionParmanent: "",
   });

   //district
   const getDistrictData = async () => {
      try {
         const response = await axios.get(`${API_URL}/api/district`);
         if (response.status === 200) {
            let reArrangeData =
               response.data.District &&
               response.data.District.map((d) => {
                  return {
                     id: d?.id,
                     name: "addressInfo.District",
                     label: d?.name,
                     value: d?.id,
                  };
               });

            let reArrangeDataParmanent =
               response.data.District &&
               response.data.District.map((d) => {
                  return {
                     id: d?.id,
                     name: "addressInfo.DistrictParmanent",
                     label: d?.name,
                     value: d?.id,
                  };
               });

            setDistricts(reArrangeData);
            setDistrictsParmanent(reArrangeDataParmanent);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleDistrictChange = async (e) => {
      setUpazilas([]); // not necessary
      setUnions([]); // not necessary
      setFormData((prevFormData) => ({
         ...prevFormData,
         addressInfo: {
            ...prevFormData.addressInfo,
            Thana: "",
            Union: "",
         },
      }));

      setSelectedAddress((prev) => ({
         ...prev,
         Thana: "",
         Union: "",
      }));

      try {
         const response = await axios.get(`${API_URL}/api/upazilla`, {
            params: {
               district_id: e.value,
            },
         });
         if (response.status === 200) {
            let reArrangeData =
               response.data.Upazila &&
               response.data.Upazila.map((d) => {
                  return {
                     id: d?.id,
                     name: "addressInfo.Thana",
                     label: d?.name,
                     value: d?.id,
                  };
               });
            setUpazilas(reArrangeData);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleDistrictParmanentChange = async (e) => {
      setUpazilasParmanent([]);
      setUnionsParmanent([]);
      setFormData((prevFormData) => ({
         ...prevFormData,
         addressInfo: {
            ...prevFormData.addressInfo,
            ThanaParmanent: "",
            UnionParmanent: "",
         },
      }));

      setSelectedAddress((prev) => ({
         ...prev,
         ThanaParmanent: "",
         UnionParmanent: "",
      }));

      try {
         const response = await axios.get(`${API_URL}/api/upazilla`, {
            params: {
               district_id: e.value,
            },
         });

         if (response.status === 200) {
            let reArrangeData =
               response.data.Upazila &&
               response.data.Upazila.map((d) => {
                  return {
                     id: d?.id,
                     name: "addressInfo.ThanaParmanent",
                     label: d?.name,
                     value: d?.id,
                  };
               });
            setUpazilasParmanent(reArrangeData);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleUpazilaChange = async (e) => {
      setUnions([]); // not necessary
      setFormData((prevFormData) => ({
         ...prevFormData,
         addressInfo: {
            ...prevFormData.addressInfo,
            Union: "",
         },
      }));

      setSelectedAddress((prev) => ({
         ...prev,
         Union: "",
      }));

      try {
         const response = await axios.get(`${API_URL}/api/union`, {
            params: {
               upazilla_id: e.value,
            },
         });

         if (response.status === 200) {
            let reArrangeData =
               response.data.Union &&
               response.data.Union.map((d) => {
                  return {
                     id: d?.id,
                     name: "addressInfo.Union",
                     label: d?.name,
                     value: d?.id,
                  };
               });
            setUnions(reArrangeData);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleUpazilaParmanentChange = async (e) => {
      setUnionsParmanent([]); // not necessary
      setFormData((prevFormData) => ({
         ...prevFormData,
         addressInfo: {
            ...prevFormData.addressInfo,
            UnionParmanent: "",
         },
      }));

      setSelectedAddress((prev) => ({
         ...prev,
         UnionParmanent: "",
      }));

      try {
         const response = await axios.get(`${API_URL}/api/union`, {
            params: {
               upazilla_id: e.value,
            },
         });

         if (response.status === 200) {
            let reArrangeData =
               response.data.Union &&
               response.data.Union.map((d) => {
                  return {
                     id: d?.id,
                     name: "addressInfo.UnionParmanent",
                     label: d?.name,
                     value: d?.id,
                  };
               });
            setUnionsParmanent(reArrangeData);
         }
      } catch (error) {
         console.error(error);
      }
   };

   // // union
   // const getUnionData = async () => {
   //   try {
   //     const response = await axios.get(`${API_URL}/api/union`);
   //     if (response.status === 200) {
   //       setDataUnion(response.data.unions);
   //     }
   //   } catch (error) {
   //     console.error(error);
   //   }
   // };

   const handleInputChange = async (e) => {
      const { name, value } = e.target;
      const [section, field] = name.split(".");
      setFormData((prevFormData) => ({
         ...prevFormData,
         [section]: {
            ...prevFormData[section],
            [field]: value,
         },
      }));
   };

   const handleSelectInputChange = async (e) => {
      const { name, value } = e;
      const [section, field] = name.split(".");
      setFormData((prevFormData) => ({
         ...prevFormData,
         [section]: {
            ...prevFormData[section],
            [field]: value,
         },
      }));
      setSelectedAddress((prev) => ({
         ...prev,
         [field]: e,
      }));
   };

   const [formData, setFormData] = useState({
      patientInfo: {
         RegistrationId: userBarcode,
         fName: "",
         lName: "",
         patientAge: null,
         DOB: "",
         contactNumber: "",
         GenderId: "",
         idType: "",
         ID: "",
         MariatalStatus: "",
         PatientPhoto: "",
         selfType: "",
         BarCodeId: "c52c9718-8b90-4b44-9267-000011ce53a6",
         FIngerPrintId: "68ED1DC5-EB4E-483A-B112-000021639E98",
         WorkPlaceId: "1DCD603B-963B-4782-91F6-7B1755473AA3",
         WorkPlaceBranchId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
         PatientCode: "",
         OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
         usersID: "1",
         CreateUser: userData?.name,
      },
      addressInfo: {
         AddressLine1: "",
         AddressLine1Parmanent: "",
         AddressLine2: "",
         AddressLine2Parmanent: "nnnn",
         Village: "",
         VillageParmanent: "",
         Thana: "",
         ThanaParmanent: "",
         District: "",
         DistrictParmanent: "",
         Upazila: "",
         UpazilaParmanent: "",
         Union: "",
         UnionParmanent: "",
         PostCode: "",
         PostCodeParmanent: "",
         Country: "Bangladesh",
         CountryParmanent: "",
         Camp: "",
         BlockNumber: "",
         Majhi: "",
         TentNumber: "",
         FCN: "",
         OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
      },
   });

   const [errors, setErrors] = useState({});

   // const doValidation = () => {
   //   return new Promise(function (resolve, reject) {
   //     const { RegistrationId, GenderId, MariatalStatus } = formData.patientInfo;
   //     let myErrors = {};

   //     if (_.isEmpty(RegistrationId)) {
   //       myErrors.RegistrationId = "Required";
   //     }
   //     if (_.isEmpty(GenderId)) {
   //       myErrors.GenderId = "Required";
   //     }
   //     if (_.isEmpty(MariatalStatus)) {
   //       myErrors.MariatalStatus = "Required";
   //     }

   //     if (_.isEmpty(myErrors)) {
   //       setErrors({});
   //       resolve("Ok");
   //     } else {
   //       setErrors(myErrors);
   //       reject("Error");
   //     }
   //   });
   // };

   const doValidation = () => {
      return new Promise(function (resolve, reject) {
         const { RegistrationId, GenderId, MariatalStatus } =
            formData.patientInfo;
         const {
            District,
            DistrictParmanent,
            Thana,
            ThanaParmanent,
            Union,
            UnionParmanent,
         } = formData.addressInfo;

         let myErrors = {};

         if (_.isEmpty(RegistrationId)) {
            myErrors.RegistrationId = "Registration ID is required.";
         }
         if (_.isEmpty(GenderId)) {
            myErrors.GenderId = "Gender is required.";
         }
         if (_.isEmpty(MariatalStatus)) {
            myErrors.MariatalStatus = "Marital Status is required.";
         }
         if (_.isEmpty(District)) {
            myErrors.District = "District is required.";
         }
         if (_.isEmpty(DistrictParmanent)) {
            myErrors.DistrictParmanent = "District is required.";
         }
         if (_.isEmpty(Thana)) {
            myErrors.Thana = "Thana is required.";
         }
         if (_.isEmpty(ThanaParmanent)) {
            myErrors.ThanaParmanent = "Thana is required.";
         }
         if (_.isEmpty(Union)) {
            myErrors.Union = "Union is required.";
         }
         if (_.isEmpty(UnionParmanent)) {
            myErrors.UnionParmanent = "Union is required.";
         }

         if (_.isEmpty(myErrors)) {
            setErrors({});
            resolve("Ok");
         } else {
            setErrors(myErrors);
            // showErrorNotification("Error", "Please Fill In the Required Fields!");
            reject("Error");
         }
      });
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      // console.log(formData)
      // return
      try {
         // doValidation();
         const codeCheckResponse = await axios.post(
            `${API_URL}/api/registration-code-check`,
            { registrationCode: formData.patientInfo.RegistrationId }
         );
         if (codeCheckResponse.data.code === 200) {
            try {
               doValidation();
               const registrationResponse = await axios.post(
                  `${API_URL}/api/patient-reg-create`,
                  formData
               );
               // console.log(registrationResponse);
               if (registrationResponse.data) {
                  showSuccessNotification(
                     "Success",
                     registrationResponse.data.message
                  );
                  window.location = `/take-photo?PatientId=${registrationResponse.data.patientDetails.PatientId}`;
               } else {
                  showErrorNotification(
                     "Error",
                     registrationResponse.data.message
                  );
               }
            } catch (error) {
               showErrorNotification(
                  "Error",
                  "Please Fill In the Required Fields!"
               );
            }
         }
      } catch (error) {
         showErrorNotification("Error", error.response.data.message);
      }
   };

   // const handleSubmit = async (event) => {
   //   event.preventDefault();
   //   try {
   //     await doValidation();
   //     const response = await axios.post(
   //       `${API_URL}/api/patient-reg-create`,
   //       formData
   //     );
   //     showSuccessNotification("Success", response.data.message);
   //     window.location = `/take-photo?PatientId=${response?.data?.patientDetails?.PatientId}`;
   //   } catch (error) {
   //     console.log(error);
   //     showErrorNotification("Error", "An error occurred.");
   //   }
   // };

   // const handleSubmit = async (event) => {
   //   event.preventDefault();

   //   try {
   //     await doValidation();

   //     const response = await axios.post(
   //       `${API_URL}/api/patient-reg-create`,
   //       formData
   //     );

   //     Swal.fire({
   //       icon: "success",
   //       title: "Success",
   //       text: response.data.message,
   //     }).then(function () {
   //       window.location = `/take-photo?PatientId=${response?.data?.patientDetails?.PatientId}`;
   //     });
   //   } catch (error) {
   //     console.log(error);

   //     Swal.fire({
   //       icon: "error",
   //       title: "Error",
   //       text: "An error occurred.",
   //     });
   //   }
   // };
   const calculateAge = () => {
      if (!formData.patientInfo.DOB) {
         return;
      }
      const today = new Date();
      const birthdateDate = new Date(formData.patientInfo.DOB);
      let ageYear = today.getFullYear() - birthdateDate.getFullYear();
      let ageMonth = today.getMonth() - birthdateDate.getMonth();
      let ageDay = today.getDate() - birthdateDate.getDate();
      if (ageDay < 0) {
         ageMonth--;
         ageDay += daysInMonth(today.getMonth() - 1, today.getFullYear());
      }
      if (ageDay > 15) {
         ageMonth++;
      }
      if (ageMonth > 6) {
         ageYear++;
      }
      const updatedFormData = {
         ...formData,
         patientInfo: {
            ...formData.patientInfo,
            patientAge: ageYear,
         },
      };
      setFormData(updatedFormData);
   };

   const daysInMonth = (month, year) => {
      return new Date(year, month + 1, 0).getDate();
   };

   useEffect(() => {
      calculateAge();
   }, [formData.patientInfo.DOB]);

   return (
      <>
         <section className="patient-registration">
            <SectionBanner title="patient registration" />

            <div className="container">
               <form onSubmit={handleSubmit} className="mt-3">
                  <div className="row justify-content-center">
                     <div className="col-lg-6">
                        <SectionTitle title="Registration" />
                        <div className="mb-3 shadowme">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Registration Number{" "}
                              <span className="text-danger font-20 ">*</span>
                           </label>
                           <input
                              type="text"
                              name="patientInfo.RegistrationId"
                              value={formData.patientInfo.RegistrationId}
                              onChange={handleInputChange}
                              className={`form-control form-radious inputBox ${
                                 errors.RegistrationId ? "invalid-field" : ""
                              }`}
                              placeholder="Ex: 9087663320"
                           />
                           {/* {errors.RegistrationId && <span className="error">{errors.RegistrationId}</span>} */}
                        </div>

                        <div className="mb-3 shadowme">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              First name
                           </label>
                           <input
                              type="text"
                              name="patientInfo.fName"
                              value={formData.patientInfo.fName}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>

                        <div className="mb-3 shadowme">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Last name
                           </label>
                           <input
                              type="text"
                              name="patientInfo.lName"
                              value={formData.patientInfo.lName}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Date of Birth
                           </label>
                           <input
                              type="date"
                              name="patientInfo.DOB"
                              value={formData.patientInfo.DOB}
                              onChange={handleInputChange}
                              className="dateIcon form-control form-radious inputBox"
                           />
                        </div>

                        <div className="mb-3 shadowme position-relative">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Patient Age
                           </label>
                           <input
                              type="number"
                              name="patientInfo.patientAge"
                              value={formData.patientInfo.patientAge}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Ex: 25"
                           />
                           <div className="iputComon">Year</div>
                        </div>
                        <div className="mb-3 shadowme">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Contact Number
                           </label>
                           <input
                              type="number"
                              name="patientInfo.contactNumber"
                              value={formData.patientInfo.contactNumber}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Ex: 01600000000"
                           />
                        </div>
                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Gender{" "}
                              <span className="text-danger font-20 ">*</span>
                           </label>
                           <select
                              id="Select"
                              name="patientInfo.GenderId"
                              value={formData.patientInfo.GenderId}
                              onChange={handleInputChange}
                              className={`form-select inputBox  ${
                                 errors?.GenderId && "invalid-field"
                              }`}
                           >
                              <option selected value="" disabled>
                                 Select
                              </option>
                              {genders.map((item) => (
                                 <option
                                    key={item.GenderId}
                                    value={item.GenderId}
                                 >
                                    {item.GenderCode}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <div className="row">
                           <div className="col-lg-12">
                              <div className="d-flex">
                                 <div className="form-check me-3 mb-2">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="patientInfo.idType"
                                       value="NID"
                                       checked={
                                          formData.patientInfo.idType === "NID"
                                       }
                                       onChange={handleInputChange}
                                       onDoubleClick={() => {
                                          setFormData({
                                             ...formData,
                                             patientInfo: {
                                                ...formData.patientInfo,
                                                idType: "",
                                             },
                                          });
                                       }}
                                    />

                                    <label
                                       className="form-check-label"
                                       htmlFor="nid1"
                                    >
                                       NID
                                    </label>
                                 </div>
                                 <div className="form-check me-3 mb-2">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="patientInfo.idType"
                                       value="Birth"
                                       checked={
                                          formData.patientInfo.idType ===
                                          "Birth"
                                       }
                                       onChange={handleInputChange}
                                    />
                                    <label
                                       className="form-check-label"
                                       htmlFor="nid2"
                                    >
                                       Birth
                                    </label>
                                 </div>
                                 <div className="form-check me-3 mb-2">
                                    <input
                                       className="form-check-input"
                                       type="radio"
                                       name="patientInfo.idType"
                                       value="IDNO"
                                       checked={
                                          formData.patientInfo.idType === "IDNO"
                                       }
                                       onChange={handleInputChange}
                                       onDoubleClick={() => {
                                          setFormData({
                                             ...formData,
                                             patientInfo: {
                                                ...formData.patientInfo,
                                                idType: "",
                                             },
                                          });
                                       }}
                                    />
                                    <label
                                       className="form-check-label"
                                       htmlFor="nid3"
                                    >
                                       ID No.
                                    </label>
                                 </div>
                              </div>
                           </div>

                           <div className="col-lg-8">
                              <div className="mb-3">
                                 <input
                                    type="number"
                                    name="patientInfo.ID"
                                    value={formData.patientInfo.ID}
                                    onChange={handleInputChange}
                                    onDoubleClick={() => {
                                       setFormData({
                                          ...formData,
                                          patientInfo: {
                                             ...formData.patientInfo,
                                             idType: "",
                                          },
                                       });
                                    }}
                                    className="form-control form-radious inputBox"
                                    placeholder="Ex: 199503016666100"
                                 />
                              </div>
                           </div>

                           <div className="col-lg-4">
                              <select
                                 id="Select"
                                 name="patientInfo.selfType"
                                 value={formData.patientInfo.selfType}
                                 onChange={handleInputChange}
                                 className="form-select inputBox"
                              >
                                 <option selected value="" disabled>
                                    Select
                                 </option>
                                 {selftype.map((item) => (
                                    <option
                                       key={item.HeadOfFamilyId}
                                       value={item.HeadOfFamilyId}
                                    >
                                       {item.HeadOfFamilyCode}
                                    </option>
                                 ))}
                              </select>
                           </div>
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Marital Status
                              <span className="text-danger font-20 ">*</span>
                           </label>
                           <select
                              id="Select"
                              name="patientInfo.MariatalStatus"
                              value={formData.patientInfo.MariatalStatus}
                              onChange={handleInputChange}
                              //className="form-select inputBox"
                              className={`form-select inputBox  ${
                                 errors?.MariatalStatus && "invalid-field"
                              }`}
                           >
                              <option selected value="" disabled>
                                 Select
                              </option>
                              {maritalstatus.map((item) => (
                                 <option
                                    key={item.MaritalStatusId}
                                    value={item.MaritalStatusId}
                                 >
                                    {item.MaritalStatusCode}
                                 </option>
                              ))}
                           </select>
                        </div>

                        <div className="mb-3 shadowme">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Spouse Name (if any)
                           </label>
                           <input
                              type="text"
                              name=""
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>

                        <div className="mb-3 shadowme">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Father's Name
                           </label>
                           <input
                              type="text"
                              name=""
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>
                        <div className="mb-3 shadowme">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Mother's Name
                           </label>
                           <input
                              type="text"
                              name=""
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>
                        <div className="mb-3 shadowme">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Family Members
                           </label>
                           <input
                              type="number"
                              name=""
                              className="form-control form-radious inputBox"
                              placeholder="Ex: 5"
                           />
                        </div>
                        <div className="mb-3 shadowme">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Head of Family
                           </label>
                           <select
                              id="Select"
                              name="patientInfo.MariatalStatus"
                              // value={formData.patientInfo.MariatalStatus}
                              onChange={handleInputChange}
                              className={`form-select inputBox  ${
                                 errors?.MariatalStatus && "invalid-field"
                              }`}
                           >
                              <option selected value="" disabled>
                                 Select
                              </option>
                              <option value="">
                                 Father
                              </option>
                              <option value="">
                                 Mother
                              </option>
                              {/* {maritalstatus.map((item) => (
                                 <option
                                    key={item.MaritalStatusId}
                                    value={item.MaritalStatusId}
                                 >
                                    {item.MaritalStatusCode}
                                 </option>
                              ))} */}
                           </select>
                        </div>
                        <div className="mb-3 shadowme">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize mb-0"
                           >
                              Childrens
                           </label>
                           <div className="row">
                              <div className="col-lg-4">
                                 <div class="">
                                    <label
                                       for="exampleFormControlInput1"
                                       class="form-label mt-2"
                                    >
                                       Age 0 to 1
                                    </label>
                                    <input
                                       type="number"
                                       class="form-control form-radious inputBox"
                                       id=""
                                       placeholder="Ex: 1"
                                    />
                                 </div>
                              </div>
                              <div className="col-lg-4">
                                 <div class="">
                                    <label
                                       for="exampleFormControlInput1"
                                       class="form-label mt-2"
                                    >
                                       Age 1 to 5
                                    </label>
                                    <input
                                       type="number"
                                       class="form-control form-radious inputBox"
                                       id=""
                                       placeholder="Ex: 0"
                                    />
                                 </div>
                              </div>
                              <div className="col-lg-4">
                                 <div class="">
                                    <label
                                       for="exampleFormControlInput1"
                                       class="form-label mt-2"
                                    >
                                       Age &#62; 5
                                    </label>
                                    <input
                                       type="number"
                                       class="form-control form-radious inputBox"
                                       id=""
                                       placeholder="Ex: 3"
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Education
                           </label>
                           <select
                              id="Select"
                              name="patientInfo.MariatalStatus"
                              // value={formData.patientInfo.MariatalStatus}
                              onChange={handleInputChange}
                              className={`form-select inputBox  ${
                                 errors?.MariatalStatus && "invalid-field"
                              }`}
                           >
                              <option selected value="" disabled>
                                 Select
                              </option>
                              <option value="">
                                 SSC
                              </option>
                              <option value="">
                                 HSC
                              </option>
                              {/* {maritalstatus.map((item) => (
                                 <option
                                    key={item.MaritalStatusId}
                                    value={item.MaritalStatusId}
                                 >
                                    {item.MaritalStatusCode}
                                 </option>
                              ))} */}
                           </select>
                        </div>
                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Religion
                           </label>
                           <select
                              id="Select"
                              name="patientInfo.MariatalStatus"
                              // value={formData.patientInfo.MariatalStatus}
                              onChange={handleInputChange}
                              className={`form-select inputBox  ${
                                 errors?.MariatalStatus && "invalid-field"
                              }`}
                           >
                              <option selected value="" disabled>
                                 Select
                              </option>
                              <option value="">
                                 Islam
                              </option>
                              <option value="">
                                 Hindu
                              </option>
                              {/* {maritalstatus.map((item) => (
                                 <option
                                    key={item.MaritalStatusId}
                                    value={item.MaritalStatusId}
                                 >
                                    {item.MaritalStatusCode}
                                 </option>
                              ))} */}
                           </select>
                        </div>

                     </div>
                  </div>

                  {/* Present Address information */}
                  <div className="row justify-content-center">
                     <div className="col-lg-6">
                        <SectionTitle title="Present Address" />
                        <div className="mb-3">
                           <label
                              htmlFor="comments"
                              className="form-label text-capitalize"
                           >
                              Address
                           </label>
                           <textarea
                              name="addressInfo.AddressLine1"
                              value={formData.addressInfo.AddressLine1}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="type here"
                              id="comments"
                           ></textarea>
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Village
                           </label>
                           <input
                              type="text"
                              name="addressInfo.Village"
                              value={formData.addressInfo.Village}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              District{" "}
                              <span className="text-danger font-20 ">*</span>
                           </label>
                           <Select
                              className={`form-select form-radious inputBox c-select ${
                                 errors?.District && "invalid-field"
                              }`}
                              classNamePrefix="select"
                              options={districts}
                              onChange={(e) => {
                                 handleSelectInputChange(e);
                                 handleDistrictChange(e);
                              }}
                              value={selectedAddress.District}
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Upazila{" "}
                              <span className="text-danger font-20 ">*</span>
                           </label>
                           <Select
                              className={`form-select form-radious inputBox c-select ${
                                 errors?.Thana && "invalid-field"
                              }`}
                              classNamePrefix="select"
                              options={upazilas}
                              onChange={(e) => {
                                 handleSelectInputChange(e);
                                 handleUpazilaChange(e);
                              }}
                              value={selectedAddress.Thana}
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Union{" "}
                              <span className="text-danger font-20 ">*</span>
                           </label>
                           <Select
                              className={`form-select form-radious inputBox c-select ${
                                 errors?.Union && "invalid-field"
                              }`}
                              classNamePrefix="select"
                              options={unions}
                              onChange={handleSelectInputChange}
                              value={selectedAddress.Union}
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Post Code
                           </label>
                           <input
                              type="number"
                              name="addressInfo.PostCode"
                              value={formData.addressInfo.PostCode}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Ex: 1207"
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Country
                           </label>
                           <input
                              type="text"
                              name="addressInfo.Country"
                              value={formData.addressInfo.Country}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Permanent Address information */}
                  <div className="row justify-content-center">
                     <div className="col-lg-6">
                        <SectionTitle title="Permanent Address" />
                        <div className="mb-3">
                           <label
                              htmlFor="comments"
                              className="form-label text-capitalize"
                           >
                              Address
                           </label>
                           <textarea
                              name="addressInfo.AddressLine1Parmanent"
                              value={formData.addressInfo.AddressLine1Parmanent}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="type here"
                              id="comments"
                           ></textarea>
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Village
                           </label>
                           <input
                              type="text"
                              name="addressInfo.VillageParmanent"
                              value={formData.addressInfo.VillageParmanent}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>

                        {/* <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Union
                  </label>
                  <input
                    type="text"
                    name="addressInfo.ThanaParmanent"
                    value={formData.addressInfo.ThanaParmanent}
                    onChange={handleInputChange}
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div> */}

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              District{" "}
                              <span className="text-danger font-20 ">*</span>
                           </label>
                           <Select
                              className={`form-select form-radious inputBox c-select ${
                                 errors?.DistrictParmanent && "invalid-field"
                              }`}
                              classNamePrefix="select"
                              options={districtsParmanent}
                              onChange={(e) => {
                                 handleSelectInputChange(e);
                                 handleDistrictParmanentChange(e);
                              }}
                              value={selectedAddress.DistrictParmanent}
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Upazila{" "}
                              <span className="text-danger font-20 ">*</span>
                           </label>
                           <Select
                              className={`form-select form-radious inputBox c-select ${
                                 errors?.ThanaParmanent && "invalid-field"
                              }`}
                              classNamePrefix="select"
                              options={upazilasParmanent}
                              onChange={(e) => {
                                 handleSelectInputChange(e);
                                 handleUpazilaParmanentChange(e);
                              }}
                              value={selectedAddress.ThanaParmanent}
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Union{" "}
                              <span className="text-danger font-20 ">*</span>
                           </label>
                           <Select
                              className={`form-select form-radious inputBox c-select ${
                                 errors?.UnionParmanent && "invalid-field"
                              }`}
                              classNamePrefix="select"
                              options={unionsParmanent}
                              onChange={handleSelectInputChange}
                              value={selectedAddress.UnionParmanent}
                           />
                        </div>

                        {/* <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                  Union
                  </label>
                  <select
                    id="Select"
                    name="addressInfo.ThanaParmanent"
                    value={formData.addressInfo.ThanaParmanent}
                    onChange={handleInputChange}
                    className="form-control form-radious inputBox"
                  >
                    <option selected value="" disabled>
                      Select
                    </option>
                    {union.map((item) => (
                      <option
                        key={item.UnionName}
                        value={item.UnionName}
                      >
                        {item.UnionName}
                      </option>
                    ))}
                  </select>
                </div> */}

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Post Code
                           </label>
                           <input
                              type="number"
                              name="addressInfo.PostCodeParmanent"
                              value={formData.addressInfo.PostCodeParmanent}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Ex: 1207"
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Country
                           </label>
                           <input
                              type="text"
                              name="addressInfo.CountryParmanent"
                              value={formData.addressInfo.CountryParmanent}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>
                     </div>
                  </div>

                  {/* camp information */}
                  <div className="row  justify-content-center">
                     <div className="col-lg-6">
                        <SectionTitle title="FDMN camp" />
                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Camp
                           </label>
                           <input
                              type="text"
                              name="addressInfo.Camp"
                              value={formData.addressInfo.Camp}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Block Number
                           </label>
                           <input
                              type="text"
                              name="addressInfo.BlockNumber"
                              value={formData.addressInfo.BlockNumber}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Ex: A"
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Majhi / Captain
                           </label>
                           <input
                              type="text"
                              name="addressInfo.Majhi"
                              value={formData.addressInfo.Majhi}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Type here"
                           />
                        </div>
                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              Tent Number
                           </label>
                           <input
                              type="number"
                              name="addressInfo.TentNumber"
                              value={formData.addressInfo.TentNumber}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Ex: 558560"
                           />
                        </div>

                        <div className="mb-3">
                           <label
                              htmlFor=""
                              className="form-label text-capitalize"
                           >
                              FCN Number
                           </label>
                           <input
                              type="number"
                              name="addressInfo.FCN"
                              value={formData.addressInfo.FCN}
                              onChange={handleInputChange}
                              className="form-control form-radious inputBox"
                              placeholder="Ex: 330976547"
                           />
                        </div>
                     </div>
                  </div>

                  {/* <div className="text-center mt-3 position-relative">
              <SingleButton btnOne="save & next" link="/go-pic" />
            </div>
             */}
                  <div className="text-center mt-3 position-relative">
                     <Button
                        className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined"
                        block="block"
                        type="submit"
                     >
                        save & next
                     </Button>
                  </div>
               </form>
            </div>

            {/* global button */}
            <GlobalButton />
         </section>
      </>
   );
};

export default PatientReg;
