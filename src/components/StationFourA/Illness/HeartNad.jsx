import React from 'react';
import { useState } from 'react';

const PatientIllness = () => {
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
					<form action="">
						<div className="row">
							<div className="col-lg-6">
								<input type="text" className="form-control form-radious inputBox mb-2" />
							</div>
							
						</div>
					</form>
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

export default PatientIllness;
