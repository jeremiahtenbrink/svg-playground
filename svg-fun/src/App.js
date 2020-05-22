import React from "react";
import { Route, Switch } from "react-router-dom";
import IconsOnPath from "./views/IconsOnPath.js";
import LandingPage from "./views/LandingPage.js";
import TextPathView from "./views/TextPathView.js";
import Morph from "./views/Morph.js";
import styled from "styled-components";
import SmilAnimations from "./views/SmilAnimations.js";
import { withBackground } from "./views/withBackground.js";

const LandingWithBackground = withBackground( LandingPage );

function App(){
  return ( <AppContainer className="App">
    
    <Switch>
      <Route path={ "/icons-along-path" } component={ IconsOnPath }/>
      <Route path={ "/text-path" } component={ TextPathView }/>
      <Route exact path={ "/morph" } component={ Morph }/>
      <Route exact path={ "/smil" } component={ SmilAnimations }/>
      <Route exact path={ "/" }
             render={ ( props ) => <LandingWithBackground { ...props } /> }/>
    
    </Switch>
  
  </AppContainer> );
}

export default App;

const AppContainer = styled.div`
display: flex;

`;
