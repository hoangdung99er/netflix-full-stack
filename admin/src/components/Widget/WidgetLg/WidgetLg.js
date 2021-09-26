import React from "react";
import classes from "./WidgetLg.module.css";

const Button = ({ type }) => {
  return (
    <button className={`${classes.widgetLgButton} ${classes[type]}`}>
      {type}
    </button>
  );
};

function WidgetLg() {
  return (
    <div className={classes.widgetLg}>
      <h3 className={classes.widgetLgTitle}>Latest News</h3>
      <table className={classes.widgetLgTable}>
        <tbody>
          <tr className={classes.widgetLgTr}>
            <th className={classes.widgetLgTh}>Customer</th>
            <th className={classes.widgetLgTh}>Date</th>
            <th className={classes.widgetLgTh}>Amount</th>
            <th className={classes.widgetLgTh}>Status</th>
          </tr>
          <tr className={classes.widgetLgTr}>
            <td className={classes.widgetLgUser}>
              <img
                className={classes.widgetLgImg}
                src="https://images.pexels.com/photos/5472514/pexels-photo-5472514.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
              <span className={classes.widgetLgName}>Mr.Bean</span>
            </td>
            <td className={classes.widgetLgDate}>Aug 18 2021</td>
            <td className={classes.widgetLgAmount}>99.999.999 VND</td>
            <td className={classes.widgetLgStatus}>
              <Button type="Approved" />
            </td>
          </tr>
          <tr className={classes.widgetLgTr}>
            <td className={classes.widgetLgUser}>
              <img
                className={classes.widgetLgImg}
                src="https://images.pexels.com/photos/5472514/pexels-photo-5472514.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
              <span className={classes.widgetLgName}>Mr.Bean</span>
            </td>
            <td className={classes.widgetLgDate}>Aug 18 2021</td>
            <td className={classes.widgetLgAmount}>99.999.999 VND</td>
            <td className={classes.widgetLgStatus}>
              <Button type="Pending" />
            </td>
          </tr>
          <tr className={classes.widgetLgTr}>
            <td className={classes.widgetLgUser}>
              <img
                className={classes.widgetLgImg}
                src="https://images.pexels.com/photos/5472514/pexels-photo-5472514.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
              <span className={classes.widgetLgName}>Mr.Bean</span>
            </td>
            <td className={classes.widgetLgDate}>Aug 18 2021</td>
            <td className={classes.widgetLgAmount}>99.999.999 VND</td>
            <td className={classes.widgetLgStatus}>
              <Button type="Declined" />
            </td>
          </tr>
          <tr className={classes.widgetLgTr}>
            <td className={classes.widgetLgUser}>
              <img
                className={classes.widgetLgImg}
                src="https://images.pexels.com/photos/5472514/pexels-photo-5472514.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
              <span className={classes.widgetLgName}>Mr.Bean</span>
            </td>
            <td className={classes.widgetLgDate}>Aug 18 2021</td>
            <td className={classes.widgetLgAmount}>99.999.999 VND</td>
            <td className={classes.widgetLgStatus}>
              <Button type="Approved" />
            </td>
          </tr>
          <tr className={classes.widgetLgTr}>
            <td className={classes.widgetLgUser}>
              <img
                className={classes.widgetLgImg}
                src="https://images.pexels.com/photos/5472514/pexels-photo-5472514.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
              <span className={classes.widgetLgName}>Mr.Bean</span>
            </td>
            <td className={classes.widgetLgDate}>Aug 18 2021</td>
            <td className={classes.widgetLgAmount}>99.999.999 VND</td>
            <td className={classes.widgetLgStatus}>
              <Button type="Declined" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WidgetLg;
