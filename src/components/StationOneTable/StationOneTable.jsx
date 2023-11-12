import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import barCode from "../../assets/img/qr-code.png";
import SectionBannerDemo from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import { BsArrowRightCircle, BsUpcScan } from "react-icons/bs";
import "./StationOneTable.css";
import axios from "axios";
import { API_URL } from "../../helper/Constants";
import { useSelector, useDispatch } from "react-redux";
import { ADD_PATIENT } from "./../../redux/state-slice/patients-slice";
import Swal from "sweetalert2";

const StationOneTable = ({ station, link, title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("Card");
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault()
    
    try {
      let searchKey = "";
      switch (searchOption) {
        case "Card":
          searchKey = "Card";
          break;
        case "NID":
          searchKey = "NID";
          break;
        case "Name":
          searchKey = "Name";
          break;
        case "Mobile":
          searchKey = "Mobile";
          break;
        default:
          break;
      }

      const response = await axios.post(`${API_URL}/api/search-patient-info-without-station`, {
        station: station,
        [searchKey]: searchQuery,
      });

      if (Array.isArray(response.data)) {
        setSearchResults(response.data);
      }
      if (typeof response.data === "string") {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: response.data,
        });
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  return (
    <>
      <div id="stationOneTable">
        <SectionBannerDemo title={title} />

        <div className="container">
          <h3 className="sectionTitle text-center mb-4">Search Patient</h3>

          <div className="checkbox d-flex align-items-center">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                id="card"
                type="radio"
                value="Card"
                checked={searchOption === "Card"}
                onChange={() => setSearchOption("Card")}
                onDoubleClick={()=> setSearchOption("")}
              />
              <label className="form-check-label" htmlFor="card">
                Card
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                id="nid"
                type="radio"
                value="NID"
                checked={searchOption === "NID"}
                onChange={() => setSearchOption("NID")}
                onDoubleClick={()=> setSearchOption("")}
              />
              <label className="form-check-label" htmlFor="nid">
                NID
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                id="name"
                type="radio"
                value="Name"
                checked={searchOption === "Name"}
                onChange={() => setSearchOption("Name")}
                onDoubleClick={()=> setSearchOption("")}
              />
              <label className="form-check-label" htmlFor="name">
                Name
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                id="mobile"
                type="radio"
                value="Mobile"
                checked={searchOption === "Mobile"}
                onChange={() => setSearchOption("Mobile")}
                onDoubleClick={()=> setSearchOption("")}
              />
              <label className="form-check-label" htmlFor="mobile">
                Mobile
              </label>
            </div>
          </div>

          <div className="search">
            <form action="" className="searchBox" onSubmit={handleSearch} method="POST">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search.."
                name="search"
                autoFocus
              />
            </form>
            <button
              className="add-button border-0 ms-4 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <Table responsive="sm md lg xl" className="patientTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>MS</th>
                <th>FP</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* {searchResults.map((result) => (
              <tbody key={result.PatientId}>
                <tr>
                  <td>{result.PatientCode}</td>
                  <td>{result.GivenName}</td>
                  <td> {result.gender.GenderCode}</td>
                  <td>{result.martital_status.MaritalStatusCode}</td>
                  <td>Null</td>
                  <td>
                    <Link to={link}>
                      <BsArrowRightCircle className="action" />
                    </Link>
                  </td>
                </tr>
              </tbody>



            ))} */}

            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <tbody key={result.PatientId}>
                  <tr>
                    <td>{result.PatientCode}</td>
                    <td>
                      <span>{result.GivenName} </span> 
                      <span>{result.FamilyName}</span> 
                    </td>
                    <td>{result?.gender?.GenderCode}</td>
                    <td>{result.martital_status.MaritalStatusCode}</td>
                    <td>Null</td>
                    <td>
                      <Link
                        to={link}
                        onClick={() => {
                          dispatch(ADD_PATIENT(result));
                        }}
                      >
                        <BsArrowRightCircle className="action" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td colSpan={6}>
                    {searchQuery !== ""
                      ? "Patient not found"
                      : "Please enter a search query"}
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
        <GlobalButton />
      </div>
    </>
  );
};

export default StationOneTable;
