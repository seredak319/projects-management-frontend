import React, { useState } from 'react';
import './AddProject.css';
import {useNavigate} from "react-router-dom";

const AddProject = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:8080/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, text})
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate('/projects')
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleCancel = () => {
        setTitle('')
        setText('')
    };

    return (
        <div className="add-project-page">
            <div className="add-pro">
                <h1>Add Project</h1>
                <div className="add-project-container">
                    <div className="input-group">
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Description:</label>
                        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    </div>
                    <div className="button-group">
                        <button className="save-btn" onClick={handleSave}>Save</button>
                        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
