import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiError } from "react-icons/bi";
import "./PatientDataOnlyView.css";
import SectionTitle from "../SectionTitleDemo/SectionTitle";
import GlobalButton from "../GlobalBtn/GlobalButton";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import SingleButton from "./../Buttons/SingleButton/SingleButton";

const PatientDataOnlyView = () => {
  const [startDate, setStartDate] = useState(new Date());
  // document.getElementById("Country").value = "Bangladesh";

  return (
    <>
      <section className="patient-registration">
        {/* banner  */}
        <SectionBanner title="patient registration"/>
        {/* form */}
        <div className="container">
          <form action="" className="mt-3">
            <div className="row justify-content-center"> 
              <div className="col-lg-8">
                <SectionTitle title="Registration" />
                <div className="mb-3 shadowme">
                  <label htmlFor="" className="form-label text-capitalize">
                    Registration Number *
                  </label>
                  <input
                    value="87437547547547"
                    type="number"
                    name="registrationNo"
                    id="registrationNo"
                    className="form-control form-radious inputBox"
                    placeholder="Ex: 9087663320"
                  />
                </div>

                <div className="mb-3 shadowme">
                  <label htmlFor="" className="form-label text-capitalize">
                    First name *
                  </label>
                  <input
                  value="Jiaur"
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div>

                <div className="mb-3 shadowme">
                  <label htmlFor="" className="form-label text-capitalize">
                    Last name *
                  </label>
                  <input
                  value="Rahman"
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Date of Birth
                  </label>
                  <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control form-radious inputBox"
                  />
                </div>

                <div className="mb-3 shadowme position-relative">
                  <label htmlFor="" className="form-label text-capitalize">
                    Patient Age
                  </label>
                  <input
                  value="27"
                    type="number"
                    name="patientAge"
                    id="patientAge"
                    className="form-control form-radious inputBox"
                    placeholder="Ex: 25"
                  />
                  <div className="iputComon">Year</div>
                </div>
                <div className="mb-3 shadowme">
                  <label htmlFor="" className="form-label text-capitalize">
                    Contact Number *
                  </label>
                  <input
                  value="01600000000"
                    type="number"
                    name="contactNumber"
                    id="contactNumber"
                    className="form-control form-radious inputBox"
                    placeholder="Ex: 01600000000"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Gender *
                  </label>
                  <select id="Select" className="form-select inputBox">
                    <option>Select Gender</option>
                    <option selected>Male </option>
                    <option>Female </option>
                    <option>Others </option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex">
                      <div className="form-check me-3 mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="nidNumber"
                          id="nid1"
                          value="nid1"
                          checked
                        />
                        <label className="form-check-label" htmlFor="nid1">
                          NID
                        </label>
                      </div>
                      <div className="form-check me-3 mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="nidNumber"
                          id="nid2"
                          value="nid2"
                        />
                        <label className="form-check-label" htmlFor="nid2">
                          Birth
                        </label>
                      </div>
                      <div className="form-check me-3 mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="nidNumber"
                          id="nid3"
                          value="nid3"
                        />
                        <label className="form-check-label" htmlFor="nid3">
                          ID No.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="mb-3">
                      <input
                       value="199503016666100"
                        type="number"
                        name="NID"
                        id="NID"
                        className="form-control form-radious inputBox"
                        placeholder="Ex: 199503016666100"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <select id="Select" className="form-select inputBox">
                      <option>Self</option>
                      <option selected>Father</option>
                      <option>Mother</option>
                      <option>Others</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Marital Status *
                  </label>
                  <select id="Select" className="form-select inputBox">
                    <option selected>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Present Address information */}
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <SectionTitle title="Present Address" />
                <div className="mb-3">
                  <label htmlFor="comments" className="form-label text-capitalize">
                    Address
                  </label>
                  <textarea
                  value="155 Gulshan North Ave, Dhaka 1212, Bangladesh"
                    className="form-control form-radious inputBox"
                    placeholder="type here"
                    id="comments"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Village
                  </label>
                  <input
                  value="Chatorauta"
                    type="text"
                    name="Village"
                    id="Village"
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Union
                  </label>
                  <input
                    value="Domar"
                    type="text"
                    name="Thana"
                    id="Thana"
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Post Code
                  </label>
                  <input
                  value="4053"
                    type="number"
                    name="PostCode"
                    id="PostCode"
                    className="form-control form-radious inputBox"
                    placeholder="Ex: 1207"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    District
                  </label>
                  <select
                    id="district"
                    className="form-select form-radious inputBox"
                  >
                    <option selected value="">-- Select --</option>
                    <option>Faridpur</option>
                    <option>Gazipur</option>
                    <option>Gopalganj</option>
                    <option>Jamalpur</option>
                    <option>Kishoreganj</option>
                    <option>Madaripur</option>
                    <option>Manikganj</option>
                    <option>Mymensingh</option>
                    <option>Narayanganj</option>
                    <option>Narsingdi</option>
                    <option>Netrokona</option>
                    <option>Rajbari</option>
                    <option>Shariatpur</option>
                    <option>Bogra</option>
                    <option>Naogaon</option>
                    <option>Nawabganj</option>
                    <option>Pabna</option>
                    <option>Rajshahi</option>
                    <option>Sirajgonj</option>
                    <option selected>Dinajpur</option>
                    <option>Gaibandha</option>
                    <option>Kurigram</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Country
                  </label>
                  <input
                  value="Bangladesh"
                    type="text"
                    name="Country"
                    id="Country"
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div>
              </div>
            </div>

            {/* Permanent Address information */}
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <SectionTitle title="Permanent Address" />
                <div className="mb-3">
                  <label htmlFor="comments" className="form-label text-capitalize">
                    Address
                  </label>
                  <textarea
                  value="155 Gulshan North Ave, Dhaka 1212, Bangladesh"
                    className="form-control form-radious inputBox"
                    placeholder="type here"
                    id="comments"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Village
                  </label>
                  <input
                  value="Chatorauta"
                    type="text"
                    name="Village"
                    id="Village"
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Union
                  </label>
                  <input
                    value="Domar"
                    type="text"
                    name="Thana"
                    id="Thana"
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Post Code
                  </label>
                  <input
                  value="4053"
                    type="number"
                    name="PostCode"
                    id="PostCode"
                    className="form-control form-radious inputBox"
                    placeholder="Ex: 1207"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    District
                  </label>
                  <select
                    id="district"
                    className="form-select form-radious inputBox"
                  >
                    <option selected value="">-- Select --</option>
                    <option>Faridpur</option>
                    <option>Gazipur</option>
                    <option>Gopalganj</option>
                    <option>Jamalpur</option>
                    <option>Kishoreganj</option>
                    <option>Madaripur</option>
                    <option>Manikganj</option>
                    <option>Mymensingh</option>
                    <option>Narayanganj</option>
                    <option>Narsingdi</option>
                    <option>Netrokona</option>
                    <option>Rajbari</option>
                    <option>Shariatpur</option>
                    <option>Bogra</option>
                    <option>Naogaon</option>
                    <option>Nawabganj</option>
                    <option>Pabna</option>
                    <option>Rajshahi</option>
                    <option>Sirajgonj</option>
                    <option selected>Dinajpur</option>
                    <option>Gaibandha</option>
                    <option>Kurigram</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Country
                  </label>
                  <input
                  value="Bangladesh"
                    type="text"
                    name="Country"
                    id="Country"
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div>
              </div>
            </div>

            {/* camp information */}
            <div className="row  justify-content-center">
              <div className="col-lg-8">
                <SectionTitle title="FDMN camp" />
                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Camp
                  </label>
                  <input
                  value="Camp-09"
                    type="text"
                    name="CampName"
                    id="CampName"
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Block Number
                  </label>
                  <input
                  value="A"
                    type="text"
                    name="BlockNo"
                    id="BlockNo"
                    className="form-control form-radious inputBox"
                    placeholder="Ex: A"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Majhi / Captain
                  </label>
                  <input
                  value="Imam Hossain"
                    type="text"
                    name="Majhi"
                    id="Majhi"
                    className="form-control form-radious inputBox"
                    placeholder="Type here"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    Tent Number
                  </label>
                  <input
                  value="558560"
                    type="number"
                    name="TentNo"
                    id="TentNo"
                    className="form-control form-radious inputBox"
                    placeholder="Ex: 558560"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label text-capitalize">
                    FCN Number
                  </label>
                  <input
                  value="330976547"
                    type="number"
                    name="FCN"
                    id="FCN"
                    className="form-control form-radious inputBox"
                    placeholder="Ex: 330976547"
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-3 position-relative">
              <SingleButton btnOne="save & next" link="/go-pic" />
            </div>
          </form>
        </div>

        {/* global button */}
        <GlobalButton />
      </section>
    </>
  );
};

export default PatientDataOnlyView;
