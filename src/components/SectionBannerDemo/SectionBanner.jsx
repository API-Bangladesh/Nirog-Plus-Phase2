import React from 'react';
import '../PatientReg/PatientReg.css';
import PageBanner from '../../assets/img/banner.png';

const SectionBanner = ({title , patientName}) => {
	return (
		<>
			<div className="banner-img position-relative mb-4 d-flex align-items-center">
				<img src={PageBanner} alt="" className="section-banner-height"/>
				<div className="container banner-header ">
					<h1 className="fw-semibold font-40 text-white text-capitalize">{title}</h1>
					<p className="fw-semibold font-18 text-white text-capitalize">{patientName}</p>
				</div>
			</div>
		</>
	);
};

export default SectionBanner;