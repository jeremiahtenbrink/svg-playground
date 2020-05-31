import React from "react";
import { Menu } from "antd";

const { SubMenu } = Menu;

class NavBar extends React.Component{
  
  constructor( props ){
    super( props );
    console.log( props.history );
    if( this.props.history.location.pathname === "/calendar" ){
      this.state = { theme: "dark" };
    }else{
      this.state = { theme: "light" };
    }
    
  }
  
  componentDidUpdate( prevProps, prevState, snapshot ){
    if( prevProps.history.location.pathname !==
      this.props.history.location.pathname ){
      if( this.props.history.pathname === "/calendar" ){
        this.setState( { theme: "dark" } );
      }
      
    }
  }
  
  handleClick = e => {
    this.props.history.push( "/calendar" );
  };
  
  render(){
    return ( <Menu
      onClick={ this.handleClick }
      style={ { width: 256 } }
      defaultSelectedKeys={ [ "1" ] }
      mode="inline"
      theme={ this.state.theme }
    >
      <Menu.Item key="1">Home</Menu.Item>
      <Menu.Item key="2">Calendar</Menu.Item>
      <Menu.Item key="3">SMILL</Menu.Item>
      <Menu.Item key="4">Morph</Menu.Item>
      <Menu.Item key="5">SVGs N React</Menu.Item>
      <Menu.Item key="6">Text Path</Menu.Item>
    
    </Menu> );
  }
}

export default NavBar;