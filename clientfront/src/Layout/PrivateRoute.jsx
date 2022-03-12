import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./../hooks/useAuth";

export const PrivateRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return "Loading";

  return (
    <>
      {Object.entries(auth).length !== 0 ? (
        <div className=''>
          <Outlet />
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};
