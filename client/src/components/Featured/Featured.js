import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React, { useEffect, useState, useContext } from "react";
import "./Featured.scss";
import HttpHook from "../../hooks/HttpHook";
import { AuthContext } from "../../context/auth/AuthContext";

function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const { token } = useContext(AuthContext);
  const { sendRequest } = HttpHook();
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  useEffect(() => {
    const getRandomContent = async () => {
      const response = await sendRequest(
        `${DS}/movie/random?type=${type}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + token,
        }
      );
      setContent(response?.movie[0]);
    };
    getRandomContent();
  }, [DS, sendRequest, type, token]);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            onChange={(e) => setGenre(e.target.value)}
            name="genre"
            id="genre"
          >
            <option value="horror">Horror</option>
            <option value="comedy">Comedy</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
            <option>Genre</option>
          </select>
        </div>
      )}
      <img src={content?.img} alt="" />
      <div className="info">
        <h1 className="title">{content?.title}</h1>
        <span className="desc">{content?.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
