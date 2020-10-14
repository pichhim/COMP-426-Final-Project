import React, { useState } from "react";
import test_data from "./test_data";
import status_colors from "./status_colors";

const imageStyle = function (length) {
  return {
    width: `${length}px`,
    height: `${length}px`,
    position: "relative",
    objectFit: "cover",
    overflow: "hidden",
    borderRadius: "50%",
  };
};

function makeEditForm() {
  console.log("edit");
}

function renderSwitch(key) {
  switch(key) {
    case "sky":
      return skyHover;
    case "green":
      return greenHover;
    case "coral":
      return coralHover;
    case "yellow":
      return yellowHover;
    default:
      return "ERROR";
  }
}

// Render status buttons
function renderStatusButtons(...args) {
  return (
    <div className="columns is-mobile is-multiline is-centered">
      {status_colors.map((color) => (
        <div className="column is-narrow" key={color.color}>
          {/* renderswitchkey */}
          <img
            style={imageStyle(55)}
            src={color.link}
            alt={color.color + " status"}
          ></img>
        </div>
      ))}

    </div>)
}

// Render profile card
function renderProfile() {
  return (
    <div className="tile" id="profile-card">
      <div className="card">
        <div className="card-image">
          <figure className="image" style={{ margin: "10px" }}>
            <img
              style={imageStyle(200)}
              src={
                "https://vignette.wikia.nocookie.net/naruto/images/b/bc/Rin_Nohara.png/revision/latest?cb=20150805145941"
              }
              alt={"Pich profile pic"}
            ></img>
          </figure>
        </div>
        <div className="card-content">
          <p className="has-text-centered">
            <strong>Pich Him</strong>
            <br></br>
            <em>mcpich</em>
          </p>
          <br></br>
          <p>
            My name is Pich Him and I love to play games. My favorite
            dog is a Shiba Inu.
          </p>
          <br></br>
          {renderStatusButtons()}
          <br></br>
          <div className="has-text-centered">
            <button className="button is-dark is-centered" onClick={makeEditForm}>Edit</button>
          </div>
        </div>
      </div>
    </div>)
}

// Render friends list
function renderFriendsList() {
  return (<div className="tile is-child">
    {test_data.map((obj) => (
      <article className="media" key={obj.user}>
        <div className="media-left">
          <figure className="image">
            <img
              style={imageStyle(100)}
              src={obj.img}
              alt={obj.name + " profile pic"}
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
  const [skyHover, setSkyHover] = useState(false); // Idle
  const [greenHover, setGreenHover] = useState(false); // Online
  const [coralHover, setCoralHover] = useState(false); // Busy
  const [yellowHover, setYellowHover] = useState(false); // Away
  const [status, setStatus] = useState("Online"); // User status

  return (
    <section className="section is-white">
      <div className="container">
        <div className="content">
          <div className="tile is-ancestor" style={{ margin: "100px" }}>
            {renderProfile(skyHover, greenHover, coralHover, yellowHover, status)}
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
  );
}

export default Profile;
