import React, { useEffect } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useState } from 'react';
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import './protected.css';

function ProtectedRoutes({ isAuth,loading }) {
    const [openBar, setOpenBar] = useState(true);
    const [phone, setPhone] = useState(false);
  console.log(isAuth)
    const sidebarOpener = (value) => {
      setOpenBar(value);
    };
  useEffect(()=>{
if( window.innerWidth<=650){
  setOpenBar(false)
  setPhone(true)
}
  },[])

  if (isAuth===false&&loading===false ) {
    return <Navigate to="/"/>;
  }

 else if(isAuth===true&&loading===false){
  return (
  <div>
    <div className='app_container'>
     <SideBar  openBar={openBar} setOpenBar={setOpenBar} phone={phone}/>
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