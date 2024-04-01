import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useState } from 'react';
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import './protected.css'

function ProtectedRoutes({ isAuth }) {
    const [openBar, setOpenBar] = useState(false);
  
    const sidebarOpener = (value) => {
      setOpenBar(value);
    };
  

  if (!isAuth ) {
    return <Navigate to="/accueil"/>;
  }

 
  return (<div>
     <div className='app_container'>
     <SideBar  openBar={openBar} />
      <div className={`maine_container ${!openBar && "expand"}`}>
        <Header sidebarOpener={sidebarOpener} openBar={openBar}/>
        <div className={`main ${!openBar &&"expand"}`}><Outlet/></div>
        
      
      </div>
  </div>
  </div>);
}

export default ProtectedRoutes;