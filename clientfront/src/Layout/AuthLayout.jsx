import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <h1 className='primaryTitle'>ABM OPERATIONS</h1>

      <div className='authContainer'>
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
