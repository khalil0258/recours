import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
// import Loading from "./components/global/Loading";

// import useAuth from "./use-Auth";

function ProtectedRoutes({ isAuth }) {
  // const Auth = useAuth();

  if (!isAuth ) {
    return <Navigate to="/accueil" />;
  }

 
  return <Outlet />;
}

export default ProtectedRoutes;