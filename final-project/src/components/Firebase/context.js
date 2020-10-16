import React from 'react';
 
const FirebaseContext = React.createContext(null);
 
// Component to be able to use Firebase context more cleanly
// allows passing in of props
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );

export default FirebaseContext;