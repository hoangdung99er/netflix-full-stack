import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React from "react";
import classes from "./FeaturedInfo.module.css";

function FeaturedInfo() {
  return (
    <div className={classes.featured}>
      <div className={classes.featuredItem}>
        <span className={classes.featuredTitle}>Revanue</span>
        <div className={classes.featuredMoneyContainer}>
          <span className={classes.featuredMoney}>2,456,546 VND</span>
          <span className={classes.featuredMoneyRate}>
            -11.4%
            <ArrowDownward className={`${classes.featuredIcon} ${classes.negative}`}/>
          </span>
        </div>
        <span className={classes.featuredSub}>Compared to last month.</span>
      </div>
      <div className={classes.featuredItem}>
        <span className={classes.featuredTitle}>Revanue</span>
        <div className={classes.featuredMoneyContainer}>
          <span className={classes.featuredMoney}>2,456,546 VND</span>
          <span className={classes.featuredMoneyRate}>
            -11.4%
            <ArrowDownward className={`${classes.featuredIcon} ${classes.negative}`}/>
          </span>
        </div>
        <span className={classes.featuredSub}>Compared to last month.</span>
      </div>
      <div className={classes.featuredItem}>
        <span className={classes.featuredTitle}>Revanue</span>
        <div className={classes.featuredMoneyContainer}>
          <span className={classes.featuredMoney}>2,456,546 VND</span>
          <span className={classes.featuredMoneyRate}>
            +1.4%
            <ArrowUpward className={`${classes.featuredIcon}`}/>
          </span>
        </div>
        <span className={classes.featuredSub}>Compared to last month.</span>
      </div>
    </div>
  );
}

export default FeaturedInfo;
