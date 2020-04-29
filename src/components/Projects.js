import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Projects() {
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('')
    const URL = `https://training-management-backend.herokuapp.com/projects/?Name_contains=${search}`
    const getProjects = async () => {
        setIsLoading(true);
        try {
            const projs = await axios.get(URL)
            setProjects(projs.data)
        } catch (e) {
            console.log("error")
        }
        setIsLoading(false);
    }

    const searchUrl = `https://training-management-backend.herokuapp.com/projects/`

    const getQueryProjects = async () => {
        setIsLoading(true);
        try {
            const projs = await axios.get(URL)
            setProjects(projs.data)
        } catch (e) {
            console.log("error")
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getProjects()
    }, [])

    useEffect(() => {
        getQueryProjects()
    }, [search])

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
                                            <a href={step.files.url}>View File</a> : <div>No file uploaded</div>
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
            <input className="input is-rounded" type="text" placeholder="Search Projects" onChange={e => setSearch(e.target.value)}></input>
            {isLoading ? (
                <div className="main-body">loading...</div>
            ) : (
                    <div>{listProjects}</div>

                )}
        </div>
    )
}
