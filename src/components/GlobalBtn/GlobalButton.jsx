import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import profileImg from "../../assets/img/profile_img.jpg";
import { FiSettings } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import "./GlobalButton.css";
import { Button } from "bootstrap";
// import { useNavigate } from "react-router-dom";
import {loggedInUserData} from "../../helper/localStorageHelper";

const GlobalButton = () => {
  // const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    // navigate("/");
    window.location = "/";
  };
  const userData = loggedInUserData();

  return (
    <>
      <section id="globalButton" className="testPrint">
        <div className="container">
          <div className="buttonBox">
            <div className="home text-center">
              <Link to="/dashboard">
                <HiHome className="fs-3 text-secondary" />
                <p className="font-14 text-center mb-0 fw-semibold text-secondary">
                  Home   
                </p>
              </Link>
            </div>
            {/* <div className="setting text-center">
              <Link to="/settings">
                <FiSettings className="fs-3 text-secondary" />
                <p className="font-14 text-center mb-0 fw-semibold text-secondary">
                  Settings
                </p>
              </Link>
            </div> */}
            <div className="profile text-center">
              <Dropdown>
                <Dropdown.Toggle id="">
                  <img className="profileImg" src={userData?.employee.EmployeeImage} alt="img" />
                  <p className="font-14 text-center mb-0 fw-semibold text-secondary">
                    Profile
                  </p>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <h6 className="pName">{userData?.name}</h6>
                  <i className="pDeg d-block">{userData?.employee.FirstName}</i>
                  <button  className="logoutBtn border-0 font-14 me-1 text-light" onClick={handleLogout}> <MdOutlineLogout/> Logout</button>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GlobalButton;
