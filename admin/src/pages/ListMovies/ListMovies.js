import React, { useState, useContext, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import classes from "./ListMovies.module.css";
import { AuthContext } from "../../store/auth/auth-context";
import HttpHook from "../../hooks/HttpHook";
import { ListContext } from "../../store/lists/ListContext";
import { getLists, deleteList } from "../../store/lists/ListsAction";

function ListMovies() {
  const { sendRequest } = HttpHook();
  const { dispatch, lists } = useContext(ListContext);
  const { token } = useContext(AuthContext);
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  console.log(lists);

  useEffect(() => {
    const fetchingLists = async () => {
      const response = await sendRequest(`${DS}/list`, "GET", null, {
        Authorization: "Bearer " + token,
      });
      // console.log(response)
      dispatch(getLists(response.list));
    };

    fetchingLists();
  }, [DS, sendRequest, token, dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteList(id));
    await sendRequest(`${DS}/list/${id}`, "DELETE", null, {
      Authorization: "Bearer " + token,
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "content", headerName: "Movie List", width: 250 },
    { field: "type", headerName: "Type", width: 120 },
    {
      field: "option",
      headerName: "Option",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/lists/${params.row._id}`}>
              <button className={classes.productListEdit}>Edit</button>
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

  return (
    <div className={classes.productList}>
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(list) => list?._id}
      />
    </div>
  );
}

export default ListMovies;
