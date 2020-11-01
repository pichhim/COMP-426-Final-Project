import React from "react";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Section, Container, Level, Heading, Button, Figure, Image } from 'react-bulma-components';
import { Parallax } from "react-parallax";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useSpring, animated} from 'react-spring'

import 'font-awesome/css/font-awesome.min.css';

function Landing() {

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
            marginLeft: '10px',
        },

        loginButton: {
            marginRight: '10px',
            paddingLeft: '25px',
            paddingRight: '25px',
        },

        buttonContainer: {
            paddingTop: '20px',
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
            paddingTop: '25px',
        },

        iconSize: {
            fontSize: '150px',
        }
    };

    const whiteSection = {
        backgroundColor: 'white',
        width: '100vw',
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

      //let's build the chutes
for (var i = 0; i < 20; ++i) {
    $('<div/>', {
        class: 'chute'
    }).appendTo('#box');
}

//cache a few static values
var box = $('#box');
var width = box.width();
var height = box.height();
var chute = $('.chute');

//our main animation "loop"

chute.each(function foo() {

    //generate random values
    var top = (Math.random() * height) | 0;
    var left = (Math.random() * width) | 0;
    var time = Math.random() * (700-30)  + 10000| 0;

    //animate
    //we introduce a random value so that they aren't moving together
    //after the animation, we call foo for the current element
    //to animate the current element again
    $(this).animate({
        left: left,
        top: top
    }, time, foo);
});

    return (
        <Parallax bgImage={bobaBackground} strength={500}>
            <div id='box'></div>
            <Section style={style.landingSpacing}>
                <Level>
                    <Level.Item>
                        <Container style={style.landingDisplay}>
                            <Heading style={style.landingTitle}>a nice name</Heading>
                            <Heading subtitle size={4} style={style.landingPadding}>a messaging app</Heading>
                            <Level.Item style={style.buttonContainer}>
                                <Button style={style.loginButton}>login</Button>
                                <Button style={style.signupButton}>sign up</Button>
                            </Level.Item>
                        </Container>
                    </Level.Item>
                </Level>
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