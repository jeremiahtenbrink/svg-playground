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
  
  const monthSelected = moment( props.dateSelected ).format( "MMM" );
  
  const onMonthArrowClick = ( arrowClicked ) => {
    debugger;
    let date;
    if( arrowClicked === "right" ){
      date = moment( props.dateSelected ).add( 1, "month" );
    }else{
      date = moment( props.dateSelected ).subtract( 1, "month" );
    }
    
    props.setDateSelected( date );
  };
  
  return ( <Container id="Month">
    <rect id="MonthBackground" x="19" y="1.86217" width="122.9"
          height="20" rx="7" fill="#292929"/>
    <text id="Month" fill="white"
          style={ { whiteSpace: "pre" } } fontFamily="Roboto"
          fontSize="12"
          letterSpacing="0em">
      <tspan x="63.1822" y="15.2109">{ monthSelected }</tspan>
    </text>
    
    <g id="LeftArrow" onClick={ () => onMonthArrowClick( "left" ) }>
      <rect className="ArrowBackground" x="19" y="1.86217" width="30.7944"
            height="20" rx="7"
            style={ { mixBlendMode: "screen" } }
            fill="#3BB2F5"/>
      
      <path id="MonthLeftArrow"
            d="M24.5793 11.5162C24.3851 11.7125 24.3868 12.0291 24.5831 12.2233L27.7823 15.388C27.9786 15.5822 28.2952 15.5805 28.4894 15.3842C28.6836 15.1878 28.6818 14.8713 28.4855 14.6771L25.6418 11.864L28.4549 9.0203C28.6491 8.82398 28.6474 8.5074 28.451 8.3132C28.2547 8.119 27.9381 8.12071 27.7439 8.31703L24.5793 11.5162ZM39.2365 11.2903L24.932 11.3678L24.9374 12.3678L39.242 12.2903L39.2365 11.2903Z"
            fill="white"/>
    </g>
    
    
    <g id="RightArrow" onClick={ () => onMonthArrowClick( "right" ) }>
      <rect className="ArrowBackground" x="111.106" y="1.86784" width="30.7944"
            height="20" rx="7" fill="#3BB2F5"/>
      <path id="MonthRightArrow"
            d="M136.26 12.1439C136.455 11.9486 136.455 11.632 136.26 11.4368L133.078 8.2548C132.883 8.05954 132.566 8.05954 132.371 8.2548C132.176 8.45006 132.176 8.76665 132.371 8.96191L135.199 11.7903L132.371 14.6188C132.176 14.814 132.176 15.1306 132.371 15.3259C132.566 15.5211 132.883 15.5211 133.078 15.3259L136.26 12.1439ZM121.602 12.2903L135.906 12.2903V11.2903L121.602 11.2903V12.2903Z"
            fill="white"/>
    </g>
  </Container> );
};

const Container = styled.g`

& .ArrowBackground{
  opacity:0;
  transition: all 1s ease;
  :hover {
    opacity: .3;
  }
}

`;

Month.propTypes = {};

export default Month;