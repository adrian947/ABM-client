import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="authContainer">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
