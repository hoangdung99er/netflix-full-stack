import React, { useEffect, useContext, useState, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
// import Chart from "../../components/Chart/Chart";
import classes from "./List.module.css";
// import { productData } from "../../Dummy_data";
// import { Publish } from "@material-ui/icons";
import HttpHook from "../../hooks/HttpHook";
import { AuthContext } from "../../store/auth/auth-context";
import { ListContext } from "../../store/lists/ListContext";
import { updateList } from "../../store/lists/ListsAction";

function List() {
  const DS = process.env.REACT_APP_DOMAIN_SERVER;
  const history = useHistory();
  const titleRef = useRef("");
  const { dispatch } = useContext(ListContext);
  const { token } = useContext(AuthContext);
  const { sendRequest } = HttpHook();
  const [list, setList] = useState({});
  const [updateListContainer, setUpdateListContainer] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const id = useParams().listId;
  useEffect(() => {
    const fetchingSingleList = async () => {
      const response = await sendRequest(`${DS}/list/find/${id}`, "GET", null, {
        Authorization: "Bearer " + token,
      });
      setList(response.list);
    };
    fetchingSingleList();
  }, [DS, sendRequest, token, id]);

  const handlerChange = (e) => {
    setUpdateListContainer({
      ...updateListContainer,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const response = await sendRequest(
      `${DS}/list/${id}`,
      "PUT",
      JSON.stringify(updateListContainer),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    );
    dispatch(updateList(id, response.list));
    history.push("/lists");
  };

  useEffect(() => {
    if (titleRef.current.value !== "") {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }, [titleRef.current.value]);

  return (
    <div className={classes.product}>
      <div className={classes.productTitleContainer}>
        <h1 className={classes.productTitle}>List</h1>
        <Link to="/new-list">
          <button className={classes.createProductBtn}>Create</button>
        </Link>
      </div>
      <div className={classes.productTop}>
        <div className={classes.productTopRight}>
          <div className={classes.productInfoBottom}>
            <div className={classes.productInfoItem}>
              <div className={classes.productInfoKey}>Id :</div>
              <div className={classes.productInfoValue}>{list?._id}</div>
            </div>
            <div className={classes.productInfoItem}>
              <div className={classes.productInfoKey}>Genre :</div>
              <div className={classes.productInfoValue}>{list.genre}</div>
            </div>
            <div className={classes.productInfoItem}>
              <div className={classes.productInfoKey}>Type :</div>
              <div className={classes.productInfoValue}>{list?.type}</div>
            </div>
            <div className={classes.productInfoItem}>
              <div className={classes.productInfoKey}>Title :</div>
              <div className={classes.productInfoValue}>{list?.title}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.productBottom}>
        <form onSubmit={handlerSubmit} className={classes.productForm}>
          <div className={classes.productFormLeft}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              ref={titleRef}
              placeholder={list?.title}
              onChange={handlerChange}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              placeholder={list?.genre}
              onChange={handlerChange}
            />
            <label>Type</label>
            <select name="type" onChange={handlerChange} id="type">
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
            {/* <label>Content</label>
            <input
              type="number"
              name="limit"
              placeholder={list?.limit}
              onChange={handlerChange}
            /> */}
            <div className={classes.productFormRight}>
              <button
                disabled={!isUpdated}
                type="submit"
                className={classes.productButton}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default List;
