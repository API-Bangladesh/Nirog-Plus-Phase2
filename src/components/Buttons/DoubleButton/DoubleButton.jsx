import React from 'react';
import { Link } from 'react-router-dom';

const DoubleButton = ({ btnone, btntwo, link, link2 }) => {
	return (
		<>
			<section>
				<div className="container ps-0">
					<div className="d-flex justify-content-center mb-5 mt-3">
						<Link to={link}>
							<button  className="border-0 button-color text-white py-2 px-3 text-capitalize rounded me-3">{btnone}</button>
						</Link>
						<Link to={link2}>
							<button className="border-0 button-color text-white py-2 px-3 text-capitalize rounded">{btntwo}</button>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default DoubleButton;
