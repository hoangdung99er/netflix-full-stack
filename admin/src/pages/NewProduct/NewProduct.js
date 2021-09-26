import React, { useState, useContext } from "react";
import {useHistory} from 'react-router-dom'
import classes from "./NewProduct.module.css";
import storage from "../../firebase";
import { MovieContext } from "../../store/movie/MovieContext";
import { createMove } from "../../store/movie/MovieActions";
import { AuthContext } from "../../store/auth/auth-context";
import HttpHook from "../../hooks/HttpHook";

function NewProduct() {
  const { sendRequest } = HttpHook();
  const history = useHistory();
  const { dispatch } = useContext(MovieContext);
  const { token } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
  const [imageThumb, setImageThumb] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);

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
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: image, label: "img" },
      { file: imageTitle, label: "imgTitle" },
      { file: imageThumb, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await sendRequest(
      `${DS}/movie`,
      "POST",
      JSON.stringify(movie),
      {
        "Content-Type" : "application/json",
        Authorization: "Bearer " + token,
      }
    );
    dispatch(createMove(response.savedMovie));
    history.push("/movies")
  };

  return (
    <div className={classes.newProduct}>
      <h1 className={classes.newProductTitle}>New Movie</h1>
      <form onSubmit={submitHandler} className={classes.newProductForm}>
        {uploaded === 5 ? (
          <>
            <div className={classes.newProductItem}>
              <label>Title</label>
              <input
                type="text"
                onChange={handleChange}
                name="title"
                placeholder="Movie name"
              />
            </div>
            <div className={classes.newProductItem}>
              <label>Desciption</label>
              <input type="text" onChange={handleChange} name="desc" />
            </div>
            <div className={classes.newProductItem}>
              <label>Year</label>
              <input
                onChange={handleChange}
                type="number"
                name="year"
                min="1900"
                max="2030"
                placeholder="1999"
              />
            </div>
            <div className={classes.newProductItem}>
              <label>Limit</label>
              <input
                onChange={handleChange}
                type="number"
                name="limit"
                placeholder="8+"
                min="6"
                max="18"
              />
            </div>
            <div className={classes.newProductItem}>
              <label>Duration</label>
              <input
                onChange={handleChange}
                type="text"
                limit="duration"
                name="duration"
                placeholder="1h 5m 45s"
              />
            </div>
            <div className={classes.newProductItem}>
              <label>Genre</label>
              <input
                onChange={handleChange}
                type="text"
                name="genre"
                placeholder="Horror"
              />
            </div>
            <div className={classes.newProductItem}>
              <label>Is Series?</label>
              <select
                name="isSeries"
                defaultValue="movie"
                onChange={handleChange}
                className={classes.newProductSelect}
                id="isSeries"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className={classes.newProductItem}>
              <label>Image</label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                name="img"
                style={{ border: "none" }}
                type="file"
                id="img"
              />
            </div>
            <div className={classes.newProductItem}>
              <label>Image Title</label>
              <input
                name="imgTitle"
                onChange={(e) => setImageTitle(e.target.files[0])}
                style={{ border: "none" }}
                type="file"
                id="imgTitle"
              />
            </div>
            <div className={classes.newProductItem}>
              <label>Image Thumbnail</label>
              <input
                name="imgSm"
                onChange={(e) => setImageThumb(e.target.files[0])}
                style={{ border: "none" }}
                type="file"
                id="imgSm"
              />
            </div>
            <div className={classes.newProductItem}>
              <label>Trailer</label>
              <input
                name="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
                style={{ border: "none" }}
                type="file"
                accept="video/*"
                id="trailer"
              />
            </div>
            <div className={classes.newProductItem}>
              <label>Video</label>
              <input
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
                style={{ border: "none" }}
                type="file"
                accept="video/*"
                id="video"
              />
            </div>
          </>
        )}
        {uploaded === 5 ? (
          <button type="submit" className={classes.newProductButton}>
            Create
          </button>
        ) : (
          <button onClick={handleUpload} className={classes.newProductButton}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

export default NewProduct;
