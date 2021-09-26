import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import React, { useContext, useRef, useState } from "react";
import classes from "./Topbar.module.css";
import { Link } from "react-router-dom";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Backdrop from "../../shared/BackDrop/Backdrop";
import Sidebar from "../../shared/SideDrawer/Sidedrawer";
import { AuthContext } from "../../store/auth/auth-context";

function Topbar() {
  const [isToggle, setIsToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const openSettingHandler = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      {isToggle && <Backdrop onClick={() => setIsToggle(false)} />}
      {isToggle && (
        <Sidebar onClose={() => setIsToggle(false)}>
          <h2 className={classes.sidebarTitle}>Dashboard</h2>
          <ul className={classes.sidebarList}>
            <Link to="/">
              <li className={classes.sidebarItem}>Homepage</li>
            </Link>
          </ul>
          <h2 className={classes.sidebarTitle}>Quick Menus</h2>
          <ul className={classes.sidebarList}>
            <Link to="/movies">
              <li className={classes.sidebarItem}>Movies</li>
            </Link>
            <Link to="/lists">
              <li className={classes.sidebarItem}>Lists</li>
            </Link>
            <Link to="/users">
              <li className={classes.sidebarItem}>Users</li>
            </Link>
          </ul>
        </Sidebar>
      )}
      <div className={classes.topbar}>
        <div className={classes.topbarWrapper}>
          <DehazeIcon
            onClick={() => setIsToggle(true)}
            className={classes.toggleIcon}
            fontSize="large"
          />
          <Link to="/">
            <div className={classes.topLeft}>
              <span className={classes.logo}>Admin</span>
            </div>
          </Link>
          <div className={classes.topRight}>
            <div className={classes.topbarIconContainer}>
              <NotificationsNone />
              <span className={classes.topIconBagde}>2</span>
            </div>
            <div className={classes.topbarIconContainer}>
              <Language />
            </div>
            <div className={classes.topbarIconContainer}>
              <Settings />
            </div>
            <img
              onClick={openSettingHandler}
              className={classes.topAvatar}
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <div
              className={
                isOpen
                  ? `${classes.options} ${classes.isClick}`
                  : `${classes.options}`
              }
            >
              <span className={classes.optionText}>Settings</span>
              <span onClick={() => logout()} className={classes.optionText}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
