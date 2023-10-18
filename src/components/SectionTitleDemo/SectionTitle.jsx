import React from 'react';

const SectionTitle = ({title}) => {
	return (
		<>
			<div className="titleBox position-relative">
				<h2 className="section-line text-capitalize pt-3 pb-3 fw-normal font-32">{title}</h2>
			</div>
		</>
	);
};

export default SectionTitle;
