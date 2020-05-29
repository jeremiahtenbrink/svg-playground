import React from "react";
import styled from "styled-components";
import Calendar from "../svgComponents/Calendar/Calendar.js";

/**
 *   CalendarView
 *
 *  @component
 *
 */
const CalendarView = ( props ) => {
  return ( <CalendarVewContainer className={ "calendar-view-container" }>
    <Calendar height={ 600 } width={ 500 }/>
    <Calendar height={ 300 } width={ 250 }/>
    <Calendar height={ 200 } width={ 200 }/>
  </CalendarVewContainer> );
};

const CalendarVewContainer = styled.div`
background: #0f0f0f;
height: 100vh;
width: 100vw;
display: flex;
align-items: center;
`;

CalendarView.propTypes = {};

export default CalendarView;