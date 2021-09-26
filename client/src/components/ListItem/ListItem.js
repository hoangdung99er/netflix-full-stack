import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState, useContext } from "react";
import "./ListItem.scss";
import HttpHook from "../../hooks/HttpHook";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
// import trailer from '../../../public/assets/trailer.mp4'

function ListItem({ index, item }) {
  const { token } = useContext(AuthContext);
  const [isHoverd, setIsHovered] = useState(false);
  const { sendRequest } = HttpHook();
  const [movie, setMovie] = useState({});
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  useEffect(() => {
    const getRandomLists = async () => {
      const response = await sendRequest(
        `${DS}/movie/find/${item}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + token,
        }
      );

      setMovie(response?.movie);
    };
    getRandomLists();
  }, [DS, sendRequest, item, token]);
  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHoverd && index * 255 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHoverd && (
          <>
            <video src={movie.trailer} autoPlay={true} loop></video>
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon play" />
                <Add className="icon add" />
                <ThumbUpAltOutlined className="icon like" />
                <ThumbDownAltOutlined className="icon dislike" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limitAge">{movie.limit}+</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
export default ListItem;
