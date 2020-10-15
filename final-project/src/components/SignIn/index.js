import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import { SignUpLink } from '../SignUp';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignInForm firebase={firebase} />}
    </FirebaseContext.Consumer>
    <SignUpLink></SignUpLink>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE }); // Successful request: reset default state
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault(); // No reload on submit
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      email,
      password,
      error, 
    } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default SignInPage;

export { SignInForm };