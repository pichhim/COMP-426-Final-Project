import React, { useEffect, useState } from "react";
import status_colors from "./status_colors";
import ReactTooltip from "react-tooltip";
import { withFirebase } from "../Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "react-notifications/lib/notifications.css";
import { NotificationContainer, NotificationManager, } from "react-notifications";
import Autocomplete from "./autocomplete";
import { generateAvatar } from "../Landing/index.js";

const styles = {
  overallContainerStyle: {
    // margin: "25px 100px",
  },
  inputStyle: {
    margin: "20px",
  },
  loadStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  imageStyle: function (length) {
    return {
      width: `${length}px`,
      height: `${length}px`,
      position: "relative",
      objectFit: "cover",
      overflow: "hidden",
      borderRadius: "50%",
      border: "0px solid",
    };
  },
  statusStyle: function (userStatus) {
    const color = status_colors.filter(
      (color) => color.status === userStatus
    )[0].hex;
    return {
      color: `#${color}`,
    };
  },
  title: {
    margin: "0px",
  },
  button: {
    margin: "10px",
  }
};

// Render status buttons
function renderStatusButtons(props, user) {
  function updateStatus(e) {
    // Updates status by writing to Firebase DB
    props.firebase.writeUserData("status", e.currentTarget.alt);
    // getSnapshot();
  }
  function handleCursor(e, action) {
    // Cursor and border effect for buttons
    if (action === "enter") {
      e.currentTarget.style.border = "3px solid";
      e.currentTarget.style.cursor = "pointer";
    } else {
      e.currentTarget.style.border = "";
      e.currentTarget.style.cursor = "";
    }
  }
  return (
    <div className="columns is-mobile is-multiline is-centered">
      {status_colors.map((color) => (
        <div className="column is-narrow" key={color.color}>
          <img
            data-tip={color.status.toLowerCase()}
            data-place="top"
            onMouseEnter={(e) => handleCursor(e, "enter")}
            onMouseLeave={(e) => handleCursor(e, "leave")}
            onClick={(e) => updateStatus(e)}
            style={styles.imageStyle(55)}
            src={color.link}
            alt={color.status.toLowerCase()}
          ></img>
          <ReactTooltip></ReactTooltip>
        </div>
      ))}
    </div>
  );
}

// Render profile card
function renderProfile(editMode, setEditMode, user, props) {
  // console.log(user);
  return editMode ? (
    renderProfileEdit(setEditMode, user, props)
  ) : (
      <div className="card" id="profile-card" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="card-image  has-text-centered" style={{ display: 'flex', justifyContent: 'center' }}>
          <figure className="image is-inline-block" style={{ margin: "1rem" }}>
            <img
              style={styles.imageStyle(200)}
              src={`${user.picture}`}
              alt={`Profile: ${user.fullname}`}
            ></img>
          </figure>
        </div>
        <div className="card-content">
          <div className="has-text-centered">
            <strong>{user.fullname.toLowerCase()}</strong>
            <br></br>
            <em>{user.username.toLowerCase()}</em>
            <div>
              <p style={styles.statusStyle(user.status)}>{user.status.toLowerCase()}</p>
            </div>
          </div>
          <br></br>
          <p className="has-text-centered"> {user.description}</p>
          <br></br>
          {renderStatusButtons(props, user)}
          <br></br>
          <div className="has-text-centered">
            <button style={styles.button}
              className="button is-dark is-centered"
              onClick={() => setEditMode(true)}
            >
              edit
            </button>
          </div>
        </div>
      </div>
    );
}

