import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useYearPicker } from "./useYearPicker.js";
import { useElement } from "./useElement.js";

export const useCalender = ( unixTimeStamp, delay ) => {
  
  const [ currentTime, setCurrentTime ] = useState( unixTimeStamp );
  const timeRef = useRef();
  const timerSet = useRef();
  const updatedLast = useRef();
  const shouldBeFadded = useRef();
  const fadded = useRef();
  const [ month, setMonth ] = useState();
  const [ nodes, setNodes ] = useState( [] );
  const backgroundColorEl = useElement( "#backgroundCircle" );
  const backgroundElRef = useRef();
  const [] = useYearPicker( setCurrentTime, currentTime );
  
  useEffect( () => {
    if( currentTime ){
      timeRef.current = currentTime;
    }
  }, [ currentTime ] );
  
  useEffect( () => {
    if( backgroundColorEl && !backgroundElRef.current ){
      backgroundElRef.current = backgroundColorEl;
      backgroundColorEl.setAttribute( "fill", "rgb(41, 41, 41)" );
    }
  }, [ backgroundColorEl ] );
  
  useEffect( () => {
    const svg = document.querySelector( "svg" );
    
    if( !timerSet.current ){
      window.setInterval( checkIfNeedsToFade, 1000 );
      timerSet.current = true;
    }
    
    svg.setAttribute( "height", "100%" );
    svg.setAttribute( "width", "100%" );
    if( !month ){
      getMonthButtonAndText();
    }
    
    if( currentTime ){
      getNodesAndSetCalender( nodes.length > 0 );
    }
  }, [ unixTimeStamp, currentTime ] );
  
  /**
   * Gets a node from the dom and adds it to the nodes array.
   *
   * @param {number} i    The row the date el is in.
   * @param {number} j    The col the date el is in.
   */
  const getNode = ( i, j ) => {
    
    const el = document.querySelector( `#Number-${ i }${ j }` );
    if( el ){
      nodes[ i ].push( el );
    }else{
      console.error( `Something went wrong. We didn't find the node for ${ i }${ j } ` );
    }
  };
  
  /**
   * Gets the month next buttons and month text so it can be updated later.
   */
  const getMonthButtonAndText = () => {
    const monthSelection = document.querySelector( "#monthSelection" );
    debugger;
    const month = {};
    if( monthSelection ){
      monthSelection.childNodes.forEach( child => {
        if( child.id.includes( "ButtonRight" ) ){
          month.rightButton = child;
          child.addEventListener( "click", monthRighButtonClick );
          setMonthButtonClass( child );
        }else if( child.id.includes( "ButtonLeft" ) ){
          month.leftButton = child;
          child.addEventListener( "click", monthLefButtonClick );
          setMonthButtonClass( child );
        }else if( child.id.includes( "monthText" ) ){
          month.text = child;
          month.text.firstChild.textContent = moment.unix( currentTime )
            .format( "MMM" );
        }
      } );
      
      setMonth( month );
    }else{
      console.error( "Unable to locate the month selection in the dom." );
    }
    
  };
  
  /**
   * Sets the class names for the month selection buttons.
   * @param {HTMLElement} el
   * @param {string} buttonSide
   */
  const setMonthButtonClass = ( el, buttonSide ) => {
    try{
      if( el.hasChildNodes() ){
        el.childNodes.forEach( child => {
          if( child.id.includes( "Background" ) ){
            child.classList.add( "hover-glow" );
          }
        } );
        
      }else{
        throw new Error(
          "Unable to locate the month buttons background element." );
      }
    }catch( e ){
      console.log( e.message );
    }
  };
  
  /**
   * Creates the moment object and subtracts or adds the amount of time to
   * change before setting the new unix timestamp as the selected tate.
   *
   * @param {string} addOrSubtract
   * @param {string} unitOfTime
   * @param {number} amount
   */
  const changeDate = ( addOrSubtract, unitOfTime, amount ) => {
    if( !timeRef.current ){
      timeRef.current = currentTime;
    }
    const currentDate = moment.unix( timeRef.current );
    let nextDate;
    if( addOrSubtract === "add" ){
      nextDate = currentDate.add( amount, unitOfTime );
    }else{
      nextDate = currentDate.subtract( amount, unitOfTime );
    }
    const nextTimeStamp = nextDate.unix();
    timeRef.current = nextTimeStamp;
    setCurrentTime( nextTimeStamp );
  };
  
  /**
   * called when the right month button is pressed in the dom. Calls change
   * date with the appropriate parms.
   * @param {MouseEvent} e
   */
  const monthRighButtonClick = ( e ) => {
    console.log( "right click" );
    changeDate( "add", "month", 1 );
  };
  
  /**
   * called when the left month button is presse in the dom. Calls change
   * date with the appropiate params.
   * @param {MouseEvent} e
   */
  const monthLefButtonClick = ( e ) => {
    console.log( "left click" );
    changeDate( "subtract", "month", 1 );
  };
  
  /**
   * Called when the mouse leaves the date element in the calendar.
   * Sets the opacity of the highlight circle back to 0.
   *
   */
  const removeBackgroundOpacity = ( e ) => {
    if( e.target.hasChildNodes() ){
      e.target.childNodes.forEach( child => {
        if( child.id.includes( "Background" ) ){
          child.setAttribute( "fill-opacity", 0 );
        }
      } );
      e.target.removeEventListener( "onmouseleave", removeBackgroundOpacity );
    }
  };
  
  /**
   * Called when the mouse enters the date element in the calendar.
   * Sets the opacity of the highlight to 1.
   *
   */
  const setBackgroundOpacity = ( e ) => {
    if( e.target.hasChildNodes() ){
      e.target.childNodes.forEach( child => {
        if( child.id.includes( "Background" ) ){
          child.setAttribute( "fill-opacity", .4 );
          e.target.addEventListener( "mouseleave", removeBackgroundOpacity );
        }
      } );
    }
  };
  
  /**
   * called when the date has been clicked. Gets the value of the date that
   * has been clicked then calculates the amount of time that needs to be
   * changed before calling change date.
   */
  const onDateClick = ( e ) => {
    if( fadded.current ){
      return;
    }
    const value = getValueRecursive( e.target );
    if( value ){
      if( value.month === "current" ){
        let day = moment.unix( timeRef.current ).format( "D" );
        day = parseInt( day );
        value.value = parseInt( value.value );
        if( day < value.value ){
          changeDate( "add", "days", value.value - day );
        }else if( day > value.value ){
          changeDate( "subtract", "days", day - value.value );
        }
        
      }
    }
  };
  
  /**
   * recursive function to get the value of the date el that was click on.
   * If this element doesn't have the value then it looks at its parent
   * and so on till found or out of nodes.
   *
   * @param {HTMLElement} el
   */
  const getValueRecursive = ( el ) => {
    const value = el.getAttribute( "value" );
    if( value ){
      const month = el.getAttribute( "month" );
      return { value, month };
    }else{
      if( el.parentNode ){
        return getValueRecursive( el.parentElement );
      }
      return false;
    }
  };
  
  /**
   * This function is used to dim the calendar component after a set amount
   * of time.
   */
  const checkIfNeedsToFade = () => {
    
    if( shouldBeFadded.current && fadded.current ){
      return;
    }
    
    const now = moment( moment.now() );
    const last = moment.unix( updatedLast.current );
    const diff = now.diff( last );
    
    if( !backgroundElRef.current ){
      return;
    }
    
    if( !fadded.current && !shouldBeFadded.current && diff > delay ){
      shouldBeFadded.current = true;
      backgroundElRef.current.setAttribute( "fill", "url(#paint0_linear)" );
      nodes.forEach( row => {
        row.forEach( node => {
          node.classList.add( "fade" );
        } );
      } );
      fadded.current = true;
      window.addEventListener( "click", backgroundClick );
    }
    
  };
  
  /**
   * used to determine if there was a click any where el in the dom while the
   * calendar was set to dim. If there is it will set the calendar back to
   * bright again.
   */
  const backgroundClick = ( e ) => {
    shouldBeFadded.current = false;
    e.stopPropagation();
    backgroundElRef.current.setAttribute( "fill", "rgb(41, 41, 41)" );
    nodes.forEach( row => {
      row.forEach( node => {
        node.classList.remove( "fade" );
      } );
    } );
    fadded.current = false;
    window.removeEventListener( "click", backgroundClick );
    updatedLast.current = moment( moment.now() ).unix();
  };
  
  /**
   * gets the date nodes and sets them to the node array or just changes all
   * the text content of the nodes based on which month it is.
   * for the nodes in the dom.
   * @param {boolean} [getNodes]   to tell the function to get the nodes or not
   */
  const getNodesAndSetCalender = ( getNodes = false ) => {
    if( !timeRef.current ){
      timeRef.current = currentTime;
    }
    const momentDate = moment.unix( currentTime );
    const selectedDate = momentDate.format( "D" );
    
    // the dat of the week the month starts on
    let monthStartDay = momentDate.startOf( "month" ).day();
    
    if( month ){
      month.text.firstChild.textContent = momentDate.format( "MMM" );
    }
    
    let index = 1;
    const endOfMonth = momentDate.endOf( "month" ).format( "D" );
    const lastMonth = momentDate.subtract( 2, "weeks" );
    const maxDayLastMonth = lastMonth.endOf( "month" ).format( "D" );
    let finishedWithCurrentMonth = false;
    
    // double for loop to cycle though the calendar dates.
    for( let i = 0; i < 6; i++ ){
      
      // checking to see if the nodes are already populated in the array and
      // if no then it pushes a "row" into the nodes.
      if( nodes.length !== 6 ){
        nodes.push( [] );
        
        // if it pushes a row then it will need to get the nodes
        if( getNodes !== true ){
          getNodes = true;
        }
      }
      
      // second for loop to go through the columns
      for( let j = 0; j < 7; j++ ){
        
        if( getNodes ){
          getNode( i, j );
        }
        
        // we have not yet reached the day of the month to start on yet.
        // so we populate the array with dates from last month
        if( monthStartDay > 0 ){
          setNodeText( nodes[ i ][ j ],
            maxDayLastMonth - monthStartDay,
            .2,
            "prev",
          );
          monthStartDay--;
          
        }else{
          
          // we have reached the day of the month it starts on so we
          // populate the array with dates from this month or next month
          if( index > endOfMonth ){
            
            // we reached the end of this month and need to start off with
            // fresh numbers again.
            index = 1;
            finishedWithCurrentMonth = true;
          }
          
          if( index === parseInt( selectedDate ) && !finishedWithCurrentMonth ){
            // the selected day
            setNodeText( nodes[ i ][ j ], index, 1, "current", true );
          }else if( finishedWithCurrentMonth ){
            // dates for next month
            setNodeText( nodes[ i ][ j ], index, .2, "next" );
          }else{
            // dates for this month
            setNodeText( nodes[ i ][ j ], index, 1 );
          }
          
          index++;
        }
      }
      
    }
    
    setNodes( [ ...nodes ] );
  };
  
  /**
   * sets the dates text value and background opacity
   * @param {HTMLElement} node
   * @param {string} text
   * @param {number} [opacity]
   * @param {string} [month]
   * @param {boolean} [active]
   */
  const setNodeText = ( node, text, opacity = 1, month = "current",
    active = false ) => {
    try{
      node.setAttribute( "value", text );
      node.setAttribute( "month", month );
      if( parseInt( text ) < 10 ){
        text = "0" + text;
      }
      
      node.addEventListener( "mouseenter", setBackgroundOpacity );
      node.addEventListener( "click", onDateClick );
      
      node.childNodes.forEach( child => {
        if( child.id.includes( "text-" ) ){
          //text el
          child.firstChild.textContent = text;
          child.firstChild.setAttribute( "opacity", opacity );
        }else if( child.id.includes( "Background" ) ){
          // background circle
          child.setAttribute( "fill-opacity", 0 );
          // if the node is the current selected date or not.
          if( active && month === "current" ){
            child.classList.add( "active" );
          }else{
            child.classList.remove( "active" );
          }
        }
      } );
      
    }catch( e ){
      
      let name = "unknown";
      if( node && node.id ){
        name = node.id;
      }
      console.log( `Something went wrong trying to set the text content" +
              " at` + name );
    }
    
    updatedLast.current = moment( moment.now() ).unix();
  };
  
  return [ currentTime, setCurrentTime ];
  
};