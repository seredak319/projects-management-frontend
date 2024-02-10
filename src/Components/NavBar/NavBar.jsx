import React, {useState} from "react";
import {Nav, Navbar, NavbarBrand} from "reactstrap";
import {NavLink} from "react-router-dom";
import './NavBar.css'
import {useDispatch, useSelector} from "react-redux";
import {setLogout} from "../../features/auth/authSlice";

export const NavBar = () => {
    const dispatch = useDispatch();

    let username = useSelector((state) => state.auth.username)
    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const style = ({isActive}) => ({
        fontWeight: isActive ? 'bold' : 'normal',
    });

    const handleLogOut = () => {
        dispatch(setLogout());
    }

    return (
        <Navbar color="dark" dark expand="md">
            <Nav>
                <NavbarBrand tag={NavLink} to="/" style={style}>Home</NavbarBrand>
                <NavbarBrand tag={NavLink} to="/projects" style={style}>Projects</NavbarBrand>
                <NavbarBrand tag={NavLink} to="/my-project" style={style}>My Project</NavbarBrand>
                {!isAuthenticated && (
                    <NavbarBrand tag={NavLink} to="/login">
                        Login
                    </NavbarBrand>
                )}
                {isAuthenticated && (
                    <NavbarBrand tag={NavLink} to="/Logout" onClick={handleLogOut} style={{right: 0}}>
                        Logout
                    </NavbarBrand>
                )}
                <NavbarBrand>
                    {username}
                </NavbarBrand>
            </Nav>
        </Navbar>
    );
}
