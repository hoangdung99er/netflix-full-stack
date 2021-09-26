import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { useLocation,Link } from "react-router-dom";
import "./FullScreen.scss";

function FullScreen() {
  const location = useLocation();
  return (
    <div className="fullscreen">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={location.movie?.video}
      ></video>
    </div>
  );
}

export default FullScreen;
