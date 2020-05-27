import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HexMenu from "../svgComponents/HexMenu.js";
/**
 * @typedef {Anime} anime
 */
import anime from "animejs";

/**
 *   Morph
 *
 *  @component
 *
 */
const Morph = ( props ) => {
  
  return ( <Container>
    <HexMenu/>
  </Container> );
};

const Container = styled.div`
height: 100%;
min-height: 100vh;
width: 100%;

`;

Morph.propTypes = {};

export default Morph;