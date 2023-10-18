import React, {Fragment, lazy, Suspense} from 'react';
import LazyLoader from "../components/masterLayout/LazyLoader";
import NotFound from '../components/NotFound/NotFound';
// const NotFound =lazy(() => import('../components/NotFound/NotFound'));
const Page404 = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <NotFound/>
            </Suspense>
        </Fragment>
    );
};

export default Page404;