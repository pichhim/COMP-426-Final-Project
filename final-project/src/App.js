import React from 'react';
import 'bulma/css/bulma.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/Landing';
import ProfilePage from './components/Profile';
import MessagesPage from './components/Messages';
import DemoBoard from './components/GameBoard/DemoBoard';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';

function App() {
  return (
    // Defines route paths to specific pages
    <Router>
        <div className="App">
          <Route exact path={"/"} component={LandingPage}></Route>
          <Route exact path={"/profile"} component={ProfilePage}></Route>
          <Route exact path={"/messages"} component={MessagesPage}></Route>
          <Route exact path={"/demo"} component={DemoBoard}></Route>
          <Route exact path={"/signup"} component={SignUpPage}></Route>
          <Route exact path={"/signin"} component={SignInPage}></Route>
        </div>
    </Router>
  );
}

export default App;
