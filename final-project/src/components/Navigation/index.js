import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import SignOutButton from '../SignOut';

const Navigation = ({ authUser }) => (
  // Selectively renders Nav bar based on authUser state
  <div>{authUser ? <NavAuth /> : <NavNonAuth />}</div>
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
  }
}

// const LandingNav = ({ authUser}) => (
//   // Selectively renders Nav bar based on path 
//   <div>{authUser ? <NavAuthLanding /> : <NavNonAuthLanding />}</div>
// );

// const NavAuthLanding = () => (
//   <div>

//     <Link to={'/'}>Landing   </Link>
//     <Link to={'profile'}>Profile   </Link>
//     <Link to={'/messages'}>Messages   </Link>
//     <Link to={'/demo'}>Game Board Demo   </Link>
//     <SignOutButton />
//   </div>
// );

// const NavNonAuthLanding = () => (
//   <div>

//     <Link to={'/'}>Landing   </Link>
//     <Link to={'profile'}>Profile   </Link>
//     <Link to={'/messages'}>Messages   </Link>
//     <Link to={'/demo'}>-pee pee po poo  </Link>
//     <SignOutButton />
//   </div>
// );

const NavAuth = () => (
  // <div>

  //   <Link to={'/'}>Landing   </Link>
  //   <Link to={'profile'}>Profile   </Link>
  //   <Link to={'/messages'}>Messages   </Link>
  //   <Link to={'/demo'}>Game Board Demo   </Link>
  //   <SignOutButton />
  // </div>

  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <h1 className="title is-2">logo?</h1>
        {/* <img alt="" src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
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
        <Link to="/demo" className="navbar-item">
          <h1 className="subtitle is-4">games</h1>
        </Link>
      </div>

      <div className="navbar-end">
      <a href="/demo" className="navbar-item">
          <h1 className="subtitle is-5">welcome, blah</h1>
        </a>
        <div className="navbar-item has-dropdown is-hoverable">
          <Link to="/profile" className="navbar-link is-arrowless">
            <div style={style.profilePic}>
              <img alt="" style={imageStyle(45)} src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640" />
            </div>
          </Link>
          <div className="navbar-dropdown">
            <Link to="/profile" className="navbar-link is-arrowless">
              Profile
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

const NavNonAuth = () => (
  <div>
    <Link to={'/'}>Landing   </Link>
    <Link to={'/signup'}>Sign Up   </Link>
    <Link to={'/signin'}>Sign In   </Link>
    <Link to={'/demo'}>Game Board Demo   </Link>
  </div>
);

export default Navigation;