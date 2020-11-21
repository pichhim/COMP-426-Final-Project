import React, { Component } from "react";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Section, Container, Level, Heading, Button, Card } from 'react-bulma-components';
import { Parallax } from "react-parallax";
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'
import squiggle from './boba-squiggle.png'

// fading animation
const fadeIn = keyframes`
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    `

// moving boba
const move = () => keyframes`
        0%, 100% {
            right: 0px;
            left: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            top: ${Math.floor(Math.random() * (window.innerHeight - ((window.innerHeight / 3) * 2)) + (window.innerHeight / 3) * 2)}px;
            
        }
        10% {
            right: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            left: ${Math.floor((Math.random() * window.innerWidth) + 1)}px; 
            top: ${Math.floor(Math.random() * (window.innerHeight - ((window.innerHeight / 3) * 2)) + (window.innerHeight / 3) * 2)}px; 
        }
        20% {
            right: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            left: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            top: ${Math.floor(Math.random() * (window.innerHeight - ((window.innerHeight / 3) * 2)) + (window.innerHeight / 3) * 2)}px;     
           }
        30% {
            right: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            left: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            top: ${Math.floor(Math.random() * (window.innerHeight - ((window.innerHeight / 3) * 2)) + (window.innerHeight / 3) * 2)}px;    
            }
        40% {
            right: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            left: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            top: ${Math.floor(Math.random() * (window.innerHeight - ((window.innerHeight / 3) * 2)) + (window.innerHeight / 3) * 2)}px;      
          }
        50% {
            right: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            left: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            top: ${Math.floor(Math.random() * (window.innerHeight - ((window.innerHeight / 3) * 2)) + (window.innerHeight / 3) * 2)}px;     
           }
        60% {
            right: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            left: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            top: ${Math.floor(Math.random() * (window.innerHeight - ((window.innerHeight / 3) * 2)) + (window.innerHeight / 3) * 2)}px;      
          }
        70% {
            right: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            left: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            top: ${Math.floor(Math.random() * (window.innerHeight - ((window.innerHeight / 3) * 2)) + (window.innerHeight / 3) * 2)}px;    
            }
        80% {
            right: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            left: ${Math.floor((Math.random() * window.innerWidth) + 1)}px; 
            top: ${Math.floor(Math.random() * (window.innerHeight - ((window.innerHeight / 3) * 2)) + (window.innerHeight / 3) * 2)}px;    
            }
        90% {
            right: ${Math.floor((Math.random() * window.innerWidth) + 1)}px;
            left: ${Math.floor((Math.random() * window.innerWidth) + 1)}px; 
            top: ${Math.floor(Math.random() * (window.innerHeight - ((window.innerHeight / 3) * 2)) + (window.innerHeight / 3) * 2)}px;    
            }
    `

const FadingDiv = styled.div`
        animation: 0.5s ${fadeIn} ease-out;
    `
const Boba = styled.div`
        height: 50px;
        width: 50px;
        background-color: #000;
        border-radius: 50%;
        display: inline-block;
        position: fixed;
        zIndex: -2;
        animation: ${move} 200s linear infinite;
    `

    const style = {
        landingBackground: {
            backgroundColor: '#ECCDC2',
        },

        landingSpacing: {
            padding: '140px',
            width: '100vw',
            height: '100vh'
        },

        landingTitle: {
            fontSize: '90px',
        },

        landingDisplay: {
            textAlign: 'center',
            zIndex: '2'
        },

        landingPadding: {
            padding: '15px'
        },

        signupButton: {
            marginright: '10px',
        },

        loginButton: {
            marginRight: '10px',
            paddingLeft: '25px',
            paddingRight: '25px',
        },

        buttonContainer: {
            paddingleft: '20px',
        },

        emptySpace: {
            height: `${window.innerHeight / 3}px`,
        },

        styleBlock: {
            display: 'block',
        },

        devSection: {
            padding: '50px',
        },

        aboutSection: {
            padding: '120px',
        },

        descPadding: {
            paddingTop: '30px'
        },

        iconSize: {
            fontSize: '150px',
            color: '#ECCDC2',
        },

        landingPopupCard: {
            display: 'none',
            marginRight: '10%',
            width: '400px',
            zIndex: '1',
        },

        landingPopupTitle: {
            textAlign: 'center',
        },

        submitButton: {
            marginTop: '20px',
            textAlign: 'center',
        },

        readme: {
            textAlign: 'center',
            paddingTop: `${window.innerHeight / 6}px`
        },

        xButton: {
            float: 'right',
        },

        wave: {
            backgroundImage: `url(${squiggle})`,
            backgroundSize: 'cover',
            zIndex: '3',
            height: '90px',
        },

        error: {
            width: 'fit-content',
        },

    };

