import React from 'react';
import { withFirebase } from '../Firebase';

// Assigns sign out functionality on Nav bar
const SignOutButton = ({ firebase }) => (
    <button type="button" 
        onClick={firebase.doSignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOutButton);