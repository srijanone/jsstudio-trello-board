import React, { useState, useEffect } from "react";
import "./style.css";
import { GoogleLogout } from "react-google-login";
import logoutIcon from "../../../node_modules/bootstrap-icons/icons/box-arrow-right.svg";
function logout() {
  localStorage.removeItem("google_id_token");
  window.location.reload();
}
function Header() {
  return (
    <nav className="navbar navbar-light">
      <a className="navbar-brand" href="#">
        <img
          src="https://www.srijan.net/hubfs/combined-shape-22.svg"
          height={25}
          width={70}
          alt="logo"
        />
      </a>
    </nav>
  );
}
export default Header;