import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Year from "./Year.js";
import moment from "moment";
import Month from "./Month.js";
import CalendarBackground from "./CalendarBackground.js";

/**
 *   Calendar
 *
 *  @component
 *
 */
const Calendar = ( props ) => {
  
  const [ todaysDate, setTodaysDate ] = useState( moment.now() );
  const [ dateSelected, setDateSelected ] = useState( moment.unix() );
  const percentWidth = props.width / 209;
  const percentHeight = props.height / 199;
  const minPercent = Math.min( percentHeight, percentWidth );
  
  return (
    <Container border={ props.border || false } percentDimensions={ minPercent }
               className={ "calendar-container" }>
      <CalendarBackground border={ props.border || false }
                          percentDimensions={ minPercent }/>
      <Year percentDimensions={ minPercent }
            setDateSelected={ setDateSelected }/>
    
    
    </Container> );
};

const Container = styled.div`
position: relative;
width: ${ props => props.width ? props.width + "px" : "100%" };
height: ${ props => props.height ? props.height + "px" : "100%" };

`;

Calendar.propTypes = {};

export default Calendar;