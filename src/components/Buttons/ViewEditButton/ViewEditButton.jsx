import React from "react";
import { Link } from "react-router-dom";

const ViewEditButton = ({ btnone, btntwo, btnthree, link, link2, link3 }) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        {/* <Link to={link} className="me-2">
            <button className="font-13 border-0 button-dark text-white py-1 px-2 text-capitalize rounded">
              {btnone}
            </button>
          </Link>
          <Link to={link2} className="me-2">
            <button className="font-13 border-0 button-dark text-white py-1 px-2 text-capitalize rounded">
              {btntwo}
            </button>
          </Link> */}
        <Link to={link3} className="ms-2">
          <button className="font-13 border-0 button-dark text-white py-1 px-2 text-capitalize rounded">
            {btnthree}
          </button>
        </Link>
      </div>
    </>
  );
};

export default ViewEditButton;
