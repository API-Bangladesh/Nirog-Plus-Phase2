import React from "react";
import { useState } from "react";

const AdditionalSymptoms = () => {
   const [isShown, setIsShown] = useState(false);
   const handleClick = (event) => {
      setIsShown((current) => !current);
   };

   return (
      <>
         <div className="col-lg-12">
            <div className="form-check form-switch">
               <input
                  className="form-check-input"
                  type="checkbox"
                  onClick={handleClick}
                  role="switch"
                  id="flexSwitchCheckChecked"
                  defaultChecked=""
               />
            </div>
         </div>

         {isShown && (
            <div className="col-lg-12">
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Hyperension</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioOptions"
                           id="inlineRadio1"
                           value="option1"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="inlineRadio1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioOptions"
                           id="inlineRadio2"
                           value="option2"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="inlineRadio2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Diabetes</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadiotwo"
                           id="diabetes1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="diabetes1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadiotwo"
                           id="diabetes2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="diabetes2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Asthma</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioThree"
                           id="asthma1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="asthma1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioThree"
                           id="asthma2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="asthma2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">TB</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioFour"
                           id="tb1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="tb1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioFour"
                           id="tb2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="tb2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Typhoid</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioFive"
                           id="typhoid1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="typhoid1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioFive"
                           id="typhoid2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="typhoid2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Malaria</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioSix"
                           id="malaria1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="malaria1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioSix"
                           id="malaria2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="malaria2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Hepatits</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioSeven"
                           id="hepatits1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="hepatits1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioSeven"
                           id="hepatits2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="hepatits2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Dengue</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioEight"
                           id="dengue1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="dengue1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioEight"
                           id="dengue2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="dengue2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Fracture/ injury</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioNine"
                           id="injury1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="injury1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioNine"
                           id="injury2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="injury2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Skin diseases</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioEleven"
                           id="skin1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="skin1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioEleven"
                           id="skin2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="skin2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>

               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">IHD</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioTwelve"
                           id="IHD1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="IHD1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioTwelve"
                           id="IHD2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="IHD2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Stroke</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioThirteen"
                           id="stroke1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="stroke1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioThirteen"
                           id="stroke2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="stroke2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Surgery</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioFourteen"
                           id="surgery1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="surgery1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioFourteen"
                           id="surgery2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="surgery2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Depression</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioFifteen"
                           id="depression1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="depression1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadioFifteen"
                           id="depression2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="depression2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
               <div className="d-flex justify-content-between">
                  <div className="">
                     <p className="font-16">Others</p>
                  </div>
                  <div className="">
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadiosixteen"
                           id="Others1"
                           value="option3"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="Others1"
                        >
                           no
                        </label>
                     </div>
                     <div className="form-check form-check-inline">
                        <input
                           className="form-check-input"
                           type="radio"
                           name="inlineRadiosixteen"
                           id="Others2"
                           value="option4"
                        />
                        <label
                           className="form-check-label text-capitalize"
                           for="Others2"
                        >
                           yes
                        </label>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* show component on click  */}
         {isShown || (
            <div>
               <h2></h2>
            </div>
         )}
      </>
   );
};

export default AdditionalSymptoms;
