import React, { useEffect, useState, useContext } from "react";
import Featured from "../../components/Featured/Featured";
import List from "../../components/List/List";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import HttpHook from "../../hooks/HttpHook";
import { AuthContext } from "../../context/auth/AuthContext";

function Home(props) {
  const { token } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const { sendRequest } = HttpHook();
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  useEffect(() => {
    const getRandomLists = async () => {
      const response = await sendRequest(
        `${DS}/list${props.type ? "?type=" + props.type : ""}${
          genre ? "&genre=" + genre : ""
        }`,
        "GET",
        null,
        {
          Authorization: "Bearer " + token,
        }
      );

      setLists(response?.list);
    };
    getRandomLists();
  }, [DS, sendRequest, props.type, genre, token]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={props.type} setGenre={setGenre} />
      {lists?.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
}

export default Home;
