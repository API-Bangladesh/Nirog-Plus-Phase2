import React, { useEffect, useState } from "react";
import SectionBanner from "../SectionBannerDemo/SectionBanner";
import GlobalButton from "../GlobalBtn/GlobalButton";
import SectionTitle from "../SectionTitleDemo/SectionTitle";
import SingleButton from "../Buttons/SingleButton/SingleButton";
import StationButton from "../Buttons/StationButton/StationButton";

const GlucoseHemoglobin = () => {
  const [rbg, setRbg] = useState("");
  const [fbg, setFbg] = useState("");
  const [lasteat, setLastEat] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");

  return (
    <>
      <section>
        <SectionBanner title="Station 3 - Jiaur Rahman" />
        <div className="container">
          <form action="">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <SectionTitle title="Glucose & Hemoglobin" />
                <div className="mb-3 shadowme position-relative">
                  <div className="iputComon">mmol/L</div>
                  <label htmlFor="" className="form-label text-capitalize">
                    RBG
                  </label>
                  <input
                    type="number"
                    value={rbg}
                    onChange={(event) => {
                      setRbg(event.target.value);
                    }}
                    className="form-control form-radious inputBox"
                    placeholder="EX: 00.00"
                  />
                </div>

                <div className="mb-3 shadowme position-relative">
                  <div className="iputComon">mmol/L</div>
                  <label htmlFor="" className="form-label text-capitalize">
                    FBG
                  </label>
                  <input
                    type="number"
                    value={fbg}
                    onChange={(event) => {
                      setFbg(event.target.value);
                    }}
                    className="form-control form-radious inputBox"
                    placeholder="EX: 00.00"
                  />
                </div>
                <div className="mb-3 shadowme">
                  <label htmlFor="" className="form-label text-capitalize">
                    Hours Since Your Last Meal
                  </label>
                  <input
                    type="number"
                    value={lasteat}
                    onChange={(event) => {
                      setLastEat(event.target.value);
                    }}
                    className="form-control form-radious inputBox"
                    placeholder="Ex : 3"
                  />
                </div>
                <div className="mb-3 shadowme position-relative">
                  <div className="iputComon">mmol/L</div>
                  <label htmlFor="" className="form-label text-capitalize">
                    Hemoglobin
                  </label>
                  <input
                    type="number"
                    value={hemoglobin}
                    onChange={(event) => {
                      setHemoglobin(event.target.value);
                    }}
                    className="form-control form-radious inputBox"
                    placeholder="Ex : 13.8"
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-3 position-relative">
              <SingleButton btnOne="save" link="/glucose-hemoglobin-table" />
              <StationButton
                btnOne="Save & station 4"
                link="/user-data"
                btnBg="button-bg"
              />
            </div>
          </form>
        </div>
        <GlobalButton />
      </section>
    </>
  );
};

export default GlucoseHemoglobin;
