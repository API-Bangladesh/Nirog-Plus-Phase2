import React, { Suspense, lazy } from "react";
import LazyLoader from "../../components/masterLayout/LazyLoader";

const PatientReg = lazy(() => import("../../components/PatientReg/PatientReg"));


const Index = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader/>}>
        <PatientReg/>
      </Suspense>
    </>
  )
}

export default Index