import React from "react";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Section, Container, Level, Heading, Button, Figure, Image, Card, Content } from 'react-bulma-components';
import { Parallax } from "react-parallax";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSpring, animated } from 'react-spring'
import styled, { keyframes } from 'styled-components'

import 'font-awesome/css/font-awesome.min.css';

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

    // fading animation
    const fadeIn = keyframes`
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    `
    const FadingDiv = styled.div`
        animation: 0.5s ${fadeIn} ease-out;
    `
    const fadeOut = keyframes`
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    `
    const FadingOut = styled.div`
        animation: 0.5s ${fadeOut} ease-out;
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
            padding: '270px',
            width: '100vw',
            height: '100vh'
        },

        landingTitle: {
            fontSize: '90px',
        },

        landingDisplay: {
            textAlign: 'center'
        },

        landingPadding: {
            padding: '15px'
        },

        signupButton: {
            marginright: '10px',
        },

        loginButton: {
            marginRight: '10px',
            paddingright: '25px',
            paddingRight: '25px',
        },

        buttonContainer: {
            paddingleft: '20px',
        },

        emptySpace: {
            height: '300git px',
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
            paddingleft: '25px',
        },

        iconSize: {
            fontSize: '150px',
        },

        landingPopupCard: {
            display: 'none',
            marginright: '30px',
            width: '400px',
        },

        landingPopupTitle: {
            textAlign: 'center',
        },

        submitButton: {
            marginleft: '20px',
            textAlign: 'center',
        },

    };

    // popup for login and signup loads when buttons are pressed
    function login() {
        document.getElementById("loginPopup").style.display = "block";
    };

    function signup() {
        document.getElementById("signupPopup").style.display = "block";
    };

    // popup disappears and submits login/sign up info
    function submitLogin() {
        document.getElementById("loginPopup").style.display = "none";
    }

    function submitSignup() {
        document.getElementById("signupPopup").style.display = "none";
    }

    return (
        <Parallax bgImage={bobaBackground} strength={window.innerWidth}>
            <div id='box'></div>
            <Section style={style.landingSpacing}>
                <Level>
                    <Level.Item>
                        <Container style={style.landingDisplay}>
                            <Heading style={style.landingTitle}>a nice name</Heading>
                            <Heading subtitle size={4} style={style.landingPadding}>a messaging app</Heading>
                            <Level.Item style={style.buttonContainer}>
                                <Button onClick={login} style={style.loginButton}>login</Button>
                                <Button onClick={signup} style={style.signupButton}>sign up</Button>
                            </Level.Item>
                        </Container>
                        <FadingDiv id="loginPopup" style={style.landingPopupCard}>
                            <Card>
                                <Card.Content>
                                    <Heading style={style.landingPopupTitle}>login</Heading>
                                    <form>
                                        <label>username</label>
                                        <input className="input"
                                            type="text"
                                            id="username" />
                                        <label>password</label>
                                        <input className="input"
                                            type="password"
                                            id="password" />
                                        <Level>
                                            <Level.Item>
                                                <Button onClick={submitLogin} style={style.submitButton}>submit</Button>
                                            </Level.Item>
                                        </Level>
                                    </form>
                                </Card.Content>
                            </Card>
                        </FadingDiv>
                        <FadingDiv id="signupPopup" style={style.landingPopupCard}>
                            <Card>
                                <Card.Content>
                                    <Heading style={style.landingPopupTitle}>sign up</Heading>
                                    <form>
                                        <label>username</label>
                                        <input className="input"
                                            type="text"
                                            id="username" />
                                        <label>email</label>
                                        <input className="input"
                                            type="text"
                                            id="email" />
                                        <label>password</label>
                                        <input className="input"
                                            type="password"
                                            id="password" />
                                        <label>confirm password</label>
                                        <input className="input"
                                            type="password"
                                            id="password" />
                                    </form>
                                    <Level>
                                        <Level.Item>
                                            <Button onClick={submitSignup} style={style.submitButton}>submit</Button>
                                        </Level.Item>
                                    </Level>
                                </Card.Content>
                            </Card>
                        </FadingDiv>
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
            <Section style={style.emptySpace}>
            </Section>
            <Section style={whiteSection}>
                <Level>
                    <Level.Item>
                        <Container style={style.landingDisplay}>
                            <Heading style={style.landingTitle}>developers</Heading>
                            <Level style={style.devSection}>
                                <Level.Item style={style.styleBlock}>
                                    <img style={imageStyle(250)} src='https://vignette.wikia.nocookie.net/naruto/images/b/bc/Rin_Nohara.png/revision/latest?cb=20150805145941' />
                                    <Heading style={style.descPadding}>pich</Heading>
                                </Level.Item>
                                <Level.Item style={style.styleBlock}>
                                    <img style={imageStyle(250)} src='https://vignette.wikia.nocookie.net/naruto/images/0/09/Naruto_newshot.png/revision/latest/scale-to-width-down/340?cb=20170621101134' />
                                    <Heading style={style.descPadding}>eden</Heading>
                                </Level.Item>
                                <Level.Item style={style.styleBlock}>
                                    <img style={imageStyle(250)} src='https://vignette.wikia.nocookie.net/naruto/images/9/97/Hinata.png/revision/latest?cb=20141010104729' />
                                    <Heading style={style.descPadding}>jessica</Heading>
                                </Level.Item>
                                <Level.Item style={style.styleBlock}>
                                    <img style={imageStyle(250)} src='https://vignette.wikia.nocookie.net/naruto/images/9/9a/Shikamaru_Nara.png/revision/latest?cb=20180701024126' />
                                    <Heading style={style.descPadding}>lucas</Heading>
                                </Level.Item>
                            </Level>
                        </Container>
                    </Level.Item>
                </Level>
            </Section>
        </Parallax>
    )
}

export default Landing;