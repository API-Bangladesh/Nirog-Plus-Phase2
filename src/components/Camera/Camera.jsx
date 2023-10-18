import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import "./Camera.css";
import { useLocation } from "react-router";
import {RiCameraSwitchFill, RiCameraSwitchLine} from "react-icons/ri"

const Camera = () => {
  const webcamRef = React.useRef(null);
  const location = useLocation();
  const [show, setShow] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const PatientId = queryParams.get("PatientId");

  let patientImage = localStorage.getItem("patientImage");

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    localStorage.setItem("patientImage", imageSrc);
    if(imageSrc) {
      setShow(false)
    }
  }, [webcamRef]);

  const captureAgain = React.useCallback(() => {
    localStorage.removeItem("patientImage");
    window.location.reload();
  }, [webcamRef]);

  const submit = () => {
    window.location.href = `/user-details?PatientId=${PatientId}`;
  };

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile =/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|tablet/i.test(userAgent);
    const desktop = !(isMobile || isTablet);
    setIsDesktop(desktop)
  }, [])

  const [videoConstraints, setVideoConstraints] = useState({
    width: 1280,
    height: 800,
    facingMode: "user",
  });

  const changeCameraMode = () => {
    let mode = '';
    if (videoConstraints.facingMode === "user") {
      mode = 'environment';
    } else {
      mode = "user"
    }
    setVideoConstraints({
      ...videoConstraints,
      facingMode: mode
    })
  };

  return (
    <>
      <SectionBanner title="Patient Photo"/>
      <section id="cameraOn" className="container">
          {
            show ? 
            <div className="text-center position-relative">
              <Webcam
               mirrored={true}
               audio={false}
              // width={300}
              // height={600}
               ref={webcamRef}
               screenshotFormat="image/jpeg"
               videoConstraints={videoConstraints}
               onUserMediaError={(error) => {
               console.log(error);
              }}
              />

              {webcamRef && !isDesktop && (
                <span
                  className="ms-2 camera-button"
                  onClick={() => changeCameraMode()}
                >
                {videoConstraints.facingMode === "user" && <RiCameraSwitchFill />}
                {videoConstraints.facingMode === "environment" && <RiCameraSwitchLine />}
                </span>
              )}

              <div className="text-center mt-3 position-relative mb-2 d-flex justify-content-center align-items-center">
                <button
                  type="button"
                  onClick={capture}
                  className="border-0 button-color text-white py-2 px-3 text-capitalize rounded me-2"
                >
                  Take Photo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = '/user-table';
                  }}
                  className="border-0 bg-secondary text-white py-2 px-3 text-capitalize rounded"
                >
                  Skip
                </button>
              </div>
            </div> 
            : 
            <div className="text-center">
              <img style={{width: "350px", height:"350px", objectFit: "cover"}} src={patientImage} alt="userImg" className="maruf" />
              <div className="text-center mt-3 position-relative mb-2">
                <button
                  type="button"
                  onClick={captureAgain}
                  className="border-0 button-color text-white py-2 px-3 text-capitalize rounded me-2"
                >
                  Retake Photo
                </button>
                <button
                  type="button"
                  onClick={submit}
                  className="border-0 bg-secondary text-white py-2 px-3 text-capitalize rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          }
          {/* <GlobalButton /> */}
      </section>
    </>
  );
};

export default Camera;

{/* <section>
  <SectionBanner title="Take picture" />
  <div className="container text-center">
    <p className="my-5">
      <Camera />
    </p>
  </div>
</section>; */}
