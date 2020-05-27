import anime from "animejs";

export const addClass = ( el, className, recursive = true ) => {
  if( recursive ){
    if( el.hasChildNodes ){
      el.childNodes.forEach( child => {
        addClass( child, className );
      } );
    }
  }
  
  el.classList.add( className );
};

export const removeClassName = ( el, className, recursion = true ) => {
  if( recursion ){
    if( el.hasChildNodes ){
      el.childNodes.forEach( child => {
        removeClassName( child, className );
      } );
    }
  }
  
  el.classList.remove( className );
};

export function getMorphAnimation( targets, dArray, duration = 1000,
  loop = false, endDelay = 1000 ){
  return anime( {
    targets: targets,
    d: dArray.map( dataString => ( { value: [ dataString ] } ) ),
    autoplay: false,
    loop: loop,
    duration: duration,
    easing: "linear",
    direction: "forward",
    endDelay: endDelay,
  } );
  
}
