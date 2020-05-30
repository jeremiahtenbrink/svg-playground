import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";

/**
 *   Year
 *
 *  @component
 *
 */
const Year = ( props ) => {
  
  const [ yearsOpen, setYearsOpen ] = useState( false );
  const year = moment.unix( props.dateSelected ).format( "YYYY" );
  const years = [];
  const [ yearPosition, setYearPosition ] = useState( ( 25 ) );
  const eventListener = useRef();
  debugger
  for( let i = 0; i < 50; i++ ){
    years.push( year - 25 + i );
  }
  
  const onScroll = ( e ) => {
    
    if( checkScrollDirectionIsUp( e ) ){
      
      setYearPosition( ( yearPosition ) => yearPosition < 45 ?
        yearPosition + 1 : yearPosition );
      
    }else{
      
      setYearPosition( ( yearPosition ) => yearPosition > 0 ? yearPosition - 1 :
        yearPosition );
      
    }
  };
  
  const setYearSelected = ( yearSelected ) => {
    if( !yearsOpen ){
      return;
    }
    const diff = yearSelected - year;
    const nextDate = moment.unix( props.dateSelected ).add( diff, "years" );
    props.setDateSelected( nextDate );
  };
  
  const onMouseLeave = () => {
    
    window.removeEventListener( "wheel", onScroll, true );
    eventListener.current = null;
    
  };
  
  const onMouseEnter = ( e ) => {
    
    if( !eventListener.current ){
      eventListener.current = window.addEventListener( "wheel",
        onScroll,
        true,
      );
    }
  };
  
  function checkScrollDirectionIsUp( event ){
    if( event.wheelDelta ){
      return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
  }
  
  return ( <Container id="Year" yearsOpen={ yearsOpen }
                      height={ 84 * props.percentDimensions }
                      width={ 53 * props.percentDimensions }
                      percentDimensions={ props.percentDimensions }
                      onClick={ () => setYearsOpen( !yearsOpen ) }
                      yearPosition={ yearPosition }
    >
      
      <svg width="100%" height="100%" viewBox="0 0 53 84" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <g id="yearAndDrooDown">
          
          <rect id="yearBackground" x="0.201843" y="0.026886"
                width="52.757" height="21.199" rx="7" fill="#292929"/>
          <text id="yearText" fill="white"
                style={ { whiteSpace: "pre" } } fontFamily="Roboto"
                fontSize="12" letterSpacing="0em">
            <tspan x="11.3058" y="14.4724">{ year } </tspan>
          </text>
          
          <g id="yearDropDown">
            <rect id="background" x="0.201843" y="0.026886"
                  width="52.757" height="83.4215" rx="7"
                  fill="#292929"/>
            <g id="years">
              <g clipPath="url(#clip0)">
                <Years id="yearSelection" onMouseEnter={ onMouseEnter }
                       onMouseLeave={ onMouseLeave }>
                  <g className={ "yearDropDownSelection" }
                     clipPath="url(#clip1)">
                    { years.map( ( yearNum, i ) => {
                      return ( <text id="yearText" fill="white"
                                     style={ { whiteSpace: "pre" } }
                                     fontFamily="Roboto"
                                     fontSize="12" letterSpacing="0em">
                        <tspan x={ 11.3058 }
                               onClick={ () => setYearSelected( yearNum ) }
                               y={ 14 *
                               ( i - yearPosition ) }>{ yearNum } </tspan>
                      </text> );
                    } ) };
                  </g>
                </Years>
              </g>
            </g>
          </g>
          
          
          <path id="yearDropDownCarret"
                d="M47.5718 8.84192L44.0895 12.4109L40.6397 8.88382"
                stroke="white" strokeLinecap="round"
                strokeLinejoin="round"/>
        
        </g>
        
        <defs>
          <clipPath id="clip0">
            <rect x="3.95886" y="0.4608" width="46" height="83" fill="white"/>
          </clipPath>
          <clipPath id="clip1">
            <rect x="0.201782" y="-9.15383" width="52.757" height="100.45"
                  fill="white"/>
          </clipPath>
        </defs>
      </svg>
      
      <Years>
      
      </Years>
    
    
    </Container>
  
  );
};

const Years = styled.g`
  height: 100%;
  
  `;

const Container = styled.div`
  position: absolute;
  width: ${ props => props.width + "px" };
  height: ${ props => props.height + "px" };
  overflow-y: hidden;
  top: 0;
  left: 0;
  
  #background{ opacity: 1;
    z-index: 0;
    }
  
  svg{ position: absolute;
    top: 0;
    left: 0;
    z-index: -0;
    overflow: visible;
    transition: transform 1s ease, opacity 1s ease; };
    transform: ${ props => `translate(${ props.percentDimensions *
141 }px, ${ 15 * props.percentDimensions }px)` };
  }
  
  & #yearDropDown {
  z-index: 5;
  opacity: ${ props => props.yearsOpen ? 1 : 0 };
  
  
  .yearDropDownSelection {
  
  }
  
  `;

Year.propTypes = {};

export default Year;