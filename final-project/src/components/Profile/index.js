import React, { useEffect, useState } from "react";
import status_colors from "./status_colors";
import ReactTooltip from "react-tooltip";
import { withFirebase } from "../Firebase";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import FriendCard from "./friendcard";
import { generateAvatar } from "../Landing/index.js";

const styles = {
  textareaStyle: {
    height: "10px",
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
      (color) => color.status.toLowerCase() === userStatus.toLowerCase()
    )[0].hex;
    return {
      color: `#${color}`,
    };
  },
  title: {
    margin: "0px",
  },
  profileButton: {
    position: 'absolute',
    bottom: '1rem',
    textAlign: 'center'
  }
};

// Render status buttons
function renderStatusButtons(props, user) {
  function updateStatus(e) {
    // Updates status by writing to Firebase DB
    props.firebase.writeUserData("status", e.currentTarget.alt);
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
  return editMode ? (
    renderProfileEdit(setEditMode, user, props)
  ) : (
    <div
      className="card"
      id="profile-card"
      style={{ height: "calc(100vh - 200px)" }}
    >
      <div
        className="card-image  has-text-centered"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <figure className="image is-inline-block" style={{ marginTop: "1rem" }}>
          <img
            style={styles.imageStyle(175)}
            src={`${user.picture}`}
            alt={`Profile: ${user.fullname}`}
          ></img>
        </figure>
      </div>
      <div className="card-content">
        <div className="has-text-centered">
          <strong>{user.fullname}</strong>
          <br></br>
          <em>{user.username.toLowerCase()}</em>
          <div>
            <p style={styles.statusStyle(user.status)}>{user.status}</p>
          </div>
        </div>
        <br></br>
        <p
          className="has-text-centered"
          style={{ overflow: "auto", maxHeight: "12vh" }}
        >
          {" "}
          {user.description}
        </p>
        <br></br>
        {renderStatusButtons(props, user)}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="button is-dark is-centered"
            onClick={() => setEditMode(true)}
            style={styles.profileButton}
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
    props.firebase.writeUserData("fullname", edited.fullname);
    props.firebase.writeUserData("username", edited.username);
    props.firebase.writeUserData("description", edited.description);
    if (edited.fullname !== user.fullname) {
      props.firebase.writeUserData("picture", generateAvatar(user.fullname));
    }
    setEditMode(false);
  }
  let edited = {
    fullname: user.fullname,
    username: user.username,
    description: user.description,
  };

  return (
    <div
      className="card"
      id="profile-card"
      style={{ height: "calc(100vh - 200px)" }}
    >
      <div
        className="card-image  has-text-centered"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <figure className="image is-inline-block" style={{ marginTop: "1rem" }}>
          <img
            style={styles.imageStyle(175)}
            src={`${user.picture}`}
            alt={`Profile: ${user.fullname}`}
          ></img>
        </figure>
      </div>
      <div className="card-content">
        <div className="has-text-centered" style={styles.inputStyle}>
          <input
            className="input"
            type="text"
            id="fullname"
            placeholder="Full name"
            onChange={(e) => (edited.fullname = e.target.value)}
            defaultValue={user.fullname}
          />
          <input
            className="input"
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => (edited.username = e.target.value)}
            defaultValue={user.username}
          />
        </div>
        <div style={styles.inputStyle}>
          <textarea
            className="has-fixed-size textarea"
            type="text"
            style={{ height: "calc(100vh - 610px)" }}
            id="description"
            placeholder="Description"
            onChange={(e) => (edited.description = e.target.value)}
            defaultValue={user.description}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="button is-dark is-centered"
            onClick={() => updateProfile()}
            style={styles.profileButton}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
}

// Render overall Profile page
function Profile(props) {
  const [editMode, setEditMode] = useState(false); // Renders Editable profile if in Edit mode
  const [snapshot, setSnapshot] = useState(null); // Holds logged in user data
  const [friendsList, setFriendsList] = useState([]); // Holds Friends list data

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
        for (let snap in snapshot.val()) {
          if (friends && snap in friends) {
            friendInfo.push({
              ...snapshot.val()[snap],
              key: snap,
            });
          }
        }

        setFriendsList(friendInfo);
      });
      return () => db.ref(`/users`).off("value", listener);
    } catch (error) {
      alert("error reading friend info");
    }
  };

  useEffect(getFriendsList, []);

  return snapshot !== null ? (
    <section>
      <NotificationContainer />
      <div className="container">
        <div
          className="columns is-vcentered is-centered"
          style={{ height: "calc(100vh - 90px)" }}
        >
          <div className="column is-5 is-narrow">
            {renderProfile(editMode, setEditMode, snapshot, props)}
          </div>
          <div className="column is-5 is-narrow">
            <div
              className="card has-text-centered"
              id="friends-list"
              style={{ height: "calc(100vh - 200px)" }}
            >
              <div className="card-content">
                {/* Autocomplete is in here */}
                <FriendCard friendsList={friendsList} />
              </div>
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
