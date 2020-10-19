import React, { useEffect, useState } from "react";
import test_data from "./test_data";
import status_colors from "./status_colors";
import ReactTooltip from 'react-tooltip';
import { withFirebase } from '../Firebase';

const demoProfile = {
  image: "https://vignette.wikia.nocookie.net/naruto/images/b/bc/Rin_Nohara.png/revision/latest?cb=20150805145941",
  name: "Pich Him",
  username: "mcpich",
  description: "My name is Pich Him and I love to play games. My favorite dog is a Shiba Inu.",
}

const styles = {
  inputStyle: {
    margin: "20px",
  },
  loadStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
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
    const color = status_colors.filter(color => color.status == userStatus)[0].hex;
    return {
      color: `#${color}`,
    };
  }
}

// Render status buttons
function renderStatusButtons(props) {
  function updateStatus(e) { // Updates status by writing to Firebase DB
    props.firebase.writeUserData("status", e.currentTarget.alt);
  }
  return (
    <div className="columns is-mobile is-multiline is-centered">
      {status_colors.map((color) => (
        <div className="column is-narrow" key={color.color}>
          <img
            data-tip={color.status}
            data-place="top"
            onMouseEnter={e => e.currentTarget.style.border = "3px solid"}
            onMouseLeave={e => e.currentTarget.style.border = "0px solid"}
            onClick={e => updateStatus(e)}
            style={styles.imageStyle(55)}
            src={color.link}
            alt={color.status}
          ></img>
          <ReactTooltip></ReactTooltip>
        </div>
      ))}
    </div>)
}

// Render profile card
function renderProfile(editMode, setEditMode, user, props) {
  return (
    editMode ? renderProfileEdit(setEditMode, user, props) :
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
              <strong>{user.fullname}</strong><br></br><em>{user.username}</em>
              <div>
                <p style={styles.statusStyle(user.status)}>{user.status}</p>
              </div>
            </div>
            <br></br>
            <p> {user.description}
            </p>
            <br></br>
            {renderStatusButtons(props)}
            <br></br>
            <div className="has-text-centered">
              <button className="button is-dark is-centered" onClick={() => setEditMode(true)}>Edit</button>
            </div>
          </div>
        </div>
      </div>)
}

// Edit mode for user profile
function renderProfileEdit(setEditMode, user, props) {
  function updateProfile() {
    props.firebase.writeUserData("fullname", user.fullname);
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
            <input
              type="file"
            />
          </form>
        </div>
        <div className="has-text-centered" style={styles.inputStyle}>
          <input className="input" type="text" id="fullname" placeholder={user.fullname} onChange={e => user.fullname = e.target.value}></input>
          <input className="input" type="text" id="username" placeholder={user.username} onChange={e => user.username = e.target.value}></input>
        </div>
        <div style={styles.inputStyle}>
          <textarea className="textarea" type="text" id="description" placeholder={user.description} onChange={e => user.description = e.target.value}></textarea>
        </div>
        <br></br>
        {renderStatusButtons()}
        <br></br>
        <div className="has-text-centered">
          <button className="button is-dark is-centered" onClick={() => updateProfile()}>Save</button>
        </div>
      </div>
    </div>)
}

// Render friends list
function renderFriendsList() {
  return (<div className="tile is-child">
    {test_data.map((obj) => (
      <article className="media" key={obj.user} onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 5px #888888"}
        onMouseLeave={e => e.currentTarget.style.boxShadow = ""}>
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
            <p>
              <strong>{obj.name}</strong>
              <br></br>
              <em>{obj.user}</em>
            </p>
          </div>
        </div>
      </article>
    ))}
  </div>)
}

// Render overall Profile page
function Profile(props) {
  const [editMode, setEditMode] = useState(false); // Renders Editable profile if in Edit mode
  const [snapshot, setSnapshot] = useState(null); // Holds logged in user data

  const getSnapshot = () => {
    props.firebase.getUserSnapshot(setSnapshot);
  }
  useEffect(getSnapshot, []);

  return snapshot !== null ? (
    <section className="section is-white">
      <div className="container">
        <div className="content">
          <div className="tile is-ancestor" style={{ margin: "100px" }}>
            {renderProfile(editMode, setEditMode, snapshot, props)}
            <div className="tile is-parent is-vertical" id="friends-list">
              <figure>
                <p className="title"><u>Friends</u></p>
              </figure>
              <div className="tile">
                {renderFriendsList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : <p></p>
}

export default withFirebase(Profile);
