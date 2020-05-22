import React from "react";
import styled from "styled-components";
import { ReactComponent as RollingBall } from "../svgs/smil/RollingBall.svg";

/**
 *   SmilAnimations
 *
 *  @component
 *
 */
const SmilAnimations = ( props ) => {
  return ( <Container>
    <RollingBall/>
  </Container> );
};

const Container = styled.div`

`;

SmilAnimations.propTypes = {};

export default SmilAnimations;