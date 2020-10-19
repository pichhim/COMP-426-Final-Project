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

const inputStyle = {
  margin: "20px",
}

const imageStyle = function (length) {
  return {
    width: `${length}px`,
    height: `${length}px`,
    position: "relative",
    objectFit: "cover",
    overflow: "hidden",
    borderRadius: "50%",
    border: "0px solid",
  };
};

// Render status buttons
function renderStatusButtons() {
  return (
    <div className="columns is-mobile is-multiline is-centered">
      {status_colors.map((color) => (
        <div className="column is-narrow" key={color.color}>
          <img
            data-tip={color.status}
            data-place="top"
            onMouseEnter={e => e.currentTarget.style.border = "3px solid"}
            onMouseLeave={e => e.currentTarget.style.border = "0px solid"}
            style={imageStyle(55)}
            src={color.link}
            alt={color.status}
          ></img>
          <ReactTooltip></ReactTooltip>
        </div>
      ))}

    </div>)
}

// Render profile card
function renderProfile(editMode, setEditMode) {
  return (
    editMode ? renderProfileEdit(setEditMode) :
      <div className="tile" id="profile-card">
        <div className="card" style={{ minWidth: "100%" }}>
          <div className="card-image">
            <figure className="image" style={{ margin: "10px" }}>
              <img
                style={imageStyle(200)}
                src={demoProfile.image}
                alt={`Profile: ${demoProfile.name}`}
              ></img>
            </figure>
          </div>
          <div className="card-content">
            <p className="has-text-centered">
              <strong>{demoProfile.name}</strong><br></br><em>{demoProfile.username}</em>
            </p>
            <br></br>
            <p> {demoProfile.description}
            </p>
            <br></br>
            {renderStatusButtons()}
            <br></br>
            <div className="has-text-centered">
              <button className="button is-dark is-centered" onClick={() => setEditMode(true)}>Edit</button>
            </div>
          </div>
        </div>
      </div>)
}

// Edit mode for user profile
function renderProfileEdit(setEditMode) {
  return (
    <div className="tile" id="profile-card">
      <div className="card" style={{ minWidth: "100%" }}>
        <div className="card-image">
          <figure className="image" style={{ margin: "10px" }}>
            <img
              style={imageStyle(200)}
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
        <div className="has-text-centered" style={inputStyle}>
          <input className="input" type="text" placeholder={demoProfile.name}></input>
          <input className="input" type="text" placeholder={demoProfile.username}></input>
        </div>
        <div style={inputStyle}>
          <textarea className="textarea" type="text" placeholder={demoProfile.description}></textarea>
        </div>
        <br></br>
        {renderStatusButtons()}
        <br></br>
        <div className="has-text-centered">
          <button className="button is-dark is-centered" onClick={() => setEditMode(false)}>Save</button>
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
              style={imageStyle(100)}
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
  const [snapshot, setSnapshot] = useState(null)

  let promise = props.firebase.getCurrentUser()
  promise.then(val => setSnapshot(val))

  return (
    <section className="section is-white">
      <div className="container">
        <div className="content">
          <div className="tile is-ancestor" style={{ margin: "100px" }}>
            {renderProfile(editMode, setEditMode)}
            <div className="tile is-parent is-vertical" id="friends-list">
              <figure>
                <p className="title"><u>{snapshot ? snapshot.fullname : 'Friends'}</u></p>
              </figure>
              <div className="tile">
                {renderFriendsList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withFirebase(Profile);
