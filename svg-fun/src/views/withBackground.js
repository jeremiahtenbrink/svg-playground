import React from "react";
import OctPaths from "../svgComponents/OctPaths.js";

export const withBackground = ( Component, Background = OctPaths ) => ( props ) => (
  <div>
    <Background/>
    <Component { ...props } />
  
  </div> );