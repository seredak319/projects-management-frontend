import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './MyProject.css';
import { useSelector } from "react-redux";

const MyProject = () => {
    const [project, setProject] = useState(null);
    let userId = useSelector((state) => state.auth.userId)

    const handleUnchooseButton = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:8080/cancel/${projectId}?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setProject(null);
        } catch (error) {
            console.error('Error choosing project:', error);
        }
    }

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:8080/getMyProject?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }


                    const data = await response.json();
                    setProject(data);
                    console.log("Poprawnie pobrano mój projekt")

                console.log(response.data)
            } catch (error) {
                console.log('Not found');
            }
        };

        fetchProject();
    }, []);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }

    return (
        <div className="my-project-page">
            <h1>Your Chosen Project</h1>
            <div className="my-project-container">
                {project ? (
                    <div className="my-project-tile">
                        <h2>{project.title}</h2>
                        <p>{project.text}</p>
                        <p>Project selection date: {formatTimestamp(project.timestamp)}</p>
                        <button type='button' className="btn-active1" onClick={() => handleUnchooseButton(project.id)}>Cancel</button>
                    </div>
                ) : (
                    <div className="no-project">
                        <p>You haven't chosen any project yet.</p>
                        <Link to="/projects" className="choose-project-btn">Choose a Project</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProject;
