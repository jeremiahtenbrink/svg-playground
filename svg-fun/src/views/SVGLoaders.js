import React from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as CircleLoader } from "../svgs/CircleDotLoader.svg";
import { ReactComponent as SpinLoader } from "../svgs/SpingLoader.svg";
import { ReactComponent as HalfCircleLoader } from "../svgs/roundLoaing.svg";
import PropTypes from "prop-types";

/**
 *   SvgLoaders
 *
 *  @component
 *
 */
const SvgLoaders = ( props ) => {
  return ( <Container>
    <CircleDotLoader/>
    <SpinLoaderFan/>
    <HalfCircle/>
  </Container> );
};

const spin = keyframes`
0%{
  transform: rotateZ(0deg);
}100%{
transform: rotateZ(359deg);
}
`;

const HalfCircle = styled( HalfCircleLoader )`

&& {
overflow: visible;
}

#inner-circle1 {
transform-origin: center center;
animation: ${ spin } 1s linear forwards infinite;
}
#inner-circle2 {
transform-origin: center center;
animation: ${ spin } 2s linear forwards infinite;
}
#inner-circle3 {
transform-origin: center center;
animation: ${ spin } 1.5s linear forwards infinite;
}
#outter-cirlce1 {
transform-origin: center center;
animation: ${ spin } 1.8s linear forwards infinite;
}
#outercirlce {
transform-origin: center center;
animation: ${ spin } 1.2s linear forwards infinite;
}
`;

const SpinLoaderFan = styled( SpinLoader )`
#Vector {
transform-origin: center center;
animation: ${ spin } 1s linear forwards infinite;
}
`;

const CircleDotLoader = styled( CircleLoader )`
#mask {
transform-origin: center center;
animation: ${ spin } 1s linear forwards infinite;
}

#Subtract {
transform-origin: center center;
animation: ${ spin } 2s linear forwards infinite;
}
`;

const Container = styled.div`
min-height: 100vh;
min-width: 100vw;
background-color: #2f2e2e;
`;

SvgLoaders.propTypes = {};

export default SvgLoaders;