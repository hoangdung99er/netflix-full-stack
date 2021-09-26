import React, { useEffect, useState, useContext } from "react";
import classes from "./UserList.module.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { rows } from "../../Dummy_data";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import HttpHook from "../../hooks/HttpHook";
import { AuthContext } from "../../store/auth/auth-context";

function UserList() {
  const { token } = useContext(AuthContext);
  const { sendRequest } = HttpHook();
  const [data, setData] = useState([]);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  useEffect(() => {
    const fetchingUser = async () => {
      const response = await sendRequest(`${DS}/user`, "GET", null, {
        Authorization: "Bearer " + token,
      });
      setData(response.users);
    };
    fetchingUser();
  }, [token, DS, sendRequest]);

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={classes.user}>
            <img
              className={classes.userImg}
              src={params.row.profilePic}
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "password",
      headerName: "Password",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={classes.passwordContainer}>
            <input
              type={isShowPassword ? "text" : "password"}
              disabled={!isShowPassword}
              onChange={(e) => e.preventDefault()}
              value={isShowPassword && params.row.password}
            />
            {isShowPassword && (
              <VisibilityIcon
                className={classes.passwordShow}
                onClick={() => setIsShowPassword(false)}
              />
            )}
            {!isShowPassword && (
              <VisibilityOffIcon
                onClick={() => setIsShowPassword(true)}
                className={classes.passwordShow}
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/users/${params.row._id}`}>
              <button className={classes.userListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={classes.buttonDelete}
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    setData(data.filter((item) => item.id !== id));
    await sendRequest(`${DS}/user/${id}`, "DELETE", null, {
      Authorization: "Bearer " + token,
    });
  };

  return (
    <div
      style={{ width: "100%", display: "flex", height: "100%" }}
      className={classes.userList}
    >
      <DataGrid
        rows={data}
        columnBuffer={8}
        autoHeight
        style={{ height: "100%", width: "100%" }}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}

export default UserList;