// gets rid of login/submit popup
function closePopup() {
    document.getElementById("loginPopup").style.display = "none";
    document.getElementById("signupPopup").style.display = "none";
    document.getElementById("landing").style.padding = "140px";
}

   // signin config
   const INITIAL_STATE2 = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE2 };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE2 }); // Successful request: reset default state
                this.props.history.push('/'); // Redirect to landing page
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
            <FadingDiv id="loginPopup" style={style.landingPopupCard}>
                <Card>
                    <Card.Content>
                        <button className="delete" style={style.xButton} onClick={closePopup}></button>
                        <Heading style={style.landingPopupTitle}>login</Heading>
                        <form onSubmit={this.onSubmit}>
                            <label>email</label>
                            <input className="input"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                            />
                            <label>password</label>
                            <input className="input"
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                            />
                            <Level>
                                <Level.Item>
                                    <button className="button" disabled={isInvalid} type="submit" style={style.submitButton}>login</button>
                                </Level.Item>
                            </Level>
                            <Level>
                                <Level.Item style={style.error}>
                                {error && <p>{error.message}</p>}
                                </Level.Item>
                            </Level>

                        </form>
                    </Card.Content>
                </Card>
            </FadingDiv>
        );
    }
}

const SignInFormV2 = withRouter(withFirebase(SignInForm));

