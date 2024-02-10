import React, { useState, useEffect } from 'react';
import './Projects.css';
import {useSelector} from "react-redux";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    let userId = useSelector((state) => state.auth.userId)

    const handleChooseButton = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:8080/${projectId}?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const response2 = await fetch('http://localhost:8080/getAll');
            if (!response2.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response2.json();
            setProjects(data);
        } catch (error) {
            console.error('Error choosing project:', error);
        }
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8080/getAll');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="projects-container">
            <table className="projects-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => (
                    <tr key={project.id}>
                        <td>{project.title}</td>
                        <td>{project.text}</td>
                        <td>{project.isActive ? 'Active' : 'Inactive'}</td>
                        <td>
                            <button type='button' className={project.isActive ? 'btn-active' : 'btn-inactive'} onClick={() => handleChooseButton(project.id)}>Choose</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Projects;
