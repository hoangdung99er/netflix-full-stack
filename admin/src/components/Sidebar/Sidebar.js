import { LineStyle, Timeline, TrendingUp } from "@material-ui/icons";
import React from "react";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarWrapper}>
        <div className={classes.sidebarMenu}>
          <h3 className={classes.sidebarTitle}>Dashboard</h3>
          <ul className={classes.sidebarList}>
            <Link to="/">
              <li className={classes.sidebarListItem}>
                <LineStyle className={classes.sidebarIcon} />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className={classes.sidebarMenu}>
          <h3 className={classes.sidebarTitle}>Quick menu</h3>
          <ul className={classes.sidebarList}>
            <Link to="/users" className={classes.link}>
              <li className={classes.sidebarListItem}>
                <LineStyle className={classes.sidebarIcon} />
                Users
              </li>
            </Link>
            <Link to="/movies" className={classes.link}>
              <li className={classes.sidebarListItem}>
                <Timeline className={classes.sidebarIcon} />
                Movies
              </li>
            </Link>
            <Link to="/lists" className={classes.link}>
              <li className={classes.sidebarListItem}>
                <TrendingUp className={classes.sidebarIcon} />
                Lists
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
