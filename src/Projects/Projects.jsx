import React, { useState, useEffect } from 'react';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8080/getAll');
                console.log(response)
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
            {projects.map((project) => (
                <div key={project.id} className="project-tile">
                    <h2>{project.title}</h2>
                    <p>{project.text}</p>
                    <p>{project.isActive ? 'Active' : 'Inactive'}</p>
                </div>
            ))}
        </div>
    );
};

export default Projects;
