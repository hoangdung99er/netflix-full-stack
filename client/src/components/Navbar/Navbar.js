import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Fuse from "fuse.js";
import "./Navbar.scss";
import { Search, Notifications, ArrowDropDown } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import BackdropSidebar from "../../shared/BackdropSidebar/BackDropSidebar";
import HttpHook from "../../hooks/HttpHook";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Sidebar from "../../shared/SideBar/Sidebar";
import Backdrop from "../../shared/BackDrop/BackDrop";

function Navbar() {
  const { sendRequest } = HttpHook();
  const { isLoggedIn, logout, token } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [isToggleSetting, setIsToggleSetting] = useState(false);
  const [movies, setMovies] = useState([]);
  // const typingRef = useRef(null);
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  useEffect(() => {
    if (search.length !== 0) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [search]);

  useEffect(() => {
    const fetchingAllMovie = async () => {
      const response = await sendRequest(`${DS}/movie/all`, "GET", null, {
        Authorization: "Bearer " + token,
      });
      setMovies(response.movies);
    };
    fetchingAllMovie();
  }, [DS, sendRequest, token]);

  const options = {
    includeScore: true,
    keys: ["title"],
  };

  const fuse = new Fuse(movies, options);

  const results = fuse.search(search);

  const characterResutls = results.map((result) => result.item);

  // const findingMovie = useCallback(async (title) => {
  //   const response = await sendRequest(
  //     `${DS}/auth/register`,
  //     "POST",
  //     JSON.stringify(title),
  //     {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     }
  //   );
  // }, []);

  // const handleChange = (e) => {
  //   const value = e.target.value;

  //   typingRef.current = setTimeout(() => {
  //     setSearch(value);
  //     // findingMovie();
  //   }, 100);
  //   return () => {
  //     clearTimeout(typingRef.current);
  //   };
  // };

  // console.log(search)

  const toggleHandlerSidebar = () => {
    setIsToggle(true);
  };

  const toggleCloseSideBar = () => {
    setIsToggle(false);
  };

  const handlerToggleSetting = () => {
    setIsToggleSetting((prev) => !prev);
  };

  return (
    <>
      {isToggle && <BackdropSidebar onClick={toggleCloseSideBar} />}
      {isToggle && (
        <Sidebar
          toggle={isToggle ? "side-drawer" : "toggleTransformClose"}
          onClick={toggleCloseSideBar}
        >
          <ul className="sidebar__List">
            <Link to="/movies">
              <li className="sidebar__Item">Movies</li>
            </Link>
            <Link to="/series">
              <li className="sidebar__Item">Series</li>
            </Link>
          </ul>
        </Sidebar>
      )}
      {isShow && <Backdrop onClick={() => setIsShow(false)} />}
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
          <div className="left">
            <DehazeIcon onClick={toggleHandlerSidebar} className="navbarIcon" />
            <img
              src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
              alt=""
            />
            <Link className="link" to="/">
              <span>Homepage</span>
            </Link>
            <Link className="link" to="/series">
              <span>Series</span>
            </Link>
            <Link className="link" to="/movies">
              <span>Movies</span>
            </Link>
            <span>New and Popular</span>
            <span>My list</span>
          </div>
          <div className="right">
            <div className="search-box">
              <button className="btn-search">
                <Search className="icon" />
              </button>
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="input-search"
                placeholder="Type to Search..."
              />
              {isShow && (
                <div
                  style={isShow ? { display: "block" } : { display: "none" }}
                  className="movieSearchContainer"
                >
                  {characterResutls.map((item, i) => (
                    <>
                      <div key={i} className="item-movie">
                        <div className="img_movieContainer">
                          <img className="img_movie" src={item.img} alt="" />
                        </div>
                        <div className="movie-info">
                          <span>
                            {item.title} <span>({item.year})</span>
                          </span>
                          <span className="movieDesc">{item.desc}</span>
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}
                </div>
              )}

              <div className="profileResposive">
                <div
                  className={
                    isToggleSetting
                      ? "optionResponsive isClick"
                      : "optionResponsive"
                  }
                >
                  <span>Settings</span>
                  <span onClick={() => logout()}>Logout</span>
                </div>
              </div>
            </div>
            {isLoggedIn && (
              <>
                <span className="textImg">KID</span>
                <div className="iconNoti">
                  <Notifications className="icon" />
                  <span className="iconBadge"></span>
                </div>
                <img
                  onClick={handlerToggleSetting}
                  src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                  alt=""
                />
                <div className="profile">
                  <ArrowDropDown className="icon" />
                  <div className="option">
                    <span>Settings</span>
                    <span onClick={() => logout()}>Logout</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
