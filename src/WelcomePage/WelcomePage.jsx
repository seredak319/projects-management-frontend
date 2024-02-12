import React, { useState, useEffect } from 'react';
import shareIcon from './img/checked.png';
import lockIcon from './img/clipboard.png';
import userIcon from './img/user.png';
import folderIcon from './img/folders.png';

import './WelcomePage.css';
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

const WelcomePage = () => {
    const [adminInfo, setAdminInfo] = useState(null);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    useEffect(() => {
        const fetchAdminInfo = async () => {
            try {
                const response = await fetch('http://localhost:8080/getAdminInfo');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data)
                setAdminInfo(data);
            } catch (error) {
                console.error('Error fetching admin info:', error);
            }
        };

        fetchAdminInfo();
    }, []);

    return (
        <div className="welcome-container">
            {isAdmin ? (
                adminInfo && (
                    <>
                        <h2 className="welcome-heading">Admin management website</h2>
                        <p className="welcome-description">Your place to keep things organized!</p>
                        <div className="admin-tables-container">
                            <div className="admin-table">
                                <div className="feature-item">
                                    <img src={userIcon} alt="Encrypt" className="feature-icon"/>
                                </div>
                                <h3>Users</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Email</th>
                                        <th>Project</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {adminInfo.users.map(user => (
                                        <tr key={user.userId} className={!user.project ? '' : 'inactive_user'}>
                                            <td>{user.userId}</td>
                                            <td>{user.email}</td>
                                            <td>{user.project ? user.project.title : 'No Project'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="admin-table">
                                <div className="feature-item">
                                    <img src={folderIcon} alt="Encrypt" className="feature-icon"/>
                                </div>
                                <h3>Projects</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Project ID</th>
                                        <th>Title</th>
                                        <th>Text</th>
                                        <th>Active</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {adminInfo.projects.map(project => (
                                        <tr key={project.id} className={project.isActive ? '' : 'inactive'}>
                                            <td>{project.id}</td>
                                            <td>{project.title}</td>
                                            <td>{project.text}</td>
                                            <td>{project.isActive ? 'Yes' : 'No'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )
            ) :  (
                <div className="welcome-container">
                    <h2 className="welcome-heading">Welcome to website for signing up for projects</h2>
                    <p className="welcome-description">Your place to keep things organized!</p>
                    <div className="feature-list">
                        <div className="feature-item">
                            <img src={lockIcon} alt="Encrypt" className="feature-icon"/>
                            <p>See projects</p>
                        </div>
                        <div className="feature-item">
                            <img src={shareIcon} alt="Share" className="feature-icon"/>
                            <p>Sign up for project</p>
                        </div>
                    </div>
                    <Link to="/projects" className="link">
                        <button className="btn2">Let's see the projects!</button>
                    </Link>
                </div>
            )}
        </div>
    );
};


    export default WelcomePage;
