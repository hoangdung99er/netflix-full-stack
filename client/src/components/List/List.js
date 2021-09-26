import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, { useRef, useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./List.scss";

function List({ list }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNuber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNuber((prevState) => prevState - 1);
      listRef.current.style.transform = `translateX(${260 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNuber((prevState) => prevState + 1);
      listRef.current.style.transform = `translateX(${-260 + distance}px)`;
    }
    console.log(distance);
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
          className="arrow left"
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem key={i} index={i} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          onClick={() => handleClick("right")}
          className="arrow right"
        />
      </div>
    </div>
  );
}

export default List;
