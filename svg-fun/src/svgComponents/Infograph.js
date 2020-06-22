import React from "react";
import styled from "styled-components";
import { ReactComponent as Background } from "../svgs/infograph2.svg";
import { ReactComponent as InfoGraph } from "../svgs/infoGraph.svg";

/**
 *   Infograph
 *
 *  @component
 *
 */
const Infograph = ( props ) => {
  return ( <Container>
    <Background/>
    <InfoGraph/>
  </Container> );
};

const Container = styled.div`

body {
  background-color:#115F9A;
  overflow: hidden;
  /* font-family: 'Alegreya Sans', sans-serif; */
  
}

body,
html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}


svg{
  position:absolute;
  width:100%;
  height:100%;
  visibility:hidden;
 
}


.mainSVG{
  position:absolute;
  width:100%;
  height:100%;
  visibility:hidden;
  /*  top:200px; */
  left:50%;
  transform:translate(-50%, 0%);
  overflow:visible;
}

#boxLabel{
  text-anchor:middle;
  fill:#115F9A;
  font-size:21px;
  user-select:none;
  -webkit-user-select:none;
  pointer-events:none;
  font-family: 'Roboto', sans-serif;
  font-weight:700;
}

.box{
  opacity:0;
}
circle{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

`;

Infograph.propTypes = {};

export default Infograph;