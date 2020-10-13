import React from 'react';
import "bulma/css/bulma.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/Landing';
import ProfilePage from './components/Profile';
import MessagesPage from './components/Messages';
import GameBoard from './components/GameBoard'

function App() {
  return (
    // Defines route paths to specific pages
    <Router>
        <div className="App">
          <Route exact path={"/"} component={LandingPage}></Route>
          <Route exact path={"/profile"} component={ProfilePage}></Route>
          <Route exact path={"/messages"} component={MessagesPage}></Route>
          <Route exact path={"/game"} component={GameBoard}></Route>
        </div>
    </Router>
  );
}

export default App;
