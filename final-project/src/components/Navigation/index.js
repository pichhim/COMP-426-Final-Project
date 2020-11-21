import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { withFirebase } from '../Firebase';
import SignOutButton from '../SignOut';
import logo from './logo.png';

const Navigation = ({ authUser }) => (
  // Selectively renders Nav bar based on authUser state
  <div>{authUser ? <NavAuth user={authUser} /> : <NavNonAuth />}</div>
);

const imageStyle = function (length) {
  return {
    width: `${length}px`,
    height: `${length}px`,
    position: "relative",
    objectFit: "cover",
    overflow: "hidden",
    borderRadius: "50%",
    border: "0px solid",
    zIndex: "2",
    maxHeight: "100%",
  };
};

const style = {
  profilePic: {
    padding: "15px",
    paddingBottom: "0px",
  },

  profLinks: {
    maxHeight: "100%",
  },

  logo: {
    padding: "8px",
  }
}

const NavAuth = withFirebase(props => {

  // All user snapshot data has been stored into the currUser variable
  const [currUser, setCurrUser] = useState(null);

  function getUserData() {
    const db = props.firebase.getDB();
    let uid = props.user.uid;

    try {
      let listener = db.ref(`/users/${uid}`).on("value", snapshot => {

        if (snapshot.val() == null) {
          return () => db.ref(`/users/${uid}`).off("value", listener);
        }

        setCurrUser(snapshot.val())
      })
      return () => db.ref(`/users/${uid}`).off("value", listener);
    } catch (error) {
      alert("Error reading user channels")
    }
  }

  useEffect(getUserData, []);

  let getProfilePicture = () => {
    return currUser.picture; 
  }
  
  return (<nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/">
        <img style={style.logo} alt="logo" src={logo} width="80" height="80" />
      </Link>
    </div>
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <Link to="/" className="navbar-item">
          <h1 className="subtitle is-4">home</h1>
        </Link>
        <Link to="/messages" className="navbar-item">
          <h1 className="subtitle is-4">messages</h1>
        </Link>
        <Link to="/profile" className="navbar-item">
          <h1 className="subtitle is-4">profile</h1>
        </Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          {currUser ? <h1 className="subtitle is-5">welcome, {currUser.fullname.toLowerCase().split(" ")[0]}!</h1> : null}
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <Link to="/profile" className="navbar-link is-arrowless">
            <div style={style.profilePic}>
              {currUser ? <img alt="" style={imageStyle(45)} src= {getProfilePicture()}/> : null}
            </div>
          </Link>
          <div className="navbar-dropdown">
            <Link to="/profile" className="navbar-link is-arrowless">
              profile
            </Link>
            <Link className="navbar-item" to="/">
              <SignOutButton />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>

  );
});

const NavNonAuth = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/">
      <img style={style.logo} alt="" src={logo} width="80" height="80" />
      </Link>
    </div>
  </nav>


);

export default Navigation;