import React, { useEffect, useState } from "react";
import status_colors from "./status_colors";
import ReactTooltip from "react-tooltip";
import { withFirebase } from "../Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const demoProfile = {
  image:
    "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640",
};

const styles = {
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
  addPopup: {
    display: "none",
  },
  removePopup: {
    display: "none",
  },
};

// Render status buttons
function renderStatusButtons(props, user, getSnapshot) {
  function updateStatus(e) {
    // Updates status by writing to Firebase DB
    props.firebase.writeUserData("status", e.currentTarget.alt);
    getSnapshot();
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
function renderProfile(editMode, setEditMode, user, props, getSnapshot) {
  return editMode ? (
    renderProfileEdit(setEditMode, user, props, getSnapshot)
  ) : (
    <div className="tile" id="profile-card">
      <div className="card" style={{ minWidth: "100%" }}>
        <div className="card-image">
          <figure className="image" style={{ margin: "10px" }}>
            <img
              style={styles.imageStyle(200)}
              src={demoProfile.image}
              alt={`Profile: ${demoProfile.name}`}
            ></img>
          </figure>
        </div>
        <div className="card-content">
          <div className="has-text-centered">
            <strong>{user.fullname}</strong>
            <br></br>
            <em>{user.username}</em>
            <div>
              <p style={styles.statusStyle(user.status)}>{user.status}</p>
            </div>
          </div>
          <br></br>
          <p> {user.description}</p>
          <br></br>
          {renderStatusButtons(props, user, getSnapshot)}
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
function renderProfileEdit(setEditMode, user, props, getSnapshot) {
  function updateProfile() {
    props.firebase.writeUserData("fullname", user.fullname);
    props.firebase.writeUserData("username", user.username);
    props.firebase.writeUserData("description", user.description);
    // props.firebase.writeUserData("picture", user.picture);
    setEditMode(false);
    getSnapshot();
  }
  return (
    <div className="tile" id="profile-card">
      <div className="card" style={{ minWidth: "100%" }}>
        <div className="card-image">
          <figure className="image" style={{ margin: "10px" }}>
            <img
              style={styles.imageStyle(200)}
              src={demoProfile.image}
              alt={`Profile: ${demoProfile.name}`}
            ></img>
          </figure>
        </div>
        <div className="card-content">
          <form>
            <input type="file" />
          </form>
        </div>
        <div className="has-text-centered" style={styles.inputStyle}>
          <textarea
            className="input"
            type="text"
            id="fullname"
            placeholder="Full name"
            onChange={(e) => (user.fullname = e.target.value)}
          >
            {user.fullname}
          </textarea>
          <textarea
            className="input"
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => (user.username = e.target.value)}
          >
            {user.username}
          </textarea>
        </div>
        <div style={styles.inputStyle}>
          <textarea
            className="textarea"
            type="text"
            id="description"
            placeholder="Description"
            onChange={(e) => (user.description = e.target.value)}
          >
            {user.description}
          </textarea>
        </div>
        <br></br>
        {renderStatusButtons(props, user, getSnapshot)}
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
  return (
    friendsList === [] ? "" :
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
                src={demoProfile.image}
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
      ))}
    </div>
  );
}

// Render overall Profile page
function Profile(props) {
  const [editMode, setEditMode] = useState(false); // Renders Editable profile if in Edit mode
  const [snapshot, setSnapshot] = useState(null); // Holds logged in user data
  const [friendsList, setFriendsList] = useState([]); // Holds Friends list data

  const getSnapshot = () => {
    let snapPromise = props.firebase.getCurrentUser();
    snapPromise.then((val) => setSnapshot(val));
  };
  useEffect(getSnapshot, []);

  const getFriendsList = () => {
    let friendsPromise = props.firebase.getCurrentUser();
    friendsPromise.then(async (val) => {
      let friends = [];
      for (const friendID in val.friends) {
        friends.push(await props.firebase.getUser(val.friends[friendID].uid));
      }
      setFriendsList(friends);
    });
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
      case "Invalid user":
        NotificationManager.warning(
          "",
          `Username ${username} is an invalid user.`
        );
        break;
      case "Already added":
        NotificationManager.warning(
          "",
          `You have already added ${username} as a friend.`
        );
        break;
      case "Success":
        getFriendsList();
        NotificationManager.success(
          "",
          `You have added ${username} as a friend.`
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
          `Username ${username} is an invalid user.`
        );
        break;
      case "Not in friend's list":
        NotificationManager.warning(
          "",
          `You do not have ${username} added as a friend.`
        );
        break;
      case "Success":
        getFriendsList();
        NotificationManager.error("", `You have unfriended ${username}.`);
        break;
      default:
        break; // No input: do nothing
    }
  }

  return snapshot !== null ? (
    <section className="section is-white">
      <NotificationContainer />
      <div className="container">
        <div className="content">
          <div className="tile is-ancestor" style={{ margin: "100px" }}>
            {renderProfile(editMode, setEditMode, snapshot, props, getSnapshot)}
            <div className="tile is-parent is-vertical" id="friends-list">
              <figure>
                <u className="title">Friends</u>
                <br></br>&nbsp;
                <div id="addPopup">
                  <div className="field has-addons">
                    {/* Input field */}
                    <div className="control is-expanded">
                      <input
                        className="input is-fullwidth"
                        type="text"
                        id="friendInput"
                        placeholder="Enter username here"
                      ></input>
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
