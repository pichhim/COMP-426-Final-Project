import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/Landing';
import TicTacToe from './components/TicTacToe';
import ConnectFour from './components/ConnectFour';
import Othello from './components/Othello';

function App() {
  return (
    // Defines route paths to specific pages
    <Router>
        <div className="App">
          <Route exact path={"/"} component={LandingPage}></Route>
          <Route exact path={"/tictactoe"} component={TicTacToe}></Route>
          <Route exact path={"/connectfour"} component={ConnectFour}></Route>
          <Route exact path={"/othello"} component={Othello}></Route>
          <Route exact path={"/profile"} component={TicTacToe}></Route>
          <Route exact path={"/messages"} component={TicTacToe}></Route>
        </div>
    </Router>
  );
}

export default App;
