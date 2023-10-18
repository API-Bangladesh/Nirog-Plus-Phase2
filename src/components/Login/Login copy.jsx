import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import Logo from "../../assets/img/Logo.png";
import ApiLogo from "../../assets/img/apilogo.png";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "haefa",
      password: "haefa@999",
    },
    {
      username: "admin",
      password: "admin",
    },
    {
      username: "jiaur",
      password: "jiaur123",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);

        window.location.replace("/dashboard");
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="loginForm">
      <div className="app-logo text-center">
        <img src={Logo} alt="" className="img-fluid logo-size " />
      </div>
      <h4 className="font-18 text-center m-0 py-4">SIGN IN</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            className="form-control animated fadeInUp px-4 py-2"
            type="text"
            placeholder="User Name"
            name="uname"
            required
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <input
            className="form-control animated fadeInUp px-4 py-2"
            type="password"
            placeholder="User Password"
            name="pass"
            required
          />
          {renderErrorMessage("pass")}
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
  );

  return (
    <>
      <div className="app">
        {/* spinner  */}
        {isSubmitted ? (
          <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          // spinner

          // login form
          renderForm
        )}
      </div>

      <div className="d-flex align-items-center apilogo-position">
        <p className="text-capitalize pe-2 mb-0">powered by</p>
        <Link to="https://api.net.bd/" target="_blank">
          <img src={ApiLogo} alt="img" className="api-logo pt-0" />
        </Link>
      </div>
    </>
  );
}

export default App;
