import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { withFirebase } from '../Firebase';

// Assigns sign out functionality on Nav bar
const SignOutButton = ({ firebase }) => (
    <button className="button is-small" type="button" 
        onClick={firebase.doSignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOutButton);