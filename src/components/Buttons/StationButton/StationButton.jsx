import React from 'react';
import './StationButton.css';
import { Link } from "react-router-dom";

const StationButton = ({ btnOne, link, btnBg }) => {
	return (
		<>
			<section className="stationBtn">
				<Link to={link}>
					<button className={`border-0 button-color text-white py-2 px-3 text-capitalize rounded	${btnBg}`}>{btnOne}</button>
				</Link>
			</section>
		</>
	);
};

export default StationButton;
