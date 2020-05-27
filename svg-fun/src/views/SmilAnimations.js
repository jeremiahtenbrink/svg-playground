import React from "react";
import styled from "styled-components";
import * as Svgs from "../svgs/smil";
import HighLight from "react-highlight.js";

/**
 *   SmilAnimations
 *
 *  @component
 *
 */
const SmilAnimations = ( props ) => {
  
  const getHighLight = ( name ) => {
    const Animation = Svgs[ name ];
    return ( <Smil>
      <AnimationAndTitle>
        <h2>{ name }</h2>
        <Animation/>
      </AnimationAndTitle>
      <HighLight>{ code[ name ] }</HighLight>
    </Smil> );
    
  };
  return ( <Container>
    { getHighLight( "RollingBall" ) }
    { getHighLight( "TransformRect" ) }
    { getHighLight( "FollowPath" ) }
    { getHighLight( "CurvedMotion" ) }
  
  </Container> );
};

const code = {
  [ "CurvedMotion" ]: `<rect x="0" y="0" width="20" height="20" fill="blue" stroke="black" stroke-width="1">
        <animateMotion
                path="M 250,80 H 50 Q 30,80 30,50 Q 30,20 50,20 H 250 Q 280,20,280,50 Q 280,80,250,80Z"
                dur="3s" repeatCount="indefinite" rotate="auto" />
    </rect>`, [ "RollingBall" ]: `<circle cx="0" cy="50" r="15" fill="blue" stroke="black" stroke-width="1">
        <animate
                attributeName="cx" from="0" to="500"
                dur="5s" repeatCount="indefinite" />
    </circle>`, [ "TransformRect" ]: `<rect x="0" y="50" width="15" height="34" fill="blue" stroke="black" stroke-width="1">
        <animateTransform
                attributeName="transform"
                begin="0s"
                dur="20s"
                type="rotate"
                from="0 60 60"
                to="360 100 60"
                repeatCount="indefinite"
        />
    </rect>`, [ "FollowPath" ]: `<rect x="0" y="0" width="300" height="100" stroke="black" stroke-width="1" />
    <circle cx="0" cy="50" r="15" fill="blue" stroke="black" stroke-width="1">
        <animateMotion
                path="M 0 0 H 300 Z"
                dur="3s" repeatCount="indefinite" />
    </circle>`,
};

const Smil = styled.div`
display: flex;
margin-top: 2rem;
h2 {
  color: white;
}
`;

const AnimationAndTitle = styled.data`
display: flex;
flex-direction: column;
margin-right: 3rem;
`;

const Container = styled.div`
background-color: black;
display: flex;
flex-direction: column;
height: 100%;
min-height: 100vh;
width: 100%;
padding: 4rem;

`;

SmilAnimations.propTypes = {};

export default SmilAnimations;