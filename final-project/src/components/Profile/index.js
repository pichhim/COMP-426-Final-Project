import React from "react";
import test_data from "./test_data";
import status_colors from "./status_colors";

const ancestorTileStyle = {
  margin: "100px",
};

const columnStyle = {
  height: "70px",
  width: "70px",
};

function Profile() {
  return (
    <section className="section is-white">
      <div className="container">
        <div className="content">
          <div className="tile is-ancestor" style={ancestorTileStyle}>
            <div className="tile" id="profile-card">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      className="is-rounded"
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
                  <div className="columns is-mobile is-multiline is-centered">
                    {status_colors.map((color) => (
                      <div
                        className="column is-narrow"
                        style={columnStyle}
                        key={color.hex}
                      >
                          <img
                            style={{borderRadius:"50%"}}
                            className="is-rounded"
                            src={color.link}
                            alt={color.color + " status"}
                          ></img>
                      </div>
                    ))}
                  </div>
                  <br></br>
                  <div className="has-text-centered">
                    <button className="button is-dark is-centered">Edit</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="tile is-parent is-vertical" id="friends-list">
              <p className="title">Friends</p>
              <div className="tile">
                <div className="tile is-child">
                  {test_data.map((obj) => (
                    <article className="media" key={obj.user}>
                      <div className="media-left">
                        <figure className="image is-128x128">
                          <img
                            className="is-rounded"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