// signup config
const INITIAL_STATE = {
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

const COLORS = {
    one: 'FFAA7B', // orange
    two: 'C58E4C', // coffee
    three: 'ECCDC2', // pink
    four: 'AFA4CE', // purple
    five: 'C1D6EC', // blue
}

export const generateAvatar = (name) => {
    let res = name.split(" ");
    const [first, last] = [res[0], res[1]];

    let random = Math.floor(Math.random() * 10); // randomly picks a number 
    let color = "";
    console.log(random);
    switch (random) {
        case 0:
        case 1:
            color += COLORS.one;
            break;
        
        case 2:
        case 3:
            color += COLORS.two;
            break;

        case 4:
        case 5:
            color += COLORS.three;
            break;

        case 6:
        case 7:
            color += COLORS.four;
            break;

        case 8:
        case 9:
            color += COLORS.five;
            break;
    }

    let url = 'https://ui-avatars.com/api/?name=' + first + '+' + last + '&background=' + color + '&size=256&rounded=true';
    return url;
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { fullname, username, email, passwordOne, picture, description, status, friends } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Add new user to Firebase realtime database
                return this.props.firebase
                    .getUser(authUser.user.uid) // Creates user based on Firebase uid
                    .set({
                        fullname, username, email, 
                        picture : generateAvatar(fullname), 
                        description, status, friends, // Additional info about user
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
            username === '' || fullname === '';

        return (
            <FadingDiv id="signupPopup" style={style.landingPopupCard}>
                <Card>
                    <Card.Content>
                        <button className="delete" style={style.xButton} onClick={closePopup}></button>
                        <Heading style={style.landingPopupTitle}>sign up</Heading>
                        <form onSubmit={this.onSubmit}>
                            <label>full name</label>
                            <input className="input"
                                name="fullname"
                                value={fullname}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Full Name"
                            />
                            <label>username</label>
                            <input className="input"
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Username"
                            />
                            <label>email</label>
                            <input className="input"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                            />
                            <label>password</label>
                            <input className="input"
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                            />
                            <label>confirm password</label>
                            <input className="input"
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Confirm Password"
                            />
                            <Level>
                                <Level.Item>
                                    <button className="button" disabled={isInvalid} type="submit" style={style.submitButton}>submit</button>
                                    {error && <p>{error.message}</p>}
                                </Level.Item>
                            </Level>
                        </form>
                    </Card.Content>
                </Card>
            </FadingDiv>
        );
    }
}

// Set sign up form to be able to access React Router and Firebase context
const SignUpFormV2 = withRouter(withFirebase(SignUpForm));

function Landing() {

    const whiteSection = {
        backgroundColor: 'white',
        width: '100vw',
        position: 'inherit',
        height: '550px'
    };

    const imageStyle = function (length) {
        return {
            width: `${length}px`,
            height: `${length}px`,
            position: "relative",
            objectFit: "cover",
            overflow: "hidden",
            borderRadius: "50%",
            border: "0px solid",
        };
    };

    const bobaBackground =
        "https://color-hex.org/colors/eccdc2.png";



    // popup for login and signup loads when buttons are pressed
    function login() {
        if (document.getElementById("signupPopup").style.display !== "none") {
            document.getElementById("signupPopup").style.display = "none";
        }

        document.getElementById("loginPopup").style.display = "block";
        document.getElementById("landing").style.padding = "100px";
    };

    function signup() {
        if (document.getElementById("loginPopup").style.display !== "none") {
            document.getElementById("loginPopup").style.display = "none";
        }

        document.getElementById("signupPopup").style.display = "block";
        document.getElementById("landing").style.padding = "10px";
    };

    return (
        <Parallax bgImage={bobaBackground} strength={window.innerWidth}>
            <div style={style.wave}></div>
            <div id='box'></div>
            <Section id="landing" style={style.landingSpacing}>
                <Level>
                    <Level.Item>
                        <Container style={style.landingDisplay}>
                            <Heading style={style.landingTitle}>chat-tea</Heading>
                            <Heading subtitle size={4} style={style.landingPadding}>a messaging app</Heading>
                            <Level.Item style={style.buttonContainer}>
                                <Button onClick={login} style={style.loginButton}>login</Button>
                                <Button onClick={signup} style={style.signupButton}>sign up</Button>
                            </Level.Item>
                        </Container>
                        <SignUpFormV2></SignUpFormV2>
                        <SignInFormV2></SignInFormV2>
                    </Level.Item>
                </Level>
                <Container>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                    <Boba></Boba>
                </Container>
            </Section>
            <Section style={whiteSection}>
                <Level>
                    <Level.Item>
                        <Container style={style.landingDisplay}>
                            <Heading style={style.landingTitle}>about</Heading>
                            <Level style={style.aboutSection}>
                                <Level.Item style={style.styleBlock}>
                                    <span className="icon">
                                        <i style={style.iconSize} className="fa fa-comments" aria-hidden="true" />
                                    </span>
                                    <Heading style={style.descPadding}>chat</Heading>
                                </Level.Item>
                                <Level.Item style={style.styleBlock}>
                                    <span className="icon">
                                        <i style={style.iconSize} className="fa fa-users" aria-hidden="true" />
                                    </span>
                                    <Heading style={style.descPadding}>friend</Heading>
                                </Level.Item>
                                <Level.Item style={style.styleBlock}>
                                    <span className="icon">
                                        <i style={style.iconSize} className="fa fa-gamepad" aria-hidden="true" />
                                    </span>
                                    <Heading style={style.descPadding}>game</Heading>
                                </Level.Item>
                                <Level.Item style={style.styleBlock}>
                                    <span className="icon">
                                        <i style={style.iconSize} className="fa fa-repeat" aria-hidden="true" />
                                    </span>
                                    <Heading style={style.descPadding}>repeat</Heading>
                                </Level.Item>
                            </Level>
                        </Container>
                    </Level.Item>
                </Level>
            </Section>
            <Section style={style.emptySpace}></Section>
            <Section style={whiteSection}>
                <Level>
                    <Level.Item>
                        <Container style={style.landingDisplay}>
                            <Heading style={style.landingTitle}>developers</Heading>
                            <Level style={style.devSection}>
                                <Level.Item style={style.styleBlock}>
                                    <img alt="" style={imageStyle(250)} src='https://vignette.wikia.nocookie.net/naruto/images/b/bc/Rin_Nohara.png/revision/latest?cb=20150805145941' />
                                    <Heading style={style.descPadding}>pich</Heading>
                                </Level.Item>
                                <Level.Item style={style.styleBlock}>
                                    <img alt="" style={imageStyle(250)} src='https://vignette.wikia.nocookie.net/naruto/images/0/09/Naruto_newshot.png/revision/latest/scale-to-width-down/340?cb=20170621101134' />
                                    <Heading style={style.descPadding}>eden</Heading>
                                </Level.Item>
                                <Level.Item style={style.styleBlock}>
                                    <img alt="" style={imageStyle(250)} src='https://vignette.wikia.nocookie.net/naruto/images/9/97/Hinata.png/revision/latest?cb=20141010104729' />
                                    <Heading style={style.descPadding}>jessica</Heading>
                                </Level.Item>
                                <Level.Item style={style.styleBlock}>
                                    <img alt="" style={imageStyle(250)} src='https://vignette.wikia.nocookie.net/naruto/images/9/9a/Shikamaru_Nara.png/revision/latest?cb=20180701024126' />
                                    <Heading style={style.descPadding}>lucas</Heading>
                                </Level.Item>
                            </Level>
                        </Container>
                    </Level.Item>
                </Level>
            </Section>
            <Section style={style.emptySpace}>
                <div style={style.readme}><a target="_blank" rel="noopener noreferrer" href="https://github.com/pichhim/COMP-426-Final-Project#comp-426-final-project"><Button size="large">README.md</Button></a></div>
            </Section>
        </Parallax>
    )
}

export default Landing;

export { SignInFormV2, SignUpFormV2 };