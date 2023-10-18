import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ image, title, title2, link, bg="defualtBG" }) => {
  return (
    <Fragment>
      <div className="col-sm-6 col-md-4 col-lg-3">
        <Link className="itemGo" to={link}>
          <div className={`card p-3 ${bg}`}>
            <img src={image} className="d_icon animated fadeInUp" alt="img" />
            <h6 className="mb-0 text-center text-light animated fadeInUp">{title}</h6>
            <h6 className="mb-0 text-center text-light animated fadeInUp">{title2}</h6>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default Dashboard;
