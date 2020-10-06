import React from "react";
import "./side-nav.css";
import { Link } from 'react-router-dom';
export function SideNav(props) {
  let { show, list = [], idKey, displayKey } = props;
  //const formBoardData = JSON.parse(localStorage.getItem("board"));
  return (
    <div className={`side-nav   ${show ? 'animate__animated animate__fadeIn show-side-nav' : ''}`}>
      <ul className="nav flex-column mt-2" style={{ color: "white" }}>
        <li className="nav-item">
          <Link className="nav-link active" to="/home" style={{ color: "white" }}>
            Dashboard
                    </Link>
        </li>
        {/* <li className="nav-item">
                    <Link className="nav-link" to="/configurationform" style={{ color: "white" }}>
                        ConfigForm
                    </Link>
                </li> */}
        <li class="nav-item">
          <h5 className="nav-link">Boards</h5>
        </li>
        {list.map(item =>
          <li className="nav-item" key={item[idKey]}>
            <Link className="nav-link" to={`/home/board/${item[idKey]}`} style={{ color: "white" }}>
              {item[displayKey]}
            </Link>
          </li>)}
      </ul>
    </div>
  );
}
