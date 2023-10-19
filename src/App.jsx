import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/Dashboard-Page/";
import CreatePage from "./pages/Create-Page";
import Page404 from "./pages/Page-404";
import FullscreenLoader from "./components/masterLayout/Fullscreen-Loader";
import Index from './pages/PatientReg/Index';
import TakePhoto from './pages/TakePhoto';
import UserDetail from './pages/UserDetail';
import StationHeight from './pages/SectionHeight';
import BloodPressure from './pages/BloodPressure';
import CardiovascularRisk from './pages/CardiovascularRisk';
import CardiovascularRiskLab from './pages/CardiovascularRiskLab';
import UserTable from './pages/UserTable';
import Login from './components/Login/Login';
import GlucoseInput from './pages/GlucoseInput';
import BloodPressureTable from './pages/BloodPressureTable';
import GlucoseHemTable from './pages/GlucoseHemTable'
import TreatmentPlan from './pages/StationFourA/TreatmentPlan';
import TPuserData from './components/StationFourA/TPuserInput';
// import FourCuserInput from './components/StationFourC/FourCuserInput';
import PatientRegB from './pages/StationFourB/PatientRegB'
import FourAddInformation from './pages/StationFourC/FourAddInformation';
import Prescriptions from './pages/Prescriptions';
import FinalPrescription from './pages/FinalPrescription';
import TBstatus from './pages/TBstatus';
// import GoPic from './components/TakePic/GoPic';
import PatientDataList from './pages/PatientData';
import Counter from './pages/Counter';
import Settings from './pages/Setting';
import Protected from './components/Protected';
import { Navigate } from 'react-router-dom';

const App = () => {

    const token = localStorage.getItem('token');
    // const myTokenData = JSON.parse(token);
    // const tokenData = myTokenData?.user?.station;
    // const stations = tokenData?.split(",");
    
    return (
        <>
            <BrowserRouter>    
                <Routes>
                    <Route exact path="/"  element={token ? <Navigate to="/dashboard"/> : <Login/>}/>
                    <Route exact path="/dashboard"  element={<Protected Component={DashboardPage}/>}/>
                    <Route exact path="/patient-registration" element={<Protected Component={Index}/>}/>
                    <Route exact path="/take-photo" element={<Protected Component={TakePhoto}/>}/>
                    <Route exact path="/user-details"  element={<Protected Component={UserDetail}/>}/>
                    <Route exact path="/user-table" element={<Protected Component={UserTable}/>}/>
                    <Route exact path="/height-weight" element={<Protected Component={StationHeight}/>}/>
                    <Route exact path="/blood-pressure" element={<Protected Component={BloodPressure}/>}/>
                    <Route exact path="/blood-pressure-table" element={<Protected Component={BloodPressureTable}/>}/>
                    <Route exact path="/glucose-hemoglobin-table" element={<Protected Component={GlucoseHemTable}/>}/>
                    <Route exact path="/glucose-hemoglobin" element={<Protected Component={GlucoseInput}/>}/>
                    <Route exact path="/cardiovascular-risk-lab" element={<Protected Component={CardiovascularRisk}/>}/>
                    <Route exact path="/cardiovascular-risk-nonlab" element={<Protected Component={CardiovascularRiskLab}/>}/>
                    {/* station four */}
                    <Route exact path="/treatment-plan"  element={ <Protected Component={TreatmentPlan}/>}/>
                    <Route exact path="/user-data" element={ <Protected Component={TPuserData}/>}/>
                    <Route exact path="/station-fourb"  element={<Protected Component={PatientRegB}/>}/>
                    <Route exact path="/four-c-userinput"  element={ <Protected Component={FourAddInformation}/>}/>
                    <Route exact path="/patient-list"  element={<Protected Component={PatientDataList}/>}/>
                    <Route exact path="/counter" element={<Protected Component={Counter}/>}/>
                    <Route exact path="/settings" element={<Protected Component={Settings}/>}/>                
                    <Route exact path="/tb-status" element={<Protected Component={TBstatus}/>}/>                
                    {/* Prescription */}
                    <Route exact path="/prescription"   element={<Protected Component={Prescriptions}/>}/>
                    <Route exact path="/final-prescription" element={<Protected Component={FinalPrescription}/>}/>
                    <Route exact path="/Create" element={<Protected Component={CreatePage}/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </BrowserRouter>
            <FullscreenLoader/>
        </>
    );

};

export default App;