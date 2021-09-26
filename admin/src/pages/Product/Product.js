import React, { useEffect, useContext, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
// import Chart from "../../components/Chart/Chart";
import classes from "./Product.module.css";
import storage from "../../firebase";
// import { productData } from "../../Dummy_data";
// import { Publish } from "@material-ui/icons";
import HttpHook from "../../hooks/HttpHook";
import { AuthContext } from "../../store/auth/auth-context";
import CancelIcon from "@material-ui/icons/Cancel";
import { MovieContext } from "../../store/movie/MovieContext";
import { updateMovie } from "../../store/movie/MovieActions";

function Product() {
  const DS = process.env.REACT_APP_DOMAIN_SERVER;
  const history = useHistory();
  const { dispatch } = useContext(MovieContext);
  const { token } = useContext(AuthContext);
  const { sendRequest } = HttpHook();
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
  const [imageThumb, setImageThumb] = useState(null);
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [updatedMovie, setUpdatedMovie] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const id = useParams().id;
  useEffect(() => {
    const fetchingSingleMovie = async () => {
      const response = await sendRequest(
        `${DS}/movie/find/${id}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + token,
        }
      );
      setMovie(response?.movie);
    };
    fetchingSingleMovie();
  }, [DS, sendRequest, token, id]);

  const handlerChange = (e) => {
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: e.target.value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/update/${fileName}`).put(item.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is" + progress + "% done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUpdatedMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    upload([
      { file: image, label: "img" },
      { file: imageTitle, label: "imgTitle" },
      { file: imageThumb, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handlerUpdateImg = async (e) => {
    e.preventDefault();

    const response = await sendRequest(
      `${DS}/movie/${id}`,
      "PUT",
      JSON.stringify(updatedMovie),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    );
    dispatch(updateMovie(id, response.updatedMovie));
    history.push("/movies");
  };

  useEffect(() => {
    if (uploaded === 5) {
      setIsUpdated(true);
    }
  }, [uploaded]);

  return (
    <div className={classes.product}>
      <div className={classes.productTitleContainer}>
        <h1 className={classes.productTitle}>Movie</h1>
        <Link to="/new-product">
          <button className={classes.createProductBtn}>Create</button>
        </Link>
      </div>
      <div className={classes.productTop}>
        <div className={classes.productTopRight}>
          <div className={classes.productInfoTop}>
            <img className={classes.productImg} src={movie?.img} alt="" />
            <span className={classes.productName}>{movie?.title}</span>
          </div>
          <div className={classes.productInfoBottom}>
            <div className={classes.productInfoItem}>
              <div className={classes.productInfoKey}>Id :</div>
              <div className={classes.productInfoValue}>{movie?._id}</div>
            </div>
            <div className={classes.productInfoItem}>
              <div className={classes.productInfoKey}>Genre :</div>
              <div className={classes.productInfoValue}>{movie?.genre}</div>
            </div>
            <div className={classes.productInfoItem}>
              <div className={classes.productInfoKey}>Limit :</div>
              <div className={classes.productInfoValue}>{movie?.limit}+</div>
            </div>
            <div className={classes.productInfoItem}>
              <div className={classes.productInfoKey}>Year :</div>
              <div className={classes.productInfoValue}>{movie?.year}</div>
            </div>
            <div className={classes.productInfoItem}>
              <div className={classes.productInfoKey}>Description :</div>
              <div className={classes.productInfoValue}>{movie?.desc}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.productBottom}>
        <form onSubmit={handlerUpdateImg} className={classes.productForm}>
          <div className={classes.productFormLeft}>
            <label>Thumbnail Image</label>
            {imageThumb && (
              <img
                className={classes.imgUpdate}
                src={URL.createObjectURL(imageThumb)}
                alt=""
              ></img>
            )}
            <input
              type="file"
              onChange={(e) => setImageThumb(e.target.files[0])}
              id="imgSm"
              name="imgSm"
            />
            <label>Image</label>
            {image && (
              <img
                className={classes.imgUpdate}
                src={URL.createObjectURL(image)}
                alt=""
              ></img>
            )}
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              id="img"
              name="img"
            />
            <label>Title Image</label>
            {imageTitle && (
              <img
                className={classes.imgUpdate}
                src={URL.createObjectURL(imageTitle)}
                alt=""
              ></img>
            )}
            <input
              type="file"
              id="imgTitle"
              onChange={(e) => setImageTitle(e.target.files[0])}
              name="imgTitle"
            />
            {trailer && (
              <video
                width="300"
                className="video"
                autoPlay
                progress="true"
                controls
              >
                <source src={URL.createObjectURL(trailer)}></source>
              </video>
            )}
            <label>Trailer</label>
            <div className={classes.inputUploadTrailerContainer}>
              <input
                type="file"
                name="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
                accept="video/*"
              />
              <CancelIcon
                onClick={() => setTrailer(null)}
                className={classes.closeTrailerIcon}
              />
            </div>
            {video && (
              <video
                width="300"
                className="video"
                autoPlay
                progress="true"
                controls
              >
                <source src={URL.createObjectURL(video)}></source>
              </video>
            )}
            <label>Video</label>
            <div className={classes.inputUploadTrailerContainer}>
              <input
                type="file"
                onChange={(e) => setVideo(e.target.files[0])}
                accept="video/*"
                name="video"
              />
              <CancelIcon
                onClick={() => setVideo(null)}
                className={classes.closeTrailerIcon}
              />
            </div>
            <div className={classes.productFormRight}>
              <button disabled={isUpdated} onClick={handlerSubmit} className={classes.productButton}>
                Update
              </button>
            </div>

            <label>Movie Name</label>
            <input
              type="text"
              name="title"
              placeholder={movie?.title}
              onChange={handlerChange}
            />
            <label>Year</label>
            <input
              type="number"
              name="year"
              placeholder={movie?.year}
              onChange={handlerChange}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              placeholder={movie?.genre}
              onChange={handlerChange}
            />
            <label>Limit</label>
            <input
              type="number"
              name="limit"
              placeholder={movie?.limit}
              onChange={handlerChange}
            />
            <label>Desc</label>
            <input
              type="text"
              name="desc"
              placeholder={movie?.desc}
              onChange={handlerChange}
            />
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              placeholder={movie?.duration}
              onChange={handlerChange}
            />
            <label>Is Series</label>
            <select name="isSeries" onChange={handlerChange} id="isSeries">
              <option value="false">No</option>
              <option value="yes">Yes</option>
            </select>
            <button className={classes.createBtn} disabled={!isUpdated}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Product;
