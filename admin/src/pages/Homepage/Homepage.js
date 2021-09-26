import React, { useMemo, useContext } from "react";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import classes from "./Homepage.module.css";
import Chart from "../../components/Chart/Chart";
import { Dummy_data } from "../../Dummy_data";
import WidgetSm from "../../components/Widget/WidgetSm/WidgetSm";
import WidgetLg from "../../components/Widget/WidgetLg/WidgetLg";
import { useEffect, useState } from "react";
import HttpHook from "../../hooks/HttpHook";
import { AuthContext } from "../../store/auth/auth-context";

function Homepage() {
  const { sendRequest } = HttpHook();
  const { token } = useContext(AuthContext);
  const DS = process.env.REACT_APP_DOMAIN_SERVER;
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      const response = await sendRequest(`${DS}/user/stats`, "GET", null, {
        Authorization: "Bearer " + token,
      });
      const sortedNewUser = response.data.sort((a, b) => {
        return a._id - b._id;
      });
      sortedNewUser.map((item) =>
        setUserStats((prevState) => [
          ...prevState,
          { name: MONTHS[item._id - 1], "New User": item.total },
        ])
      );
    };
    getStats();
  }, [sendRequest ,token, DS, MONTHS]);
  return (
    <div className={classes.homepage}>
      <FeaturedInfo />
      <Chart data={userStats} grid title="User Analytics" dataKey="New User" />
      <div className={classes.homeWidget}>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

export default Homepage;
