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
    border: "0px solid",
  };
};

function makeEditForm() {
  console.log("edit");
}

// Render status buttons
function renderStatusButtons() {
  return (
    <div className="columns is-mobile is-multiline is-centered">
      {status_colors.map((color) => (
        <div className="column is-narrow" key={color.color}>
          <img
            onMouseEnter={e => e.currentTarget.style.border="3px solid"}
            onMouseLeave={e => e.currentTarget.style.border="0px solid"}
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
  return (
    <section className="section is-white">
      <div className="container">
        <div className="content">
          <div className="tile is-ancestor" style={{ margin: "100px" }}>
            {renderProfile()}
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
