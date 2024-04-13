import React, { useEffect } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useState } from 'react';
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import './protected.css';

function ProtectedRoutes({ isAuth,loading }) {
    const [openBar, setOpenBar] = useState(true);
  console.log(isAuth)
    const sidebarOpener = (value) => {
      setOpenBar(value);
    };
  useEffect(()=>{
if( window.innerWidth<=650){
  setOpenBar(false)
}
  },[])

  if (isAuth===false&&loading===false ) {
    return <Navigate to="/"/>;
  }

 else if(isAuth===true&&loading===false){
  return (
  <div>
    <div className='app_container'>
     <SideBar  openBar={openBar} />
      <div className={`maine_container ${!openBar && "expand"}`}>
        <Header sidebarOpener={sidebarOpener} openBar={openBar}/>

        <div className={`main ${!openBar &&"expand"}`}>
          <Outlet/>
        </div>
        
      
      </div>
    </div>
  </div>
  );
}}

export default ProtectedRoutes;