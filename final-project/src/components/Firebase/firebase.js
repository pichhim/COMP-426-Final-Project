import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyB8w5qHB57f3I5QRRqk88wzwILiPJ9Ebo8",
    authDomain: "comp-426-final-project-ee08c.firebaseapp.com",
    databaseURL: "https://comp-426-final-project-ee08c.firebaseio.com",
    projectId: "comp-426-final-project-ee08c",
    storageBucket: "comp-426-final-project-ee08c.appspot.com",
    messagingSenderId: "647077833347",
    appId: "1:647077833347:web:baba2b3b92ba4d59bf49b6",
    measurementId: "G-2G2VJREPKT"
};

class Firebase {
    constructor() {
        app.initializeApp(config); // Initialize Firebase
        this.auth = app.auth(); // Instantiate Firebase auth package
        this.db = app.database(); // Initialize Firebase Realtime Database
        this.userData = null;
    }

    // Auth API for Firebase
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) =>
        this.auth.currentUser.updatePassword(password);

    // User API for Firebase - gets user by uid or gets all users
    getCurrentUser = function () {
        // let uid;
        // if (this.auth.currentUser !== null) {
        //     uid = this.auth.currentUser.uid;
        //     var userRef = this.db.ref('/users/' + uid);
        //     userRef.on('value', function (snapshot) {
        //         console.log("SNAPSHOT:");
        //         console.log(snapshot.val());
        //         return JSON.stringify(snapshot.val());
        //     });
        // } else {
        //     console.log("Bad");
        //     return "ERROR";
        // }

        let user = this.auth.currentUser;
        let uid;
        if (user !== null) {
            uid = user.uid;
        }
        const fullname = this.db.ref('/users/' + uid).once('value').then(function(snapshot) {
            return (snapshot.val() && snapshot.val().fullname) || 'Anonymous';
        });
        const username = this.db.ref('/users/' + uid).once('value').then(function(snapshot) {
            return (snapshot.val() && snapshot.val().username) || 'Anonymous';
        });
        return {
            fullname: fullname,
            username: username,
        }
    }

    getUser = uid => this.db.ref(`users/${uid}`);

    getUsers = () => this.db.ref('users');
}

export default Firebase; 