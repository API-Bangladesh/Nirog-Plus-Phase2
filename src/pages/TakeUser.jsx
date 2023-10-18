import React, { Suspense, lazy } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';

// const TakePicture = lazy(() => import("../components/TakePic/TakePictures"));

const TakeUser = () => {
	return (
		<>
			<Suspense fallback={<LazyLoader/>}>
				{/* <TakePicture /> */}
			</Suspense>
		</>
	);
};

export default TakeUser;
