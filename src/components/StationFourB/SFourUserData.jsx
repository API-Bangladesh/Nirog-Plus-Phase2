import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SectionTitle from "../../components/SectionTitleDemo/SectionTitle";
import GlobalButton from "../../components/GlobalBtn/GlobalButton";
import SingleButton from "../../components/Buttons/SingleButton/SingleButton";
import StationButton from "../Buttons/StationButton/StationButton";
import { Link } from "react-router-dom";
import SectionBanner from "../../components/SectionBannerDemo/SectionBanner";
import axios from "axios";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { API_URL } from "../../helper/Constants";
import { useSelector } from "react-redux";
import PatientShortInfo from "../Common/PatientShortInfo";
import { loggedInUserData } from "../../helper/localStorageHelper";

const SFourUserData = () => {
  const logedinUserData = loggedInUserData();
  const user = logedinUserData.name;

  const { patient } = useSelector((state) => state.patients);

  const [PatientId] = useState(patient?.PatientId);

  const [startDate, setStartDate] = useState(new Date());

  // Store form data in state
  const [gravida, setGravida] = useState([]);
  const [para, setPara] = useState([]);
  const [stillBirth, setStillBirth] = useState([]);
  const [miscarriage, setMiscarriage] = useState([]);
  const [mr, setMr] = useState([]);
  const [liveMale, setLiveMale] = useState([]);
  const [liveFemale, setLiveFemale] = useState([]);
  const [moralityMale, setMoralityMale] = useState([]);
  const [moralityFemale, setMoralityFemale] = useState([]);
  const [isPregnant, setIsPregnant] = useState([]);
  const [lmp, setLMP] = useState([]);
  const [comment, setComment] = useState([]);
  const [contraceptionMethod, setContraceptionMethod] = useState("");
  const [menstruationProduct, setMenstruationProduct] = useState("");
  const [productReplace, setProductReplace] = useState("");
  const [isConsent, setIsConsent] = useState([]);
  const [csResult, setCsResult] = useState([]);
  const [isReferred, setIsReferred] = useState([]);
  const [whereRefer, setWhereRefer] = useState([]);

  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');

  // store api data
  const [getCntraceptions, setGetCntraceptions] = useState([]);
  const [getMenstruationProducts, setGetMenstruationProducts] = useState([]);
  const [getChangePeriod, setGetChangePeriod] = useState([]);

  // Api urls
  const CPURL = `${API_URL}/api/patient-s4b-mens-contraception`;
  const MPURL = `${API_URL}/api/patient-s4b-during-menstruation`;
  const PCURL = `${API_URL}/api/patient-s4b-how-often`;

  const fetchData = async () => {
    try {
      const cpresponse = await axios.get(CPURL);
      const mpresponse = await axios.get(MPURL);
      const pcresponse = await axios.get(PCURL);
      setGetCntraceptions(cpresponse.data.data);
      setGetMenstruationProducts(mpresponse.data.data);
      setGetChangePeriod(pcresponse.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Create a data object with the form input values
  const data = {
    ObstetricsInfoChildMoralityCervicalCancer: [{
      PatientId: PatientId,
      gravida: gravida != "" ? gravida : "",
      para: para != "" ? para : "",
      stillBirth: stillBirth != "" ? stillBirth : "",
      miscarraigeOrAbortion: miscarriage != "" ? miscarriage : "",
      mr: mr != "" ? mr : "",
      livingMale: liveMale != "" ? liveMale : "",
      livingFemale: liveFemale != "" ? liveFemale : "",
      male: moralityMale != "" ? moralityMale : "",
      female: moralityFemale != "" ? moralityFemale : "",
      isPregnant: isPregnant != "" ? isPregnant : "",
      lmp: lmp != "" ? lmp : "",
      contraceptionMethodId: contraceptionMethod,
      comment: comment != "" ? comment : "",
      menstruationProductId: menstruationProduct,
      menstruationProductUsageTimeId: productReplace,
      CreateUser: user,
      OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
    }],
    MenstrualHistory: [{
      PatientId: PatientId,
      lmp: lmp != "" ? lmp : "",
      CreateUser: user,
      OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
    }],
    CervicalCancerScreening: [{
      PatientId: PatientId,
      ccScreeningDiagnosis: isConsent != "" ? isConsent : "",
      ccScreeningResultStatus: csResult != "" ? csResult : "",
      referralBiopsyStatus: isReferred != "" ? isReferred : "",
      CreateUser: user,
      OrgId: "73CA453C-5F08-4BE7-A8B8-A2FDDA006A2B",
    }],
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  // send form data
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(contraceptionMethod === ''){
      setError('  This field can not be empty!');
    }
    if(menstruationProduct === ''){
      setError2('  This field can not be empty!');
    }
    if(productReplace === ''){
      setError3('  This field can not be empty!');
    }
    if(contraceptionMethod && menstruationProduct && productReplace){
      axios
        .post(`${API_URL}/api/patient-s4b-create`, data)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response?.data?.status?.message
          }).then(function () {
            window.location = "four-c-userinput";
          });
        })
        .then((res)=>console.log(res))
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred.",
          });
        });
    }
  };

  return (
    <>
      <section className="patient-registration">
        {/* banner  */}
        <SectionBanner title={`Station 4B - ${patient?.GivenName + " " + patient?.FamilyName}`} />
 
        {/* form */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="show-data mb-4">
                <PatientShortInfo />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <SectionTitle title="Obstetric history" />
                <div className="mb-3 shadowme">
                  <label for="Gravida" className="form-label text-capitalize">
                    Gravida
                  </label>
                  <input
                    type="number"
                    name="Gravida"
                    id="Gravida"
                    className="form-control form-radious inputBox"
                    placeholder="Ex : 1"
                    value={gravida}
                    onChange={(event) => {
                      setGravida(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label for="para" className="form-label text-capitalize">
                    Para
                  </label>
                  <input
                    type="number"
                    name="para"
                    id="para"
                    className="form-control form-radious inputBox"
                    placeholder="Ex : 1"
                    value={para}
                    onChange={(event) => {
                      setPara(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label for="StillBirth" className="form-label text-capitalize">
                    Still Birth
                  </label>
                  <input
                    type="number"
                    name="StillBirth"
                    id="StillBirth"
                    className="form-control form-radious inputBox"
                    placeholder="Ex : 1"
                    value={stillBirth}
                    onChange={(event) => {
                      setStillBirth(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label for="Miscarriage" className="form-label text-capitalize">
                    Miscarriage
                  </label>
                  <input
                    type="number"
                    name="Miscarriage"
                    id="Miscarriage"
                    className="form-control form-radious inputBox"
                    placeholder="Ex : 0"
                    value={miscarriage}
                    onChange={(event) => {
                      setMiscarriage(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label for="MR" className="form-label text-capitalize">
                    MR
                  </label>
                  <input
                    type="number"
                    name="MR"
                    id="MR"
                    className="form-control form-radious inputBox"
                    placeholder="Ex : 0"
                    value={mr}
                    onChange={(event) => {
                      setMr(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="LivingBirthMale"
                    className="form-label text-capitalize"
                  >
                    Live Male Birth
                  </label>
                  <input
                    type="number"
                    name="LivingBirthMale"
                    id="LivingBirthMale"
                    className="form-control form-radious inputBox"
                    placeholder="Ex : 1"
                    value={liveMale}
                    onChange={(event) => {
                      setLiveMale(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="LivingBirthFemale"
                    className="form-label text-capitalize"
                  >
                    Live female Birth
                  </label>
                  <input
                    type="number"
                    name="LivingBirthFemale"
                    id="LivingBirthFemale"
                    className="form-control form-radious inputBox"
                    placeholder="Ex : 1"
                    value={liveFemale}
                    onChange={(event) => {
                      setLiveFemale(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <SectionTitle title="Child Mortality" />
                <div className="mb-3">
                  <label for="years" className="form-label text-capitalize">
                    Male
                  </label>
                  <select
                    id="Select"
                    className="form-select inputBox"
                    onChange={(event) => {
                      setMoralityMale(event.target.value);
                    }}
                  >
                    <option>-- Select --</option>
                    <option value={1}>0-1 Years</option>
                    <option value={2}>Below 5 Years</option>
                    <option value={3}>Over 5 Years</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="years" className="form-label text-capitalize">
                    Female
                  </label>
                  <select
                    id="Select"
                    className="form-select inputBox"
                    onChange={(event) => {
                      setMoralityFemale(event.target.value);
                    }}
                  >
                    <option>-- Select --</option>
                    <option value={1}>0-1 Years</option>
                    <option value={2}>Below 5 Years</option>
                    <option value={3}>Over 5 Years</option>
                  </select>
                </div>

                <div className="my-4 d-flex justify-content-between">
                  <p className="mb-0">Is Pregnant?</p>
                  <div className="d-flex">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="pregnant"
                        id="no"
                        value="0"
                        onChange={(event) => {
                          setIsPregnant(event.target.value);
                        }}
                        checked={isPregnant === "0"}
                        onDoubleClick={() => {
                          setIsPregnant("");
                        }}
                      />

                      <label className="form-check-label" for="no">
                        No
                      </label>
                    </div>
                    <div className="form-check ms-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="pregnant"
                        id="yes"
                        value="1"
                        onChange={(event) => {
                          setIsPregnant(event.target.value);
                        }}
                        checked={isPregnant === "1"}
                        onDoubleClick={() => {
                          setIsPregnant("");
                        }}
                      />
                      <label className="form-check-label" for="yes">
                        Yes
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-lg-6">
                <SectionTitle title="Menstrual History" />
                <div className="mb-3">
                  <label for="" className="form-label text-capitalize">
                    LMP
                  </label>

                  <input
                    type="date"
                    name=""
                    id="lmp"
                    className="dateIcon form-control form-radious inputBox"
                    placeholder=""
                    value={lmp}
                    onChange={(event) => {
                      setLMP(event.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label for="" className="form-label text-capitalize">
                  * Contraception Method 
                  </label>
                  <select
                    // id="Select"
                    // className="form-select inputBox d1"
                    className={`form-select inputBox d1 ${error ? 'error-input' : ''}`}
                    onChange={(event) => {
                      setContraceptionMethod(event.target.value);
                      setError("");
                    }}
                  > 
                    <option>-- Select --</option>
                    {getCntraceptions?.map((item, index) => (
                      <option key={index} value={item.ContraceptionMethodId}>
                        {item.ContraceptionMethodCode}
                      </option>
                    ))}
                  </select>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div className="mb-3">
                  <label for="comments" className="form-label text-capitalize">
                    comments
                  </label>
                  <textarea
                    className="form-control form-radious inputBox"
                    placeholder="type here"
                    id="comments"
                    value={comment}
                    onChange={(event) => {
                      setComment(event.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label for="" className="form-label text-capitalize">
                  * What Product You Use During Menstruation?
                  </label>
                  <select
                    // id="Select"
                    // className="form-select inputBox d2"
                    className={`form-select inputBox d2 ${error2 ? 'error-input' : ''}`}
                    value={menstruationProduct}
                    onChange={(event) => {
                      setMenstruationProduct(event.target.value);
                      setError2("");
                    }}
                  >
                    <option>-- Select --</option>
                    {getMenstruationProducts?.map((item, index) => (
                      <option key={index} value={item.MenstruationProductId}>
                        {" "}
                        {item.MenstruationProductCode}
                      </option>
                    ))}
                  </select>
                  {error2 && <p style={{ color: 'red' }}>{error2}</p>}
                </div>
                <div className="mb-3">
                  <label for="" className="form-label text-capitalize">
                  * How often do you change / replace?
                  </label>
                  <select
                    // id="Select"
                    // className="form-select inputBox d3"
                    className={`form-select inputBox d3 ${error3 ? 'error-input' : ''}`}
                    onChange={(event) => {
                      setProductReplace(event.target.value);
                      setError3("");
                    }}
                  >
                    <option>-- Select --</option>
                    {getChangePeriod?.map((item, index) => (
                      <option
                        key={index}
                        value={item.MenstruationProductUsageTimeId}
                      >
                        {item.MenstruationProductUsageTimeCode}
                      </option>
                    ))}
                  </select>
                  {error3 && <p style={{ color: 'red' }}>{error3}</p>}
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-6">
                <SectionTitle title="Cervical Cancer Screening" />
                <div className="d-flex justify-content-between bg-white mb-3 rounded-2">
                  <p className="text-center m-0 p-0 cancer-screen ps-2">
                    Does patient give consent to cervical cancer screening?
                  </p>

                  <div className="text-center m-0 cancer-screen">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="cervical"
                        id="inlineRadio5"
                        value="Negative"
                        checked={isConsent === "Negative"}
                        onDoubleClick={()=>{setIsConsent("")}}
                        onChange={(event) => {
                          setIsConsent(event.target.value);
                        }}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        for="inlineRadio5"
                      >
                        no
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="cervical"
                        id="inlineRadio6"
                        value="Positive"
                        checked={isConsent === "Positive"}
                        onDoubleClick={()=>{setIsConsent("")}}
                        onChange={(event) => {
                          setIsConsent(event.target.value);
                        }}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        for="inlineRadio6"
                      >
                        yes
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <select
                    id="Select"
                    className="form-select inputBox"
                    value={csResult}
                    onChange={(event) => {
                      setCsResult(event.target.value);
                    }}
                  >
                    <option value="null">
                      Cervical cancer screening (VIA) results
                    </option>
                    <option value="Negative">Negative/Normal</option>
                    <option value="Positive">Positive/Abnormal</option>
                    <option value="Unsatisfactory">
                      Inconclusive/ Unsatisfactory
                    </option>
                  </select>
                </div>

                <div className="d-flex justify-content-between bg-white mb-3 rounded-2">
                  <p className="text-center m-0 cancer-screen">
                    Referred for colposcopy / biopsy
                  </p>
                  <div className="text-center m-0 cancer-screen">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colposcopy"
                        id="inlineRadio7"
                        value="No"
                        checked={isReferred === "No"}
                        onDoubleClick={()=>{setIsReferred("")}}
                        onChange={(event) => {
                          setIsReferred(event.target.value);
                        }}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        for="inlineRadio7"
                      >
                        no
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="colposcopy"
                        id="inlineRadio8"
                        value="Yes"
                        checked={isReferred === "Yes"}
                        onDoubleClick={()=>{setIsReferred("")}}
                        onChange={(event) => {
                          setIsReferred(event.target.value);
                        }}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        for="inlineRadio8"
                      >
                        yes
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label for="Gravida" className="form-label text-capitalize">
                    Where?
                  </label>
                  <select
                    id="Select"
                    className="form-select inputBox"
                    value={whereRefer}
                    onChange={(event) => {
                      setWhereRefer(event.target.value);
                    }}
                  >
                    <option>-- Select --</option>
                    <option>UHC</option>
                    <option>DH</option>
                    <option>Tertiary/ Specialized Hospital</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="text-center mt-3 position-relative">
              <Button
                className="border-0 button-color text-white py-2 px-3 text-capitalize rounded	undefined"
                block="block"
                type="submit"
              >
                save & next
              </Button>
              <StationButton
                btnBg="button-bg"
                btnOne="Skip"
                type="submit"
                link="/four-c-userinput"
              />
              <div className="previewBtn">
                <Link to="/prescription"
                  className="border-0 button-color text-white py-2 px-3 text-capitalize rounded"
                >
                  Histrory
                </Link>
            </div>
            </div>
           
            
            {/* <div className="text-center mt-3 position-relative">
              <SingleButton btnOne="save & next" link="/four-c-userinput" />
            </div> */}
            
          </form>
        </div>

        {/* global button */}
        <GlobalButton />
      </section>
    </>
  );
};

export default SFourUserData;
