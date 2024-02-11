import React, {useEffect, useState} from 'react';
import './Projects.css';
import {useSelector} from "react-redux";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null); // State to manage editing project
    const userId = useSelector((state) => state.auth.userId);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

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

    useEffect(() => {
        fetchProjects();
    }, []);

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
            fetchProjects();
        } catch (error) {
            console.error('Error choosing project:', error);
        }
    };

    const handleDeleteButton = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:8080/delete/${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleEditButton = (project) => {
        setEditingProject(project); // Set the editing project when "Edit" is clicked
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/edit/${editingProject.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editingProject) // Send the updated project data
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchProjects();
            setEditingProject(null); // Reset editing state after saving
        } catch (error) {
            console.error('Error editing project:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingProject(null); // Cancel the edit and reset editing state
    };

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
                            {!isAdmin && (
                                <button type='button' className={project.isActive ? 'btn-active' : 'btn-inactive'}
                                        onClick={() => handleChooseButton(project.id)}>Choose</button>
                            )}
                            {isAdmin && (
                                <>
                                    <button type='button'
                                            className={project.isActive ? 'btn-active-edit' : 'btn-inactive'}
                                            onClick={() => handleEditButton(project)}>Edit
                                    </button>
                                    <button type='button'
                                            className={project.isActive ? 'btn-active-delete' : 'btn-inactive'}
                                            onClick={() => handleDeleteButton(project.id)}>Delete
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {editingProject && (
                <div className="edit-form">
                    <h2 style={{marginLeft: "9rem"}}>Editing window</h2>
                    <input value={editingProject.title}
                           onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}/>
                    <textarea value={editingProject.text}
                              onChange={(e) => setEditingProject({...editingProject, text: e.target.value})}></textarea>
                    <div className="buttons-container">
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
