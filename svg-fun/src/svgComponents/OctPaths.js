import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as OctBackground } from "../svgs/OctogonPaths.svg";

/**
 *   OctPaths
 *
 *  @component
 *
 */
const OctPaths = ( props ) => {
  
  return ( <Container>
    <SVgContainer/>
  </Container> );
};

const Container = styled.div`
max-height: 100vh;
overflow-y: hidden;
`;

const SVgContainer = styled( OctBackground )`
&& {
  overflow:hidden;
  position: absolute;
  left: 0;
  z-index: -1;

  
  #animationPath {
    animation: octDash 5s linear infinite;
    stroke: #2196F3;
    stroke-width: 2;
    opacity: .1;
    }
    
    @keyframes octDash {
    0% {
      stroke-dasharray: 20%, 180%;
      stroke-dashoffset: 0;
    }
    
    50% {
      stroke-dasharray: 20%, 180%;
      stroke-dashoffset: 100%;
    }
    100% {
      stroke-dasharray: 20%, 180%;
      stroke-dashoffset: 200%
    }
  }
}
`;

OctPaths.propTypes = {};

export default OctPaths;