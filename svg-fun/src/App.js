import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import LandingPage from "./views/LandingPage.js";
import TextPathView from "./views/TextPathView.js";
import Morph from "./views/Morph.js";
import styled from "styled-components";
import SmilAnimations from "./views/SmilAnimations.js";
import { withBackground } from "./views/withBackground.js";
import SvgsAndReact from "./views/SvgsAndReact.js";
import CalendarView from "./views/CalendarView.js";
import NavBar from "./components/NavBar.js";

const LandingWithBackground = withBackground( LandingPage );

function App( props ){
  const history = useHistory();
  
  return ( <AppContainer className="App">
    
    
    <NavBar history={ history }/>
    <Switch>
      <Route path={ "/text-path" } component={ TextPathView }/>
      <Route path={ "/svgs-n-react" } component={ SvgsAndReact }/>
      <Route exact path={ "/morph" } component={ Morph }/>
      <Route exact path={ "/smil" } component={ SmilAnimations }/>
      <Route exact path={ "/calendar" } component={ CalendarView }/>
      <Route exact path={ "/" }
             render={ ( props ) => <LandingWithBackground { ...props } /> }/>
    </Switch>
  
  </AppContainer> );
}

export default App;

const AppContainer = styled.div`
max-width: 100vw;
max-height: 100vh;
display: flex;
overflow: hidden;
`;
