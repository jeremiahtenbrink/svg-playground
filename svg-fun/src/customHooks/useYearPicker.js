import React, { useEffect, useRef, useState } from "react";
import { useElement } from "./useElement.js";
import moment from "moment";

export const useYearPicker = ( setDate, timeStamp ) => {
  const yearDropDown = useElement( "#yearDropDown" );
  const yearText = useElement( "#yearText" );
  const hoverBackground = useElement( "#yearGlowBackground" );
  const years = useElement( "#yearSelection" );
  const yearsSelectionBackground = useElement( "#background" );
  const [ open, setOpen ] = useState( false );
  const hovering = useRef();
  const currentYear = useRef();
  const scrolling = useRef();
  const timeOpened = useRef();
  
  useEffect( () => {
    if( yearDropDown ){
      yearDropDown.classList.add( "hide" );
      yearDropDown.classList.add( "slide-right" );
      yearsSelectionBackground.addEventListener( "mouseenter",
        hoveringDropDown,
      );
      yearsSelectionBackground.addEventListener( "mouseleave", notHovering );
      setYears();
    }
  }, [ yearDropDown ] );
  
  const setYears = () => {
    if( !currentYear.current ){
      
      currentYear.current = parseInt( moment.unix( timeStamp )
        .format( "YYYY" ) );
      years.firstElementChild.childNodes.forEach( ( child, i ) => {
        child.firstElementChild.textContent = currentYear.current + i;
        child.addEventListener( "click", onYearSelected );
      } );
    }else{
      years.firstElementChild.childNodes.forEach( ( child, i ) => {
        child.firstElementChild.textContent = currentYear.current + i;
      } );
    }
    
  };
  
  const onYearSelected = ( e ) => {
    setOpen( false );
    const currentSelectedYear = parseInt( moment.unix( timeStamp )
      .format( "YYYY" ) );
    const newYear = parseInt( e.target.textContent );
    
    if( currentSelectedYear > newYear ){
      let newDate = currentSelectedYear - newYear;
      newDate = moment.unix( timeStamp ).subtract( newDate, "years" );
      setDate( newDate.unix() );
    }else{
      let newDate = newYear - currentSelectedYear;
      newDate = moment.unix( timeStamp ).add( newDate, "years" );
      setDate( newDate.unix() );
    }
    
  };
  
  const notHovering = ( e ) => {
    console.log( "the mouse has ran away" );
    if( hovering.current ){
      window.removeEventListener( "click", onScroll );
    }
  };
  
  const hoveringDropDown = ( e ) => {
    if( !hovering.current ){
      hovering.current = true;
      window.addEventListener( "wheel", onScroll );
    }
  };
  
  const onScroll = ( e ) => {
    if( scrolling.current ){
      return;
    }
    scrolling.current = true;
    
    if( !hovering.current ){
      console.log( "something is fishy" );
      return;
    }
    
    if( checkScrollDirectionIsUp( e ) ){
      
      currentYear.current = currentYear.current + 1;
      yearDropDown.classList.add( "scroll-up" );
      window.setTimeout( () => {
        yearDropDown.classList.remove( "scroll-up" );
        setYears();
        scrolling.current = false;
      }, 100 );
    }else{
      currentYear.current = currentYear.current - 1;
      yearDropDown.classList.add( "scroll-down" );
      window.setTimeout( () => {
        yearDropDown.classList.remove( "scroll-down" );
        setYears();
        scrolling.current = false;
      }, 100 );
    }
  };
  
  function checkScrollDirectionIsUp( event ){
    if( event.wheelDelta ){
      return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
  }
  
  useEffect( () => {
    
    if( timeStamp && yearText ){
      const currentText = yearText.firstChild.textContent;
      const newYear = moment.unix( timeStamp ).format( "YYYY" );
      if( currentText !== newYear ){
        yearText.firstChild.textContent = newYear;
      }
      
    }
  }, [ timeStamp, yearText ] );
  
  useEffect( () => {
    if( hoverBackground ){
      hoverBackground.classList.add( "hover-glow" );
      hoverBackground.addEventListener( "click", dropDownClicked );
    }
    if( yearText ){
      yearText.addEventListener( "click", dropDownClicked );
    }
  }, [ hoverBackground, yearText ] );
  
  const dropDownClicked = ( e ) => {
    timeOpened.current = moment( moment.now() );
    setOpen( open => !open );
    hoveringDropDown( e );
    window.addEventListener( "click", onBackgroundClick );
    
  };
  
  const onBackgroundClick = ( event ) => {
    debugger;
    if( timeOpened ){
      const diff = timeOpened.current.diff( moment.now() );
      console.log( diff );
      event.preventDefault();
      event.stopPropagation();
      
      if( diff < -1000 ){
        window.removeEventListener( "click", onBackgroundClick );
        setOpen( false );
      }
    }
    
  };
  
  useEffect( () => {
    if( yearDropDown ){
      if( open ){
        yearDropDown.classList.remove( "slide-right" );
        yearDropDown.classList.remove( "hide" );
        yearDropDown.classList.add( "slide-left" );
      }else{
        yearDropDown.classList.add( "slide-right" );
        yearDropDown.classList.remove( "slide-left" );
        window.setTimeout( () => {
          yearDropDown.classList.add( "hide" );
        }, 500 );
      }
    }
  }, [ open ] );
  
  return [];
};