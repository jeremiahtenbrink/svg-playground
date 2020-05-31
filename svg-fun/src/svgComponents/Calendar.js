import React, { useEffect, useState } from "react";
import moment from "moment";
import styled, { keyframes } from "styled-components";
import { ReactComponent as CalendarSvg } from "../svgs/icons/Calendar.svg";
import { useCalender } from "../customHooks/useCalender.js";

/**
 *   Calendar2
 *
 *  @component
 *
 */
const Calendar = ( props ) => {
  
  const [ selectedDate, setNewTime ] = useCalender( moment( moment.now() )
    .unix() );
  const [ dimensions, setDimensions ] = useState( {
    defaultHeight: 231,
    defaultWidth: 211,
    percentage: 1,
    propsHeight: null,
    propsWidth: null,
    circleCenter: {},
  } );
  
  const onMonthArrowClick = ( el, arrowClicked ) => {
    let date;
    el.stopPropagation();
    
    if( arrowClicked === "right" ){
      date = moment.unix( selectedDate ).add( 1, "month" );
    }else{
      date = moment.unix( selectedDate ).subtract( 1, "month" );
    }
    setNewTime( date.unix() );
    
  };
  
  useEffect( () => {
    
    // todo: need to come back and account for if they only send in height or
    // only width
    
    if( props.height || props.width ){
      setDimensions( {
        ...dimensions,
        propsHeight: props.height || dimensions.defaultHeight,
        propsWidth: props.width || dimensions.defaultWidth,
        percentage: Math.min( props.height / dimensions.defaultHeight,
          props.width / dimensions.defaultHeight,
        ),
        circleCenter: {
          x: 114.551, y: 132.74,
        },
      } );
    }
    
  }, [ props ] );
  
  const day = moment.unix( selectedDate ).format( "D" );
  
  return ( <Container dimensions={ dimensions } { ...props } >
    <h2>{ moment.unix( selectedDate )
      .format( "LL" ) }</h2>
    <CalendarSvg/>
  </Container> );
};

const slideRight = keyframes`
0%{
  transform: translate(0, 0);
  opacity: 1;
}
20%{
  transform: translate(50px 0);
  opacity: 0;
}
100% {
  transform: translate(200px, 0);
  opacity: 0;
}
`;

const slideLeft = keyframes`
0%{
  transform: translate(200px, 0);
  opacity: 0;
}
20%{
  transform: translate(50px 0);
  opacity: 0;
}
100% {
  transform: translate(0, 0);
  opacity: 1;
}
`;

const rotate = keyframes`
0%{
transform: rotateZ(0deg);
}100%{
transform: rotateZ(359deg);
}

`;

const Container = styled.div`
${ ( { dimensions } ) => {
  return `
  position: relative;
  width: ${ dimensions.propsWidth || dimensions.defaultWidth }px;
  height: ${ dimensions.propsHeight || dimensions.defaultHeight }px;
    `;
  
} }

svg{
overflow: visible;
}

h2 {
text-align: center;
color: white;
font-size: 32px;
width: 100%;
}

.hover-glow{
  opacity: 0;
  fill-opacity: 0;
  :hover{
    opacity: 1;
    fill-opacity: 1;
  }
}

.hide {
  display: none;
}

.slide-right {
  animation: ${ slideRight } 1s ease forwards;
}

.slide-left {
  animation: ${ slideLeft } 1s ease forwards;
}

.active {
  fill-opacity: 1;
  opacity: 1;
}

#backgroundCircle {
  transform-origin: ${ ( { dimensions } ) => `${ dimensions.circleCenter.x }px ${ dimensions.circleCenter.y }px` };
  animation: ${ rotate } .5s linear infinite;
}

.fade {
  opacity: .1;
}

.scroll-up {
  #years {
    transition: transform .1s linear;
    transform: translate(0px, -15px);
  }
}

.scroll-down {
  #years {
    transition: transform .1s linear;
    transform: translate(0px, 15px);
  }
}

#border {
opacity: ${ props => props.bordered ? 1 : 0 };
}

`;

Calendar.propTypes = {};

export default Calendar;