import React from "react";
import classes from "./Sidedrawer.module.css";
import ReactDOM from "react-dom";

const Sidedrawer = (props) => {
  const content = (
    <>
      <aside className={`${classes.sideDrawer}`} onClick={props.onClose}>
        {props.children}
      </aside>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default Sidedrawer;
