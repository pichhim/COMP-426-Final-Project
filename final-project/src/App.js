import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { withFirebase } from './components/Firebase';
import { ParallaxProvider } from 'react-scroll-parallax';
import 'bulma/css/bulma.css';
import './styles.css'
import LandingPage from './components/Landing';
import ProfilePage from './components/Profile';
import MessagesPage from './components/Messages';
import Navigation from './components/Navigation';
import Background from './components/Background';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { // Initializes authUser to null (initial state)
      authUser: null,
    };
  }

  setupStatus() {
    const authUser = this.state.authUser;
    const uid = authUser.uid;
    const ref = this.props.firebase.getDB().ref(`users/${uid}/`);
    // Once online, sets user to being online
    ref.update({
      status: "Online"
    })
    // If user disconnects, the user is now offline
    ref.onDisconnect().update({
      status: "Away"
    });
  }

  // Add new listener to listen and update auth state from Firebase
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ authUser });
        this.setupStatus();

      } else {
        this.setState({ authUser: null });
      }
    });
  }

  // Removes listener on component unmount
  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      // Defines route paths to specific pages along with Nav bar
      <div className="App-Container">
        <div className="App">

          <ParallaxProvider>
            <Router>
              <Navigation authUser={this.state.authUser}></Navigation>
              <Switch>
                {/* If User is not authenticated, every route just shows the landing page */}
                <Route exact path={"/profile"}>{this.state.authUser ? <ProfilePage user={this.state.authUser} ></ProfilePage> : <LandingPage></LandingPage>}</Route>
                <Route path={"/messages"}>{this.state.authUser ? <MessagesPage user={this.state.authUser}></MessagesPage> : <LandingPage></LandingPage>}</Route>
                <Route path={"/"} component={LandingPage}></Route>
              </Switch>

            </Router>
          </ParallaxProvider>
        </div>
        <div className="App-Background"><Background></Background></div>

      </div>
    );
  }
}

export default withFirebase(App);
