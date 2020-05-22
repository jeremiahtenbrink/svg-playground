import React from "react";
import styled from "styled-components";
import { ReactComponent as BlueBackgroundSvg } from "../svgs/BlackAndBrightBlueBackground.svg";

/**
 *   BlueBackground
 *
 *  @component
 *
 */
const BlueBackground = ( props ) => {
  return ( <Container>
  
  </Container> );
};

const Container = styled( BlueBackgroundSvg )`
position: absolute;
left: 0;
top: 0;
z-index: -1;
filter: ;
`;

BlueBackground.propTypes = {};

export default BlueBackground;