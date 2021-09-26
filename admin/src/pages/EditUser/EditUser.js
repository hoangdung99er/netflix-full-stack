import {
  CalendarToday,
  LocationSearching,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import storage from "../../firebase";
import React from "react";
import { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import classes from "./EditUser.module.css";
import HttpHook from "../../hooks/HttpHook";
import { AuthContext } from "../../store/auth/auth-context";
import { useContext } from "react";
import { useState } from "react";

function EditUser() {
  const DS = process.env.REACT_APP_DOMAIN_SERVER;
  const history = useHistory();
  const { sendRequest } = HttpHook();
  const [user, setUser] = useState({});
  const [userUpdate, setUserUpdate] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [file, setFile] = useState(null);
  const { token } = useContext(AuthContext);
  const id = useParams().id;

  useEffect(() => {
    const fetchingSingleUser = async () => {
      const response = await sendRequest(`${DS}/user/find/${id}`, "GET", null, {
        Authorization: "Bearer " + token,
      });
      setUser(response.user);
    };
    fetchingSingleUser();
  }, [DS, sendRequest, id, token]);

  const upload = (item) => {
    const fileName = new Date().getTime() + item.label + item.file.name;
    const uploadTask = storage.ref(`/update/${fileName}`).put(item.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (err) => {
        console.log(err);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setUserUpdate((prev) => {
            return { ...prev, [item.label]: url };
          });
          setUploaded((prev) => prev + 1);
        });
      }
    );
  };

  const handleChange = (e) => {
    setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
  };

  console.log(userUpdate);

  const handleUpdateImage = async (e) => {
    e.preventDefault();
    upload({ file: file, label: "profilePic" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest(`${DS}/user/${id}`, "PUT", JSON.stringify(userUpdate), {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    history.push("/users");
  };

  return (
    <div className={classes.editUser}>
      <div className={classes.userTitleContainer}>
        <h1 className={classes.userTitle}>Edit User</h1>
        <Link to="/new-user">
          <button className={classes.userAddButton}>Create</button>
        </Link>
      </div>
      <div className={classes.userContainer}>
        <div className={classes.userShow}>
          <div className={classes.userShowTop}>
            <img className={classes.userImg} src={user.profilePic} alt="" />
            <div className={classes.userShowTopTitle}>
              <span className={classes.userShowUsername}>{user.username}</span>
              <span className={classes.userShowJob}>Software Engineer</span>
            </div>
          </div>
          <div className={classes.userShowBottom}>
            <span className={classes.userShowTitle}>Account Detail</span>
            <div className={classes.userShowInfo}>
              <PermIdentity className={classes.userShowIcon} />
              <span className={classes.userShowInfoTitle}>{user.username}</span>
            </div>
            <div className={classes.userShowInfo}>
              <CalendarToday className={classes.userShowIcon} />
              <span className={classes.userShowInfoTitle}>{user.email}</span>
            </div>
            <span className={classes.userShowTitle}>Contact Detail</span>
            <div className={classes.userShowInfo}>
              <LocationSearching className={classes.userShowIcon} />
              <span className={classes.userShowInfoTitle}>annabeck99</span>
            </div>
            <div className={classes.userShowInfo}>
              <PermIdentity className={classes.userShowIcon} />
              <span className={classes.userShowInfoTitle}>annabeck99</span>
            </div>
            <div className={classes.userShowInfo}>
              <PermIdentity className={classes.userShowIcon} />
              <span className={classes.userShowInfoTitle}>annabeck99</span>
            </div>
          </div>
        </div>
        <div className={classes.userUpdate}>
          <span className={classes.userUpdateTitle}>Edit</span>
          <form onSubmit={handleSubmit} className={classes.userUpdateFrom}>
            <div className={classes.userUpdateLeft}>
              <div className={classes.userUpdateItem}>
                <label>Username</label>
                <input
                  className={classes.userUpdateInput}
                  type="text"
                  onChange={handleChange}
                  name="username"
                  placeholder={user.username}
                />
              </div>
              <div className={classes.userUpdateItem}>
                <label>Email</label>
                <input
                  className={classes.userUpdateInput}
                  type="email"
                  onChange={handleChange}
                  name="email"
                  placeholder={user.email}
                />
              </div>
              <div className={classes.userUpdateItem}>
                <label>Password</label>
                <input
                  className={classes.userUpdateInput}
                  type="password"
                  onChange={handleChange}
                  name="password"
                  placeholder="******"
                />
              </div>
            </div>
            <div className={classes.userUpdateRight}>
              <div className={classes.userUploadImage}>
                {file && (
                  <img
                    className={classes.userUpdateImg}
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                )}
                {!file && (
                  <img
                    className={classes.userUpdateImg}
                    src={user.profilePic}
                    alt=""
                  />
                )}
                <label htmlFor="file">
                  <Publish className={classes.uploadIcon} />
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  id="file"
                  type="file"
                />
              </div>
              {uploaded === 1 ? (
                <button type="submit" className={classes.userUpdateButton}>
                  Confirm
                </button>
              ) : (
                <button
                  onClick={handleUpdateImage}
                  className={classes.userUpdateButton}
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
