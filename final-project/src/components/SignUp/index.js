import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
  
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpFormV2></SignUpFormV2>
  </div>
);
 
const INITIAL_STATE = {
    // fullname: '',
    fullname: '',
    username: '',
    email: '',
    picture: '',
    description: 'Hello! Welcome to your new profile. Update your profile description here.',
    status: 'Online',
    friends: [],
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { fullname, username, email, passwordOne, picture, description, status, friends} = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Add new user to Firebase realtime database
        return this.props.firebase
        .getUser(authUser.user.uid) // Creates user based on Firebase uid
        .set({
          fullname, username, email, picture: this.generateAvatar(fullname), description, status, friends, // Additional info about user
        });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE }); // Successful request: reset default state
        this.props.history.push("/"); // Redirect to landing page by accessing React Router props
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault(); // No reload on submit
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  generateAvatar = async (name) => {
    const [first, last] = [name.split(" ")[0], name.split(" ")[1]];
    let url = 'https://ui-avatars.com/api/?name=' + first + '+' + last;
    
    return url;
  }
 
  render() {
    const {
        fullname,
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '' || 
    fullname === '';
   
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="fullname"
          value={fullname}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Username"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">Submit</button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={"/signup"}>Sign Up</Link>
  </p>
);

// Set sign up form to be able to access React Router and Firebase context
const SignUpFormV2 = withRouter(withFirebase(SignUpForm));
 
export default SignUpPage;
 
export { SignUpFormV2, SignUpLink };