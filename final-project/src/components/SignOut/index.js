import React from 'react';
import { FirebaseContext } from '../Firebase';

// Assigns sign out functionality on Nav bar
const SignOutButton = ({ firebase }) => (
    <FirebaseContext.Consumer>
        {({ firebase }) =>
            <button type="button" onClick={firebase.doSignOut}>
                Sign Out
            </button>
        }
    </FirebaseContext.Consumer>
);

export default SignOutButton;