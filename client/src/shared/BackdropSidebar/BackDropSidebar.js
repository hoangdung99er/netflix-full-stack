import React from "react";
import ReactDOM from "react-dom";
import "./BackDropSidebar.scss";

function BackDropSidebar(props) {
  return ReactDOM.createPortal(
    <div className="backdrop__Sidebar" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook__Sidebar")
  );
}

export default BackDropSidebar;
