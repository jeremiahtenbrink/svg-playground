import React, { useEffect, useState } from "react";

/**
 *
 * @param {string} cssSelector
 * @return {HTMLElement} el
 */
export const useElement = ( cssSelector ) => {
  const [ el, setEl ] = useState();
  
  useEffect( () => {
    try{
      const el = document.querySelector( cssSelector );
      if( el ){
        setEl( el );
      }else{
        console.error( "Could not find element in the dome: " + cssSelector );
      }
    }catch( e ){
      console.error( e.message );
    }
    
  }, [] );
  
  return el;
};