// Edit mode for user profile
function renderProfileEdit(setEditMode, user, props) {
  function updateProfile() {
    props.firebase.writeUserData("fullname", user.fullname);
    props.firebase.writeUserData("username", user.username);
    props.firebase.writeUserData("description", user.description);
    props.firebase.writeUserData("picture", generateAvatar(user.fullname));
    setEditMode(false);
    // getSnapshot();
  }

  return (
    <div className="card" id="profile-card" style={{ height: 'calc(100vh - 200px)' }}>
      <div className="card-image  has-text-centered" style={{ display: 'flex', justifyContent: 'center' }}>
        <figure className="image is-inline-block" style={{ margin: "1rem" }}>
          <img
            style={styles.imageStyle(200)}
            src={`${user.picture}&size=512`}
            alt={`Profile: ${user.fullname}`}
          ></img>
        </figure>
      </div>
      <div className="card-content">
        <div className="has-text-centered" style={styles.inputStyle}>
          <textarea
            className="input"
            type="text"
            id="fullname"
            placeholder="Full name"
            onChange={(e) => (user.fullname = e.target.value)}
            defaultValue={user.fullname}
          />
          <textarea
            className="input"
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => (user.username = e.target.value)}
            defaultValue={user.username}
          />
        </div>
        <div style={styles.inputStyle}>
          <textarea
            className="textarea"
            type="text"
            id="description"
            placeholder="Description"
            onChange={(e) => (user.description = e.target.value)}
            defaultValue={user.description}
          />
        </div>
        {/* {renderStatusButtons(props, user)} */}
        <div className="has-text-centered">
          <button style={styles.button}
            className="button is-dark is-centered"
            onClick={() => updateProfile()}
          >
            save
          </button>
        </div>
      </div>

    </div>
  );
}

