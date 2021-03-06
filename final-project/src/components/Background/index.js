import React from "react";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Section, Container } from 'react-bulma-components';
import { Parallax } from "react-parallax";
import styled, { keyframes } from 'styled-components'
import squiggle from './boba-squiggle.png'

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
    background: {
        backgroundColor: '#ECCDC2',
        height: '100%'
    },

    landingSpacing: {
        width: '100vw',
        height: 'calc(100vh)'
    },

    wave: {
        backgroundImage: `url(${squiggle})`,
        backgroundSize: 'cover',
        zIndex: '3',
        height: '90px',
    },

};

function Landing() {

    return (
        <div style={style.background}>
            <Parallax strength={window.innerWidth}>
                {/* <div style={style.wave}></div> */}
                <Section style={style.landingSpacing}>
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
            </Parallax>
        </div>
    )
}

export default Landing;