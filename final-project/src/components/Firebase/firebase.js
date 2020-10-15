import app from 'firebase/app';

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
        app.initializeApp(config);
    }
}

export default Firebase;