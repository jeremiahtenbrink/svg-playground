import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SvgTextAnimation from "../svgComponents/SvgTextAnimation.js";
import TwitterBird from "../svgComponents/TwitterBird.js";
import YouTubeIcon from "../svgComponents/YouTubeIcon.js";
import SunRainCloud from "../svgComponents/SunRainCloud.js";
import AnimateAlongPath from "../svgComponents/AnimateAlongPath.js";
import SnapChat from "../svgComponents/SnapChat.js";
import Calendar from "../svgComponents/Calendar/Calendar.js";

/**
 *   LandingPage
 *
 *  @component
 *
 */

const links = [];

const LandingPage = ( props ) => {
  
  return ( <Container>
    <AnimateAlongPath/>
    <Header className="App-header">
      <SvgTextAnimation/>
      <IconHolder>
        <TwitterBird/>
        <YouTubeIcon/>
        <SunRainCloud/>
        <SnapChat/>
      </IconHolder>
    </Header>
  </Container> );
};
const IconHolder = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`;

const Header = styled.header`
display: flex;
justify-content: center;
align-self: center;
width: 100vw;
flex-direction: column;
`;

const Container = styled.div`
width: 100vw;
height: 100vh;
overflow: hidden;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
a {
position: absolute;
bottom: 30px;
left: 30px;
color: #3c3f41;
}
`;

export default LandingPage;