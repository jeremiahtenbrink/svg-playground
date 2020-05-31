import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

class NavBar extends React.Component{
  
  constructor( props ){
    super( props );
    
    this.state = {
      keys: {
        [ "/calendar" ]: "2",
        [ "/" ]: "1",
        [ "/smil" ]: "3",
        [ "/morph" ]: "4",
        [ "/svgs-n-react" ]: "5",
        [ "/text-path" ]: "6",
      },
      themeLight: [ "/", "/text-path" ],
      themeDark: [ "/smil", "/calendar", "/morph", "/svgs-n-react" ],
    };
    
  }
  
  handleClick = e => {
  
  };
  
  render(){
    return ( <Menu
      onClick={ this.handleClick }
      style={ { width: 256 } }
      selectedKeys={ this.state.keys[ this.props.history.location.pathname ] }
      mode="inline"
      theme={ this.state.themeLight.includes( this.props.history.location.pathname ) ?
        "light" : "dark" }
    >
      <Menu.Item key="1"><Link to={ "/" }>Home</Link></Menu.Item>
      <Menu.Item key="2"><Link to={ "/calendar" }>Calendar</Link></Menu.Item>
      <Menu.Item key="3"><Link to={ "/smil" }>SMIL</Link></Menu.Item>
      <Menu.Item key="4"><Link to={ "/morph" }>Morph</Link></Menu.Item>
      <Menu.Item key="5"><Link to={ "/svgs-n-react" }>SVGs N
        React</Link></Menu.Item>
      <Menu.Item key="6"><Link to={ "/text-path" }>Text Path</Link></Menu.Item>
    
    </Menu> );
  }
}

export default NavBar;