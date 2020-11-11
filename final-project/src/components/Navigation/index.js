import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
//import { Button } from 'react-bulma-components'

import SignOutButton from '../SignOut';
import Landing from '../Landing';

const Navigation = ({ authUser }) => (
  // Selectively renders Nav bar based on authUser state
  <div>{authUser ? <NavAuth /> : <NavNonAuth />}</div>
);

const LandingNav = ({ authUser}) => (
  // Selectively renders Nav bar based on path 
  <div>{authUser ? <NavAuthLanding /> : <NavNonAuthLanding />}</div>
);

const NavAuthLanding = () => (
  <div>

    <Link to={'/'}>Landing   </Link>
    <Link to={'profile'}>Profile   </Link>
    <Link to={'/messages'}>Messages   </Link>
    <Link to={'/demo'}>Game Board Demo   </Link>
    <SignOutButton />
  </div>
);

const NavNonAuthLanding = () => (
  <div>

    <Link to={'/'}>Landing   </Link>
    <Link to={'profile'}>Profile   </Link>
    <Link to={'/messages'}>Messages   </Link>
    <Link to={'/demo'}>-pee pee po poo  </Link>
    <SignOutButton />
  </div>
);

const NavAuth = () => (
  // <div>

  //   <Link to={'/'}>Landing   </Link>
  //   <Link to={'profile'}>Profile   </Link>
  //   <Link to={'/messages'}>Messages   </Link>
  //   <Link to={'/demo'}>Game Board Demo   </Link>
  //   <SignOutButton />
  // </div>

  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </a>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          home
      </a>

        <a class="navbar-item">
          sign up
      </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            sign in
        </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
          </a>
            <a class="navbar-item">
              Jobs
          </a>
            <a class="navbar-item">
              Contact
          </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              Report an issue
          </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
          </a>
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

export default Navigation && LandingNav;