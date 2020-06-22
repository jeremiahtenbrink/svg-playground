import React, { useEffect } from "react";
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
import GraphView from "./views/GraphView.js";
import Infograph from "./svgComponents/Infograph.js";
import SvgLoaders from "./views/SVGLoaders";

const LandingWithBackground = withBackground( LandingPage );

function App( props ){
  const history = useHistory();
  
  return ( <AppContainer className="App">
    
    <NavBar history={ history }/>
    <Switch>
      <Route path={ "/text-path" } component={ TextPathView }/>
      <Route path={ "/svgs-n-react" } component={ SvgsAndReact }/>
      <Route path={ "/morph" } component={ Morph }/>
      <Route path={ "/smil" } component={ SmilAnimations }/>
      <Route path={ "/calendar" } component={ CalendarView }/>
      <Route path={ "/graph" } component={ GraphView }/>
      <Route path={ "/svg-loaders" } component={ SvgLoaders }/>
      <Route exact path={ "/" }
             render={ ( props ) => <LandingWithBackground { ...props } /> }/>
      <Route path={ "/info-graph" } component={ Infograph }/>
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
