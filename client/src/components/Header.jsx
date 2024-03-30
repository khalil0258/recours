import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="general_holder">
        {/* navigatatin div  */}
        <div className="navigation_links">
          <h4>Accueil</h4>
        </div>
        {/* the account div  */}
        <div className="account_holder">
          {/* the cicle  */}
          <div className="account_circle">
            <span>HB</span>
          </div>
          <div>
            <h4>Hadjaz brahim khalil</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
