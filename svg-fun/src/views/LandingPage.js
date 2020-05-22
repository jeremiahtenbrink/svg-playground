import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SvgTextAnimation from "../svgComponents/SvgTextAnimation.js";
import TwitterBird from "../svgComponents/TwitterBird.js";

/**
 *   LandingPage
 *
 *  @component
 *
 */
const LandingPage = ( props ) => {
  
  return ( <Container>
    <Header className="App-header">
      <SvgTextAnimation/>
      <TwitterBird/>
    </Header>
  </Container> );
};

const Header = styled.header`
border: 1px solid brown;
display: flex;
justify-content: center;
align-self: center;
width: 100vw;
flex-direction: column;
`;

const Container = styled.div`
width: 100%;
height: 100vh;
overflow: hidden;
display: flex;
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