import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import Logo from "../../assets/img/Logo.png";
import ApiLogo from "../../assets/img/apilogo.png";
import axios from "axios";
import { API_URL } from "../../helper/Constants";
import { showSuccessTimerNotification,showErrorNotification,} from "../../helper/notificationHelper";
import { useNavigate } from "react-router-dom";
const App = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${API_URL}/api/login`, loginData);
      const token = response?.data?.data;
       localStorage.setItem("token", JSON.stringify(token));
      //console.log("Token stored in local storage:", token);
      showSuccessTimerNotification("Success", response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data);
      //console.error("Error storing token in local storage:", error);
       showErrorNotification("Error", error?.response?.data?.error?.password);
      //showErrorNotification(error?.response?.data?.message);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };


  return (
    <>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <div className="app">
            <div className="loginForm">
              <div className="app-logo text-center">
                <img src={Logo} alt="" className="img-fluid logo-size " />
              </div>
              <h4 className="font-18 text-center m-0 py-4">SIGN IN</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3 input-container">
                  <input
                    type="email"
                    className="form-control animated fadeInUp px-4 py-2"
                    id="email"
                    placeholder="User Name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3 input-container">
                  <input
                    type="password"
                    className="form-control animated fadeInUp px-4 py-2"
                    id="password"
                    placeholder="User Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="button-container w-100">
                  <button
                    type="submit"
                    className="mt-2 py-2 btn w-100 border-0 animated fadeInUp btn-primary font-16 login-btn"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex align-items-center apilogo-position">
            <p className="text-capitalize pe-2 mb-0">powered by</p>
            <Link to="https://api.net.bd/" target="_blank">
              <img src={ApiLogo} alt="img" className="api-logo pt-0" />
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default App;
