import React, { useState, useContext, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import classes from "./ProductList.module.css";
import { productRows } from "../../Dummy_data";
import { MovieContext } from "../../store/movie/MovieContext";
import HttpHook from "../../hooks/HttpHook";
import { AuthContext } from "../../store/auth/auth-context";
import { getMovie, deleteMovie } from "../../store/movie/MovieActions";

function ProductList() {
  const { sendRequest } = HttpHook();
  const { movies, dispatch } = useContext(MovieContext);
  const { token } = useContext(AuthContext);
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  useEffect(() => {
    const fetchingMovies = async () => {
      const response = await sendRequest(`${DS}/movie`, "GET", null, {
        Authorization: "Bearer " + token,
      });
      dispatch(getMovie(response.movies));
    };

    fetchingMovies();
  }, [DS, sendRequest, token, dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteMovie(id));
    await sendRequest(`${DS}/movie/${id}`, "DELETE", null, {
      Authorization: "Bearer " + token,
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "movie",
      headerName: "Movie",
      width: 250,
      renderCell: (params) => {
        return (
          <div className={classes.product}>
            <img className={classes.productImg} src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    {
      field: "isSeries",
      headerName: "Type",
      width: 120,
      renderCell: (params) => {
        return <div>{params.row.isSeries ? "Series" : "Movie"}</div>;
      },
    },
    {
      field: "option",
      headerName: "Option",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/movies/${params.row._id}`}>
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
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}

export default ProductList;
