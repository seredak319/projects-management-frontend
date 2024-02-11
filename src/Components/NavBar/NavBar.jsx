import React, {useState} from "react";
import {Nav, Navbar, NavbarBrand} from "reactstrap";
import {NavLink, useNavigate} from "react-router-dom";
import './NavBar.css'
import {useDispatch, useSelector} from "react-redux";
import {setLogout} from "../../features/auth/authSlice";

export const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let username = useSelector((state) => state.auth.username)
    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    let isAdmin = useSelector((state) => state.auth.isAdmin)

    const style = ({isActive}) => ({
        fontWeight: isActive ? 'bold' : 'normal',
    });

    const handleLogOut = () => {
        dispatch(setLogout());
        navigate("/")
    }

    return (
        <>
            <Navbar color="dark" dark expand="md">
                <Nav>
                    <NavbarBrand tag={NavLink} to="/" style={style}>Home</NavbarBrand>
                    <NavbarBrand tag={NavLink} to="/projects" style={style}>Projects</NavbarBrand>
                    {isAdmin ? <NavbarBrand tag={NavLink} to="/add-project" style={style}>Add Project</NavbarBrand> : <NavbarBrand tag={NavLink} to="/my-project" style={style}>My Project</NavbarBrand>}

                    {!isAuthenticated && (
                        <div>
                            <NavbarBrand tag={NavLink} to="/login">
                                Login
                            </NavbarBrand>
                            <NavbarBrand tag={NavLink} to="/register">
                                Register
                            </NavbarBrand></div>
                    )}
                    {isAuthenticated && (
                        <NavbarBrand tag={NavLink} to="/" onClick={handleLogOut} style={{right: 0}}>
                            Logout
                        </NavbarBrand>
                    )}
                    <NavbarBrand>
                        {username}
                    </NavbarBrand>
                </Nav>
            </Navbar>
            {isAdmin ? <div className="admin">
                <>Admin mode</>
            </div> : <></>}


        </>
    );
}
