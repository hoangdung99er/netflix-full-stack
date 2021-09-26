import React, { useState, useContext } from "react";
import classes from "./NewUser.module.css";
import storage from "../../firebase";
import HttpHook from "../../hooks/HttpHook";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth/auth-context";

function NewUser() {
  const [file, setFile] = useState(null);
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { sendRequest } = HttpHook();
  const [uploaded, setUploaded] = useState(0);
  const { token } = useContext(AuthContext);
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const uploadImage = (image) => {
    const fileName =
      new Date().getTime() + "-" + image.label + "-" + image.file.name;
    const uploadTask = storage.ref(`/update/${fileName}`).put(image.file);

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
          setNewUser((prev) => {
            return { ...prev, [image.label]: url };
          });
          setUploaded((prev) => prev + 1);
        });
      }
    );
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();
    uploadImage({
      file: file,
      label: "profilePic",
    });
  };

  console.log(newUser)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest(`${DS}/user`, "POST", JSON.stringify(newUser), {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    history.push("/users");
  };

  return (
    <div className={classes.newUser}>
      <h1 className={classes.newUserTitle}>New User</h1>
      <form onSubmit={handleSubmit} className={classes.newUserForm}>
        <div className={classes.newUserItem}>
          <label>Username</label>
          <input
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="Type username here...."
          />
        </div>
        <div className={classes.newUserItem}>
          <label>Email</label>
          <input type="text" name="email" onChange={handleChange} placeholder="john" />
        </div>
        <div className={classes.newUserItem}>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} placeholder="******" />
        </div>
        <div className={classes.newUserItem}>
          <label>Profile Picture</label>
          {file && (
            <img
              className={classes.profileImage}
              src={URL.createObjectURL(file)}
              alt=""
            ></img>
          )}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            id="fileImg"
            accept="image/*"
          />
        </div>
        {/* <div className={classes.newUserItem}>
          <label>Gender</label>
          <div className={classes.newUserGender}>
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male" for="Male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female" for="Female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other" for="Other">Other</label>
          </div>
        </div> */}
        <div className={classes.newUserItem}>
          <label>Is Admin</label>
          <select
            name="isAdmin"
            onChange={handleChange}
            id="active"
            className={classes.newUserSelect}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        {uploaded === 1 ? (
          <button type="submit" className={classes.newUserButton}>
            Confirm
          </button>
        ) : (
          <button onClick={handleSubmitImage} className={classes.newUserButton}>
            Create
          </button>
        )}
      </form>
    </div>
  );
}

export default NewUser;
