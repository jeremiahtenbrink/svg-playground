import React from "react";
import styled from "styled-components";
import javascript from "../svgs/JavaScript1.svg";
import ReactSVG from "../svgs/ReactIcon.svg";
import { ReactComponent as NodeJs } from "../svgs/Node.js.svg";

/**
 *   SvgsAndReact
 *
 *  @component
 *
 */
const SvgsAndReact = ( props ) => {
  return ( <Container>
    <img src={ javascript }/>
    <ReactDiv className={ "react" }/>
    <NodeJs/>
    <svg width="529" height="253" viewBox="0 0 529 253" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      
      <g id="Git">
        <g id="IconBox">
          <g id="Holders">
            <g id="circle">
              <circle id="thin" cx="268.826" cy="127.5" r="123.5"
                      stroke="#DE4C36" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray="1 1"/>
            </g>
          </g>
        </g>
        <g id="Git_2">
          <path id="Vector"
                d="M334.515 120.375L271.515 57.379C267.89 53.7508 262.005 53.7508 258.375 57.379L245.292 70.4612L261.888 87.0567C265.744 85.7535 270.167 86.6277 273.241 89.7018C276.33 92.7957 277.198 97.2558 275.863 101.125L291.856 117.119C295.726 115.786 300.19 116.648 303.281 119.744C307.6 124.061 307.6 131.059 303.281 135.379C298.961 139.7 291.963 139.7 287.64 135.379C284.391 132.127 283.589 127.356 285.234 123.353L270.318 108.438L270.317 147.689C271.398 148.223 272.385 148.929 273.241 149.78C277.56 154.097 277.56 161.096 273.241 165.419C268.92 169.738 261.919 169.738 257.605 165.419C253.286 161.096 253.286 154.098 257.605 149.78C258.64 148.745 259.87 147.925 261.224 147.367V107.751C259.868 107.197 258.638 106.377 257.605 105.338C254.333 102.07 253.546 97.2682 255.223 93.25L238.863 76.889L195.666 120.084C192.036 123.716 192.036 129.601 195.666 133.229L258.667 196.227C262.294 199.856 268.177 199.856 271.809 196.227L334.515 133.522C338.144 129.892 338.144 124.004 334.515 120.375"
                fill="#DE4C36"/>
        </g>
      </g>
    </svg>
  
  </Container> );
};

const ReactDiv = styled.div`

height: 250px;
background: url(${ ReactSVG });
background-repeat: no-repeat;
`;

const Container = styled.div`


`;

SvgsAndReact.propTypes = {};

export default SvgsAndReact;