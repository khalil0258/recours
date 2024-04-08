import React, { useEffect, useState } from "react";
import "./Header.css";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AccuserPdf from "./recours_controllers/AccuserPdf";

const Header = ({ sidebarOpener, openBar }) => {
  const [laydown, setLaydown] = useState(false);
  useEffect(() => {
    setLaydown(false);
  }, []);
  return (
    <div className={`header ${!openBar && "active_header"}`}>
      {/* icon div  */}
      <div
        className="bar_icon"
        onClick={() => {
          sidebarOpener(!openBar);
        }}
      >
        <i className="bi bi-list"></i>
      </div>
      <div className="container">
        <div className="header_container">
          {/* navigatatin div  */}
          <div className="navigation_links">
            <p>Accueil</p>
          </div>
          {/* the account div  */}
          <div
            className="account_holder"
            onClick={() => setLaydown((prev) => !prev)}
          >
            {/* the circle  */}
            <div className="account_circle">
              <span>HB</span>
            </div>

            <p>Hadjaz brahim khalil</p>
            {/* <PDFDownloadLink document={<AccuserPdf />} fileName="fqa9">
              {({ loading }) =>
                loading ? (
                  <button>Loading....</button>
                ) : (
                  <button>Download</button>
                )
              }
            </PDFDownloadLink> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
