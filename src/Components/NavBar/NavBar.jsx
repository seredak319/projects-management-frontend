import React, {useState} from "react";
import {Nav, Navbar, NavbarBrand} from "reactstrap";
import {NavLink, useNavigate} from "react-router-dom";
import './NavBar.css'

export const NavBar = () => {

  let [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const style = ({isActive}) => ({
    fontWeight: isActive ? 'bold' : 'normal',
  });

  const handleLogIn = () => {
    // keycloak.login()
    setIsAuthenticated(true)
  }

  const handleLogOut = () => {
    // keycloak.logout()
    setIsAuthenticated(false)
  }

  return (
      <Navbar color="dark" dark expand="md">
        <Nav>
          <NavbarBrand tag={NavLink} to="/" style={style}>Home</NavbarBrand>
          <NavbarBrand tag={NavLink} to="/projects" style={style}>Projects</NavbarBrand>
          <NavbarBrand tag={NavLink} to="/my-project" style={style}>My Project</NavbarBrand>
          {!isAuthenticated && (
              <NavbarBrand tag={NavLink} to="/login" onClick={handleLogIn}>
                Login
              </NavbarBrand>
          )}
          {isAuthenticated && (
              <NavbarBrand tag={NavLink} to="/Logout" onClick={handleLogOut} style={{right:0}}>
                Logout
              </NavbarBrand>
          )}
        </Nav>
      </Navbar>
  );
}
