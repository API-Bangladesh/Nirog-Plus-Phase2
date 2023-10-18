import React from 'react';
import './SingleButton.css';
import { Link } from "react-router-dom";

const SingleButton = ({ btnOne, link, btnBg  }) => {
	return (
		<>
			<section>
				<div className="container">
					<Link to={link}>
						<button className={`border-0 button-color text-white py-2 px-3 text-capitalize rounded	${btnBg}`}>{btnOne}</button>
					</Link>
				</div>
			</section>
		</>
	);
};

export default SingleButton;
