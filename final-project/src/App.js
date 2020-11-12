import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase } from './components/Firebase';
import { ParallaxProvider } from 'react-scroll-parallax';
import 'bulma/css/bulma.css';
import LandingPage from './components/Landing';
import ProfilePage from './components/Profile';
import MessagesPage from './components/Messages';
import DemoBoard from './components/GameBoard/DemoBoard';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import Navigation from './components/Navigation';
import LandingNav from './components/Navigation';
import Landing from './components/Landing';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { // Initializes authUser to null (initial state)
      authUser: null,
    };
  }

  // Add new listener to listen and update auth state from Firebase
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  // Removes listener on component unmount
  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      // Defines route paths to specific pages along with Nav bar
      <ParallaxProvider>
        <Router>
          {this.state.authUser ? <Navigation authUser={this.state.authUser}></Navigation> : null}
          {/* <Route exact path={"/"} component={LandingNav} authUser={this.state.authUser}></Route> */}
          {/* <Route exact path={"/profile", "/messages", "/demo"} component={Navigation} authUser={this.state.authUser}></Route> */}
          <div className="App">
            <Route exact path={"/"} component={LandingPage}></Route>
            <Route exact path={"/profile"}>{this.state.authUser ? <ProfilePage></ProfilePage> : null}</Route>
            <Route exact path={"/messages"}>{this.state.authUser ? <MessagesPage user={this.state.authUser}></MessagesPage> : null}</Route>
            <Route exact path={"/demo"} component={DemoBoard}></Route>
            <Route exact path={"/signup"} component={SignUpPage}></Route>
            <Route exact path={"/signin"} component={SignInPage}></Route>
          </div>
        </Router>
      </ParallaxProvider>
    );
  }
}

export default withFirebase(App);
