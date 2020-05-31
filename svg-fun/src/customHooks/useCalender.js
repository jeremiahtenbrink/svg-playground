import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useYearPicker } from "./useYearPicker.js";
import { useElement } from "./useElement.js";

export const useCalender = ( unixTimeStamp ) => {
  
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
    if( backgroundColorEl ){
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
  
  const getNode = ( i, j ) => {
    
    const el = document.querySelector( `#Number-${ i }${ j }` );
    if( el ){
      nodes[ i ].push( el );
    }else{
      console.error( `Something went wrong. We didn't find the node for ${ i }${ j } ` );
    }
  };
  
  const getMonthButtonAndText = () => {
    const monthSelection = document.querySelector( "#monthSelection" );
    const month = {};
    if( monthSelection ){
      monthSelection.childNodes.forEach( child => {
        if( child.id.includes( "RightButton" ) ){
          month.rightButton = child;
          child.addEventListener( "click", monthRighButtonClick );
          setMonthButtonClass( child );
        }else if( child.id.includes( "LeftButton" ) ){
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
   * @param {HTMLElement} el
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
  
  const monthRighButtonClick = ( e ) => {
    console.log( "right click" );
    changeDate( "add", "month", 1 );
  };
  
  const monthLefButtonClick = ( e ) => {
    console.log( "left click" );
    changeDate( "subtract", "month", 1 );
  };
  
  const setNewTime = ( unixTimeStamp ) => {
    if( typeof unixTimeStamp === "moment" ){
      setCurrentTime( unixTimeStamp.unix() );
    }
    setCurrentTime( unixTimeStamp );
  };
  
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
    
    if( !fadded.current && !shouldBeFadded.current && diff > 5 * 1000 ){
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
  
  const getNodesAndSetCalender = ( getNodes = false ) => {
    if( !timeRef.current ){
      timeRef.current = currentTime;
    }
    const momentDate = moment.unix( currentTime );
    const selectedDate = momentDate.format( "D" );
    let monthStartDay = momentDate.startOf( "month" ).day();
    
    if( month ){
      month.text.firstChild.textContent = momentDate.format( "MMM" );
    }
    
    let index = 1;
    const endOfMonth = momentDate.endOf( "month" ).format( "D" );
    const lastMonth = momentDate.subtract( 2, "weeks" );
    const maxDayLastMonth = lastMonth.endOf( "month" ).format( "D" );
    let finishedWithCurrentMonth = false;
    
    for( let i = 0; i < 6; i++ ){
      if( nodes.length !== 6 ){
        nodes.push( [] );
        if( getNodes !== true ){
          getNodes = true;
        }
      }
      
      for( let j = 0; j < 7; j++ ){
        if( getNodes ){
          getNode( i, j );
        }
        if( monthStartDay > 0 ){
          setNodeText( nodes[ i ][ j ],
            maxDayLastMonth - monthStartDay,
            .2,
            "prev",
          );
          monthStartDay--;
          
        }else{
          if( index > endOfMonth ){
            index = 1;
            finishedWithCurrentMonth = true;
          }
          if( index === parseInt( selectedDate ) && !finishedWithCurrentMonth ){
            setNodeText( nodes[ i ][ j ], index, 1, "current", true );
          }else if( finishedWithCurrentMonth ){
            setNodeText( nodes[ i ][ j ], index, .2, "next" );
          }else{
            setNodeText( nodes[ i ][ j ], index, 1 );
          }
          
          index++;
        }
      }
      
    }
    
    setNodes( [ ...nodes ] );
  };
  
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
          child.firstChild.textContent = text;
          child.firstChild.setAttribute( "opacity", opacity );
        }else if( child.id.includes( "Background" ) ){
          child.setAttribute( "fill-opacity", 0 );
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
  
  return [ currentTime, setNewTime ];
  
};