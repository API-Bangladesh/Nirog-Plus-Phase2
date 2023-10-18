import React from 'react'
import { Navigate } from 'react-router-dom';

const Protected = (props) => {
    const {Component} = props;
    const token = localStorage.getItem('token');
    const myTokenData = JSON.parse(token);
    const tokenData = myTokenData?.user?.station;
    // const stations = tokenData.split(",");

  return (
    <>
      {token ? <Component/> : <Navigate to="/"/> }
    </>
  )
}

export default Protected