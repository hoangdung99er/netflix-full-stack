import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from "./NewList.module.css";
import { ListContext } from "../../store/lists/ListContext";
import { createList } from "../../store/lists/ListsAction";
import { MovieContext } from "../../store/movie/MovieContext";
import { AuthContext } from "../../store/auth/auth-context";
import { getMovie } from "../../store/movie/MovieActions";
import HttpHook from "../../hooks/HttpHook";

function NewProduct() {
  const { sendRequest } = HttpHook();
  const history = useHistory();
  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const { token } = useContext(AuthContext);
  const [list, setList] = useState(null);
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  useEffect(() => {
    const fetchingMovies = async () => {
      const response = await sendRequest(`${DS}/movie`, "GET", null, {
        Authorization: "Bearer " + token,
      });
      dispatchMovie(getMovie(response.movies));
    };
    fetchingMovies();
  }, [DS, dispatchMovie, sendRequest, token]);

  const handleChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await sendRequest(
      `${DS}/list`,
      "POST",
      JSON.stringify(list),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    );
    dispatch(createList(response.savedList));
    history.push("/lists");
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  console.log(list);

  return (
    <div className={classes.newProduct}>
      <h1 className={classes.newProductTitle}>New Movie</h1>
      <form onSubmit={submitHandler} className={classes.newProductForm}>
        <div className={classes.newListLeft}>
          <div className={classes.newProductItem}>
            <label>Title</label>
            <input
              type="text"
              onChange={handleChange}
              name="title"
              placeholder="List name"
            />
          </div>
          <div className={classes.newProductItem}>
            <label>Genre</label>
            <input
              onChange={handleChange}
              type="type"
              name="genre"
              placeholder="Crime"
            />
          </div>
          <div className={classes.newProductItem}>
            <label>Type</label>
            <select
              name="type"
              defaultValue="movie"
              onChange={handleChange}
              className={classes.newProductSelect}
            >
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className={classes.newListLeft}>
          <div className={classes.newProductItem}>
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              className={classes.newProductSelectMultiple}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className={classes.newProductButton}>
          Create
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
