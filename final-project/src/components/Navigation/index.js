import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';

const Navigation = ({ authUser }) => (
  // Selectively renders Nav bar based on authUser state
  <div>{authUser ? <NavAuth /> : <NavNonAuth />}</div>
);

const NavAuth = () => (
  <div>
    <Link to={'/'}>Landing   </Link>
    <Link to={'profile'}>Profile   </Link>
    <Link to={'/messages'}>Messages   </Link>
    <Link to={'/demo'}>Game Board Demo   </Link>
    <SignOutButton />
  </div>
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