import React, { useEffect, useState, Component } from "react";
import status_colors from "./status_colors";
import ReactTooltip from "react-tooltip";
import { withFirebase } from "../Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "react-notifications/lib/notifications.css";
import { NotificationContainer, NotificationManager, } from "react-notifications";
import Autocomplete from "./autocomplete";

const styles = {
  overallContainerStyle: {
    margin: "25px 100px",
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
            data-tip={color.status}
            data-place="top"
            onMouseEnter={(e) => handleCursor(e, "enter")}
            onMouseLeave={(e) => handleCursor(e, "leave")}
            onClick={(e) => updateStatus(e)}
            style={styles.imageStyle(55)}
            src={color.link}
            alt={color.status}
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
    <div className="tile" id="profile-card">
      <div className="card" style={{ minWidth: "100%" }}>
        <div className="card-image">
          <figure className="image" style={{ margin: "10px" }}>
            <img
              style={styles.imageStyle(200)}
              // src={demoProfile.image}
              src={user.picture}
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
          <p> {user.description.toLowerCase()}</p>
          <br></br>
          {renderStatusButtons(props, user)}
          <br></br>
          <div className="has-text-centered">
            <button
              className="button is-dark is-centered"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          </div>
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
    // props.firebase.writeUserData("picture", user.picture);
    setEditMode(false);
    // getSnapshot();
  }

  return (
    <div className="tile" id="profile-card">
      <div className="card" style={{ minWidth: "100%" }}>
        <div className="card-image">
          <figure className="image" style={{ margin: "10px" }}>
            <img
              style={styles.imageStyle(200)}
              src={user.picture}
              alt={`profile: ${user.fullname.toLowerCase()}`}
            ></img>
          </figure>
        </div>
        <div className="card-content">
          <div className="has-text-centered" style={styles.inputStyle}>
            <textarea
              className="input"
              type="text"
              id="fullname"
              placeholder="full name"
              onChange={(e) => (user.fullname = e.target.value)}
              defaultValue={user.fullname.toLowerCase()}
            />
            <textarea
              className="input"
              type="text"
              id="username"
              placeholder="username"
              onChange={(e) => (user.username = e.target.value)}
              defaultValue={user.username.toLowerCase()}
            />
          </div>
          <div style={styles.inputStyle}>
            <textarea
              className="textarea"
              type="text"
              id="description"
              placeholder="description"
              onChange={(e) => (user.description = e.target.value)}
              defaultValue={user.description.toLowerCase()}
            />
          </div>
        </div>
        <br></br>
        {renderStatusButtons(props, user)}
        <br></br>
        <div className="has-text-centered">
          <button
            className="button is-dark is-centered"
            onClick={() => updateProfile()}
          >
            Save
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
    <div className="tile is-child">
      {friendsList.map((obj) => (
        <article
          className="media"
          key={obj.username}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 5px #888888")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
        >
          <div className="media-left">
            <figure className="image">
              <img
                style={styles.imageStyle(100)}
                src={obj.picture}
                alt={obj.fullname.toLowerCase() + " profile"}
              ></img>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <div>
                <strong>{obj.fullname.toLowerCase()}</strong>
                <br></br>
                <em>{obj.username.toLowerCase()}</em>
                <p style={styles.statusStyle(obj.status)}>{obj.status.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </article>
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
    <section className="section">
      <NotificationContainer />
      <div className="container">
        <div className="content">
          <div
            className="tile is-ancestor"
            style={styles.overallContainerStyle}
          >
            {renderProfile(editMode, setEditMode, snapshot, props)}
            <div className="tile is-parent is-vertical" id="friends-list">
              <figure>
                <u className="title">friends</u>
                <br></br>&nbsp;
                <div>
                  <div className="field has-addons">
                    {/* Input field */}
                    <div className="control is-expanded">
                      {/* <input
                        className="input is-fullwidth"
                        type="text"
                        id="friendInput"
                        placeholder="Enter username here"
                      ></input> */}
                      {/* get all the usernames here */}
                      <Autocomplete suggestions={getUserList(usernameList)} />
                    </div>{" "}
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
              <div className="tile">{renderFriendsList(friendsList)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <p></p>
  );
}

export default withFirebase(Profile);
