import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyB8w5qHB57f3I5QRRqk88wzwILiPJ9Ebo8",
  authDomain: "comp-426-final-project-ee08c.firebaseapp.com",
  databaseURL: "https://comp-426-final-project-ee08c.firebaseio.com",
  projectId: "comp-426-final-project-ee08c",
  storageBucket: "comp-426-final-project-ee08c.appspot.com",
  messagingSenderId: "647077833347",
  appId: "1:647077833347:web:baba2b3b92ba4d59bf49b6",
  measurementId: "G-2G2VJREPKT",
};

class Firebase {
  constructor() {
    app.initializeApp(config); // Initialize Firebase
    this.auth = app.auth(); // Instantiate Firebase auth package
    this.db = app.database(); // Initialize Firebase Realtime Database
    this.storage = app.storage(); // Reference to Firebase Storage
  }

  // Auth API for Firebase
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  /*doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) =>
        this.auth.currentUser.updatePassword(password);*/

  // User API for Firebase - gets user by uid or gets all users
  getUser = (uid) => this.db.ref(`users/${uid}`);
  getUsers = () => this.db.ref("users");

  // Realtime Database API for Firebase
  getCurrentUser = function () {
    let user = this.auth.currentUser;
    let uid;
    if (user !== null) {
      uid = user.uid;
    }
    const snapshot = this.db
      .ref("/users/" + uid)
      .once("value")
      .then(function (snapshot) {
        return snapshot.val() || "Anonymous";
      });
    return snapshot;
  };

  // Gets user object by uid
  getUserObject = function (uid) {
    const snapshot = this.db
      .ref("/users/" + uid)
      .once("value")
      .then(function (snapshot) {
        return snapshot.val() || "Anonymous";
      });
    return snapshot;
  };

  // This function takes a setter from a component and calls getCurrentUser repeatedly until a valid value is given
  // Then it sets that value using the setter.
  // getUserSnapshot = function (setter) {
  //     if (setter) {
  //         let counter = 100;
  //         let interval = setInterval(() => {
  //             let promise = this.getCurrentUser();
  //             promise.then(val => {
  //             if (val !== 'Anonymous') {
  //                 clearInterval(interval);
  //                 setter(val)
  //             } else if (counter < 0) {
  //                 clearInterval(interval)
  //                 alert('ERROR: Interval timed out. Please try again later')
  //             } else {
  //                 counter--;
  //             }
  //             })
  //         }, 200)
  //     }
  // }

  // Write data
  writeUserData = function (path, value) {
    let updates = {};
    updates[`users/${this.auth.currentUser.uid}/${path}`] = value;
    return this.db.ref().update(updates);
  };

  // Pushes data to list (to add friends)
  pushUserData = async function (path, value) {
    // Query for UID in 'users/' given username
    let friendUID = "";
    await this.db
      .ref("users")
      .orderByChild("username")
      .equalTo(value)
      .once("value")
      .then(function (snapshot) {
        if (snapshot.val() !== null) {
          friendUID = Object.keys(snapshot.val())[0];
        }
      });
    if (friendUID === "") {
      return "Invalid user";
    }
    // Query friends list -> If friend doesn't already exist in list, add UID to friends list
    let exists = false;
    await this.db
      .ref(`users/${this.auth.currentUser.uid}/friends`)
      .orderByChild("uid")
      .equalTo(friendUID)
      .once("value")
      .then(function (snapshot) {
        if (snapshot.val() !== null) {
          exists = true;
        }
      });
    if (exists) {
      return "Already added";
    }
    this.db
      .ref(`users/${this.auth.currentUser.uid}/${path}`)
      .push({ uid: friendUID });
    return "Success";
  };

  // Removes user data (to remove friends)
  unfriend = async function (username) {
    // Query for UID in 'users/' given username
    let friendUID = "";
    await this.db
      .ref("users")
      .orderByChild("username")
      .equalTo(username)
      .once("value")
      .then(function (snapshot) {
        if (snapshot.val() !== null) {
          friendUID = Object.keys(snapshot.val())[0];
        }
      });
    if (friendUID === "") {
      return "Invalid user";
    }
    // Given friend UID, Query to retrieve friend list ID in user's friends list
    let friendListID = "";
    await this.db
      .ref(`users/${this.auth.currentUser.uid}/friends`)
      .orderByChild("uid")
      .equalTo(friendUID)
      .once("value")
      .then(function (snapshot) {
        if (snapshot.val() !== null) {
          friendListID = Object.keys(snapshot.val())[0];
        }
      });
    // If friend exists in friend's list, remove friend
    if (friendListID !== "") {
      this.db
        .ref(`users/${this.auth.currentUser.uid}/friends/${friendListID}`)
        .remove();
      return "Success";
    } else {
      return "Not in friend's list";
    }
  };

  getAuth = (_) => {
    return this.auth;
  };

  getDB = (_) => {
    return this.db;
  };
}

export default Firebase;
