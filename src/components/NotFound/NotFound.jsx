import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import NotFoundimg from "./../../assets/img/image404.png";

const NotFound = () => {
  return (
    <div className="errorBox">
      <img className="NotFoundimg" src={NotFoundimg} alt="img"/>

      <p className="mt-4 fs-5 animated fadeInUp">
        The page you are looking for was moved, removed, renamed or might never
        existed.
      </p>

      <Link to='/'>
        <button className="border-0 button-color text-white py-3 px-4 mt-4 text-uppercase rounded animated fadeInUp">Go Back</button>
    </Link>
    </div>
  );
};

export default NotFound;

