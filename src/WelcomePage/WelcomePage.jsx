import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import { useSelector } from "react-redux";

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
                setAdminInfo(data);
            } catch (error) {
                console.error('Error fetching admin info:', error);
            }
        };

        fetchAdminInfo();
    }, []);

    return (
        <div className="welcome-container">
            {isAdmin && adminInfo && (
                <>
                    <h2 className="welcome-heading">Admin management website</h2>
                    <p className="welcome-description">Your place to keep things organized!</p>
                    <div className="admin-tables-container">
                        <div className="admin-table">
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
                                    <tr key={user.userId}>
                                        <td>{user.userId}</td>
                                        <td>{user.email}</td>
                                        <td>{user.project ? user.project.title : 'No Project'}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="admin-table">
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
            )}
        </div>
    );
};

export default WelcomePage;
