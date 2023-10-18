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

const StationOneTable = ({ link, title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("title");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/patient-search`,
        {
          params: { search: searchQuery, option: searchOption },
        }
      );

      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  // const [data, setData] = useState({});
  // useEffect(() => {
  //   localStorage.setItem("mydata", JSON.stringify(searchResults));
  //   setData(searchResults);
  // }, [searchResults]);


  return (
    <>
      <div id="stationOneTable">
        <SectionBannerDemo title={title} />
        <div className="container">
          <h3 className="sectionTitle text-center mb-4">Search Patient  </h3>
          <div className="checkbox d-flex align-items-center">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                id="card"
                type="radio"
                value="PatientCode"
                checked={searchOption === "PatientCode"}
                onChange={() => setSearchOption("PatientCode")}
              />

              <label className="form-check-label text-capitalize" htmlFor="card">
                Card
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                id="nid"
                type="radio"
                value="IdNumber"
                checked={searchOption === "IdNumber"}
                onChange={() => setSearchOption("IdNumber")}
              />
              <label className="form-check-label text-capitalize" htmlFor="nid">
                NID
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                id="name"
                type="radio"
                value="GivenName"
                checked={searchOption === "GivenName"}
                onChange={() => setSearchOption("GivenName")}
              />
              <label className="form-check-label text-capitalize" htmlFor="name">
                Name
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                id="mobilenumber"
                type="radio"
                value="CellNumber"
                checked={searchOption === "CellNumber"}
                onChange={() => setSearchOption("CellNumber")}
              />
              <label
                className="form-check-label text-capitalize"
                htmlFor="mobilenumber"
              >
                mobile number
              </label>
            </div>
          </div>

          <div className="search">
            <form action="" className="searchBox">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search.."
                name="search"
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

            {searchResults.map((result) => (
              <tbody key={result.PatientId}>
                <tr>
                  <td>{result.PatientCode}</td>
                  <td>{result.GivenName}</td>
                  <td>{result.GenderId}</td>
                  <td>{result.MaritalStatusId}</td>
                  <td>Null</td>
                  <td>
                    <Link to={link}>
                      <BsArrowRightCircle className="action" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
        <GlobalButton />
      </div>
    </>
  );
};

export default StationOneTable;