// Render friends list
function renderFriendsList(friendsList) {
  return friendsList === [] ? (
    ""
  ) : (
      <div className="tile is-child" style={{ overflow: 'auto', height: 'calc(100vh - 400px)' }}>
        {friendsList.map((obj) => (
          <div className="container" style={{ width: '100%', marginBottom: '1rem' }}>
            <article
              className="media custom-is-hoverable"
              key={obj.username}
              // onMouseEnter={(e) =>
              //   (e.currentTarget.style.boxShadow = "0 0 5px #888888")
              // }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
            >
              <div className="media-left">
                <figure className="image">
                  <img
                    style={styles.imageStyle(100)}
                    src={`${obj.picture}&size=512`}
                    alt={obj.fullname + " profile"}
                  ></img>
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <div>
                    <strong>{obj.fullname}</strong>
                    <br></br>
                    <em>{obj.username}</em>
                    <p style={styles.statusStyle(obj.status)}>{obj.status}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    );
}

// Render overall Profile page
function Profile(props) {
  const [editMode, setEditMode] = useState(false); // Renders Editable profile if in Edit mode
  const [snapshot, setSnapshot] = useState(null); // Holds logged in user data
  const [friendsList, setFriendsList] = useState([]); // Holds Friends list data
  const [usernameList, setUsernameList] = useState([])

  // const getSnapshot = () => {
  //   let snapPromise = props.firebase.getCurrentUser();
  //   snapPromise.then((val) => setSnapshot(val));
  // };

  // useEffect(getSnapshot, []);

  function getUserList(usernameList) {
    let userList = usernameList.map((obj) => (obj.username));
    return userList;
  }

  // gets all list of all usernames
  // const getAllUsers = () => {
  //   const db = props.firebase.getDB();
  //   let usernames = []; 

  //   try {
  //     let listener = db.ref(`/users`).on("value", snapshot => {
  //       console.log(snapshot.val())
  //       if (snapshot !== null) {
  //         snapshot.forEach(function(child) {
  //           usernames[usernames.length] = snapshot.val()[child.key].username
  //         })
  //       }
  //     })



  //     return usernames;
  //   } catch(error) {
  //     return error;
  //   }
  // };

  // const getUserList = () => {
  //   const db = props.firebase.getDB();
  //   const uid = props.user.uid;

  //   try {
  //     let listener = db.ref(`/users`).on("value", snapshot => {
  //       // let self = snapshot.val()[uid];
  //       // setSnapshot(self)
  //       // let friends = self.friends;
  //       // let friendInfo = [];
  //       let usernames = [];
  //       console.log(snapshot.val());
  //       // for (let snap in snapshot.val()) {
  //       //   if (friends && snap in friends) {
  //       //     friendInfo.push({
  //       //       ...snapshot.val()[snap],
  //       //       key: snap
  //       //     })
  //       //   }
  //       // }


  //       snapshot.forEach(function(child) {
  //         usernames[usernames.length] = snapshot.val()[child.key].username
  //       })

  //       //setUsernameList(usernames);

  // };

  // console.log(getUserList());

  const getFriendsList = () => {
    const db = props.firebase.getDB();
    const uid = props.user.uid;

    try {
      let listener = db.ref(`/users`).on("value", (snapshot) => {

        if (snapshot.val() == null) {
          return () => db.ref(`/users`).off("value", listener);
        }

        let self = snapshot.val()[uid];
        setSnapshot(self);
        let friends = self.friends;
        let friendInfo = [];
        let userList = [];
        for (let snap in snapshot.val()) {
          userList.push({
            ...snapshot.val()[snap],
            key: snap
          })
          if (friends && snap in friends) {
            friendInfo.push({
              ...snapshot.val()[snap],
              key: snap,
            });
          }
        }

        setUsernameList(userList)
        setFriendsList(friendInfo)
      })
      return () => db.ref(`/users`).off("value", listener);
    } catch (error) {
      alert("error reading friend info");
    }
  };

  useEffect(getFriendsList, []);

  // Takes in input and Adds or Removes friend (based on click)
  async function addFriend() {
    let username = document.getElementById("friendInput").value;
    let message = "";
    if (username !== "") {
      message = await props.firebase.pushUserData("friends", username);
    }
    switch (message) {
      case "invalid user":
        NotificationManager.warning(
          "",
          `username ${username.toLowerCase()} is an invalid user.`
        );
        break;
      case "already added":
        NotificationManager.warning(
          "",
          `you have already added ${username.toLowerCase()} as a friend.`
        );
        break;
      case "success":
        getFriendsList();
        NotificationManager.success(
          "",
          `you have added ${username.toLowerCase()} as a friend.`
        );
        break;
      default:
        break; // No input: do nothing
    }
  }
  async function removeFriend() {
    let username = document.getElementById("friendInput").value;
    let message = "";
    if (username !== "") {
      message = await props.firebase.unfriend(username);
    }
    switch (message) {
      case "Invalid user":
        NotificationManager.warning(
          "",
          `username ${username.toLowerCase()} is an invalid user.`
        );
        break;
      case "not in friend's list":
        NotificationManager.warning(
          "",
          `you do not have ${username.toLowerCase()} added as a friend.`
        );
        break;
      case "success":
        getFriendsList();
        NotificationManager.error("", `you have unfriended ${username.toLowerCase()}.`);
        break;
      default:
        break; // No input: do nothing
    }
  }

  return snapshot !== null ? (
    <section>
      <NotificationContainer />
      <div className="container">
        <div className="columns is-vcentered is-centered" style={{ height: 'calc(100vh - 90px)' }}>
          <div
            className="column is-5 is-narrow"
            style={styles.overallContainerStyle}
          >
            {renderProfile(editMode, setEditMode, snapshot, props)}
          </div>
          <div className="column is-5 is-narrow">
            <div className="card has-text-centered" id="friends-list" style={{ height: 'calc(100vh - 200px)' }}>
              <div className="card-content">
                <figure style={{ height: '100px', zIndex: '100' }}>
                  <u className="title">Friends</u>
                  <br></br>&nbsp;
                <div>
                    <div className="field has-addons">
                      {/* Input field */}
                      <div className="control is-expanded" style={{ position: 'relative' }}>
                        {/* <input
                        className="input is-fullwidth"
                        type="text"
                        id="friendInput"
                        placeholder="Enter username here"
                      ></input> */}
                        {/* get all the usernames here */}
                        <Autocomplete suggestions={getUserList(usernameList)} />
                      </div>
                    &nbsp;
                    <div className="buttons is-right">
                        {/* Friend adder */}
                        <button
                          className="button"
                          data-tip="Add Friend"
                          data-place="top"
                          onClick={() => addFriend()}
                        >
                          <span className="icon is-small">
                            <FontAwesomeIcon icon={faPlus} />
                          </span>
                        </button>
                        {/* Friend remover */}
                        <button
                          className="button"
                          data-tip="Unfriend"
                          data-place="top"
                          onClick={() => removeFriend()}
                        >
                          <span className="icon is-small">
                            <FontAwesomeIcon icon={faMinus} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </figure>
                <br></br>&nbsp;
              <div className="tile">{renderFriendsList(friendsList)}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section >
  ) : (
      <p></p>
    );
}

export default withFirebase(Profile);
