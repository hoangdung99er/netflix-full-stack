import React from "react";
import ReactDOM from "react-dom";
import "./Sidebar.scss";

function Sidebar(props) {
  const content = (
    <>
      <aside className={`${props.toggle}`} onClick={props.onClick}>
        {props.children}
      </aside>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
}

export default Sidebar;
