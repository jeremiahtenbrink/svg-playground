import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as SunRainCloudSvg } from "../svgs/sunCloudRain.svg";

/**
 *   SunRainCloud
 *
 *  @component
 *
 */
const SunRainCloud = ( props ) => {
  
  const [ rainDrops, setRainDrops ] = useState( {} );
  
  useEffect( () => {
    debugger;
    getDrops( "big" );
    getDrops( "small" );
    
  }, [] );
  
  const rain = () => {
    const keys = Object.keys( rainDrops );
    if( keys.length > 0 ){
      keys.forEach( key => {
        const drop = rainDrops[ key ].shift();
        drop.setAttribute( "" );
      } );
    }
  };
  
  const getDrops = ( whichDrops ) => {
    const group = document.querySelector( `#${ whichDrops }RainDrops` );
    if( group.hasChildNodes ){
      const drops = [];
      group.childNodes.forEach( rainDrop => {
        setTransparent( rainDrop );
        drops.push( rainDrop );
      } );
      setRainDrops( { ...rainDrops, [ whichDrops ]: drops } );
    }
  };
  
  
  
  const setTransparent = ( element ) => {
    
    if( element.hasChildNodes ){
      element.childNodes.forEach( el => {
        setTransparent( el );
      } );
    }
    debugger
    if( element.classList.contains( "invisible" ) ){
      return;
    }
    element.classList.add( "invisible" );
  };
  
  return ( <Container>
  
  
  </Container> );
};

const Container = styled( SunRainCloudSvg )`

.invisible{
  display: none;
}
`;

SunRainCloud.propTypes = {};

export default SunRainCloud;