import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Projects() {
    const [projects, setProjects] = useState([])
    const URL = 'https://training-management-backend.herokuapp.com/projects/'
    const getProjects = async () => {
        const projs = await axios.get(URL)
        setProjects(projs.data)
    }

    useEffect(() => {
        getProjects()
    }, [])

    const listProjects = projects.map(project => (
        <div className="card" key={project.id}>
            <header className="card-header">
                <p className="card-header-title">{project.Name}</p>
            </header>
            <div className="card-content">
                <div className="content">
                    {project.Description}
                </div>
                <div className="steps">
                    {project.Steps.map(step => (
                        <div className="card" key={step.id} >
                            <div className="card-content">
                                <p className="title">
                                    {step.Title}
                                </p>
                                <footer className="card-footer">
                                    <p id={step.Status} className="card-footer-item">
                                        <span>
                                            {step.Status}
                                        </span>
                                    </p>
                                    <div className="card-footer-item">
                                        {step.files ?
                                            <a href={`https://training-management-backend.herokuapp.com${step.files.url}`}>View File</a> : <div>No file uploaded</div>
                                        }
                                    </div>
                                </footer>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ))

    return (
        <div className="container">
            <input className="input is-rounded" type="text" placeholder="Rounded input"></input>
            {listProjects}
        </div>
    )
}
