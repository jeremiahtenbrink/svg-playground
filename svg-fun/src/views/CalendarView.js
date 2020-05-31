import React from "react";
import styled from "styled-components";
import Calendar from "../svgComponents/Calendar.js";

/**
 *   CalendarView
 *
 *  @component
 *
 */
const CalendarView = ( props ) => {
  return ( <CalendarVewContainer className={ "calendar-view-container" }>
    <Calendar height={ 600 } width={ 600 } bordered/>
  </CalendarVewContainer> );
};

const CalendarVewContainer = styled.div`
background: #0f0f0f;
height: 100%;
min-height: 100vh;
width: 100%;
display: flex;
align-items: center;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
margin: 0;
`;

CalendarView.propTypes = {};

export default CalendarView;