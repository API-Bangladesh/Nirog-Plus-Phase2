import React, { Suspense, lazy } from "react";
import LazyLoader from "../components/masterLayout/LazyLoader";
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));

import ImageOne from "../assets/img/dashboard-icon/patient-reg.png";
import ImageTwo from "../assets/img/dashboard-icon/patient-edit.png";
import ImageThree from "../assets/img/dashboard-icon/counter.png";
import ImageFour from "../assets/img/dashboard-icon/height&width2.png";
import ImageFive from "../assets/img/dashboard-icon/blood-pressure.png";
import ImageSix from "../assets/img/dashboard-icon/glucose.png";
import ImageSeven from "../assets/img/dashboard-icon/treatment-plan.png";
import ImageEight from "../assets/img/dashboard-icon/settings.png";
import GlobalButton from "../components/GlobalBtn/GlobalButton";
import {loggedInUserData} from "../helper/localStorageHelper";
const DashboardPage = () => {
  const token = localStorage.getItem('token');
  const myTokenData = JSON.parse(token);
  const tokenData = myTokenData?.user?.station;
  const stations = tokenData.split(",");
  // console.log(stations);
  
  const userData = loggedInUserData();
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <div id="deshboard" className="position-relative">

          <div className="topHeading">
            <div className="container">
              <div className="row mb-0">
                <div className="col-lg-12">
                  <div className="healthText">
                    <p className="me-3 mb-0">
                      <b>Health Center :</b>{" "}
                      <span>{userData?.barcode_format.healthcenter.HealthCenterName}</span>
                    </p>
                    <p className="me-3 mb-0">
                      <b>Health Code :</b> <span>{userData?.barcode_format.barcode_prefix}</span>
                    </p>
                    <p className="me-3 mb-0">
                      <b>Address :</b> <span>{userData?.barcode_format.union.name}, {userData?.barcode_format.upazila.name}, {userData?.barcode_format.district.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
            <div className="container">
              <div className="row gy-4">    
              {
                stations?.includes("patient_registration") ? 
                (<Dashboard
                  image={ImageOne}
                  title="Patient Registration"
                  link="/patient-registration"
                  bg="bg1"
                />) : null
              } 
              {
                stations?.includes("station_1") ? 
                (<Dashboard
                  image={ImageFour}
                  title="Station 1"
                  title2=" Height & Weight"
                  link="/user-table"
                  bg="bg4"
                />) : null
              }
              {
                stations?.includes("station_2") ? 
                (<Dashboard
                  image={ImageFive}
                  title2="Vital Statistics"
                  title="Station 2"
                  link="/blood-pressure-table"
                  bg="bg5"
                />) : null
              }
              {
                stations?.includes("station_3") ? 
                (<Dashboard
                  image={ImageSix}
                  title2="Glucose & Hemoglobin"
                  title="Station 3"
                  link="/glucose-hemoglobin-table"
                  bg="bg6"
                />) : null
              }
              {
                stations?.includes("station_4") ? 
                (<Dashboard
                  image={ImageSeven}
                  title2="Physician, Obs & Gynae Treatment Plan"
                  title="Station 4"
                  link="/treatment-plan"
                  bg="bg7"
                />) : null
              }
                {/* <Dashboard image={ImageTwo} title="Patient Data" link="/patient-list" bg="bg2"/>
                <Dashboard image={ImageThree} title="Counter [ 20 / 25 ]" link="/counter" bg="bg3"/>
                <Dashboard image={ImageEight} title="Settings" link="/settings" bg="bg8"/> */}
              </div>
              {/* global button */}
              <GlobalButton />
            </div>
        </div>
      </Suspense>
    </>
  );
};

export default DashboardPage;