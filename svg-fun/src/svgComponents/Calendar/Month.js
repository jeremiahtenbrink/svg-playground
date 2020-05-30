import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

/**
 *   Month
 *
 *  @component
 *
 */
const Month = ( props ) => {
  
  const monthSelected = moment.unix( props.dateSelected ).format( "MMM" );
  
  const onMonthArrowClick = ( el, arrowClicked ) => {
    let date;
    el.stopPropagation();
    if( arrowClicked === "right" ){
      date = moment.unix( props.dateSelected ).add( 1, "month" );
    }else{
      date = moment.unix( props.dateSelected ).subtract( 1, "month" );
    }
    props.setDateSelected( date );
    
  };
  
  return ( <Container id="Month" percentDimensions={ props.percentDimensions }>
    <svg width={ 124 * props.percentDimensions }
         height={ 21 * props.percentDimensions } viewBox="0 0 124 21"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <g id="monthSelection">
        <rect id="monthBackground" x="0.572021" y="0.0119324" width="122.9"
              height="20" rx="7" fill="#292929"/>
        <text id="monthText" fill="white"
              style={ { whiteSpace: "pre" } } font-family="Roboto"
              font-size="12"
              letter-spacing="0em">
          <tspan x="44.7542" y="13.3607">{ monthSelected }</tspan>
        </text>
        <g id="right">
          <g className="arrowBackground" style={ { mixBlendMode: "screen" } }
             onClick={ ( e ) => onMonthArrowClick( e, "right" ) }>
            <rect className="arrowBackground" x="92.6777" y="0.0176086"
                  width="30.7944"
                  height="20" rx="7" fill="#3BB2F5"/>
          </g>
          <path id="monthRightArrow"
                onClick={ ( e ) => onMonthArrowClick( e, "right" ) }
                d="M117.832 10.2936C118.027 10.0984 118.027 9.7818 117.832 9.58654L114.65 6.40456C114.455 6.2093 114.138 6.2093 113.943 6.40456C113.748 6.59982 113.748 6.9164 113.943 7.11167L116.771 9.94009L113.943 12.7685C113.748 12.9638 113.748 13.2804 113.943 13.4756C114.138 13.6709 114.455 13.6709 114.65 13.4756L117.832 10.2936ZM103.174 10.4401L117.478 10.4401V9.44009L103.174 9.44009V10.4401Z"
                fill="white"/>
        </g>
        <g id="left">
          <g className="arrowBackground" style={ { mixBlendMode: "screen" } }
             onClick={ ( e ) => onMonthArrowClick( e, "left" ) }>
            <rect x="0.572021" y="0.0119324" width="30.7944" height="20"
                  rx="7" fill="#3BB2F5"
                  onClick={ ( e ) => onMonthArrowClick( e, "left" ) }/>
          </g>
          <path id="monthLeftArrow"
                d="M6.15127 9.66596C5.95707 9.86228 5.95879 10.1789 6.1551 10.3731L9.35428 13.5378C9.5506 13.732 9.86717 13.7302 10.0614 13.5339C10.2556 13.3376 10.2539 13.021 10.0575 12.8268L7.21383 10.0138L10.0269 7.17005C10.2211 6.97374 10.2194 6.65716 10.0231 6.46296C9.82675 6.26876 9.51017 6.27047 9.31597 6.46679L6.15127 9.66596ZM20.8086 9.4401L6.50403 9.5176L6.50945 10.5176L20.814 10.4401L20.8086 9.4401Z"
                fill="white"/>
        </g>
      </g>
    
    </svg>
  
  </Container> );
};

const Container = styled.g`

position: absolute;
width: ${ ( { percentDimensions } ) => 124 * percentDimensions + "px" };
height: ${ ( { percentDimensions } ) => 21 * percentDimensions + "px" };
overflow-y: hidden;
top: ${ ( { percentDimensions } ) => 15 * percentDimensions + "px" };
left: ${ ( { percentDimensions } ) => 14 * percentDimensions + "px" };

& .arrowBackground{
  opacity:0;
  transition: all 1s ease;
  :hover {
    opacity: .3;
  }
}

`;

Month.propTypes = {};

export default Month;