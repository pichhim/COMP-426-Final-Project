import React, { useEffect, useState } from "react";
import test_data from "./test_data";
import status_colors from "./status_colors";
import ReactTooltip from "react-tooltip";
import { withFirebase } from "../Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const demoProfile = {
  image:
    "https://vignette.wikia.nocookie.net/naruto/images/b/bc/Rin_Nohara.png/revision/latest?cb=20150805145941",
  name: "Pich Him",
  username: "mcpich",
  description:
    "My name is Pich Him and I love to play games. My favorite dog is a Shiba Inu.",
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
function renderStatusButtons(props, user, setSnapshot) {
  function updateStatus(e) {
    // Updates status by writing to Firebase DB
    setSnapshot({ ...user, status: e.currentTarget.alt }); // Updates React state
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
function renderProfile(editMode, setEditMode, user, props, setSnapshot) {
  return editMode ? (
    renderProfileEdit(setEditMode, user, props, setSnapshot)
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
          {renderStatusButtons(props, user, setSnapshot)}
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
function renderProfileEdit(setEditMode, user, props, setSnapshot) {
  function updateProfile() {
    setSnapshot({
      ...user,
      fullname: user.fullname,
      username: user.username,
      description: user.description,
    });
    props.firebase.writeUserData("username", user.username);
    props.firebase.writeUserData("description", user.description);
    // props.firebase.writeUserData("picture", user.picture);
    setEditMode(false);
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
        {renderStatusButtons(props, user, setSnapshot)}
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
function renderFriendsList() {
  return (
    <div className="tile is-child">
      {test_data.map((obj) => (
        <article
          className="media"
          key={obj.user}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 5px #888888")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
        >
          <div className="media-left">
            <figure className="image">
              <img
                style={styles.imageStyle(100)}
                src={obj.img}
                alt={obj.name + " profile"}
              ></img>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <div>
                <strong>{obj.name}</strong>
                <br></br>
                <em>{obj.user}</em>
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

  const getSnapshot = () => {
    let snapPromise = props.firebase.getCurrentUser();
    snapPromise.then((val) => setSnapshot(val));
  };

  useEffect(getSnapshot, []);

  // Takes in input and Adds or Removes friend (based on click)
  function addFriend() {
    let username = document.getElementById("friendInput").value;
    console.log(username);
    if (username !== "") {
      props.firebase.pushUserData("friends", username);
    }
  }
  function removeFriend() {
    let username = document.getElementById("friendInput").value;
    if (username !== "") {
      props.firebase.unfriend(username);
    }
  }

  return snapshot !== null ? (
    <section className="section is-white">
      <div className="container">
        <div className="content">
          <div className="tile is-ancestor" style={{ margin: "100px" }}>
            {renderProfile(editMode, setEditMode, snapshot, props, setSnapshot)}
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
                        onClick={addFriend}
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
                        onClick={removeFriend}
                      >
                        <span className="icon is-small">
                          <FontAwesomeIcon icon={faMinus} />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </figure>
              <div className="tile">{renderFriendsList()}</div>
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
