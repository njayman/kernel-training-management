import React, { useState, useEffect } from 'react';
import axios from 'axios';

const client = require("contentful").createClient({
    accessToken: "qEYl0Cr9DXuoJmSHNl_bikN-QxDQfg8K49mChfz8Wpc",
    space: "1cvzi7txphx1"
});

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('')
    const getProjects = async () => {
        setIsLoading(true);
        try {
            const projs = await client.getEntries({
                content_type: "projects"
            })
            setProjects(projs.items)
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false);
    }




    useEffect(() => {
        getProjects()
    }, [])


    const listProjects = projects.map((project, index) => (
        <div className="card" key={index}>
            <header className="card-header">
                <p className="card-header-title">{project.fields.name}</p>
            </header>
            <div className="card-content">
                <div className="content">
                    {project.fields.description}
                </div>
                <div className="steps">
                    {project.fields.steps ?
                        <div>{project.fields.steps.map((step, index) => (
                            <div className="card" key={index} >
                                <div className="card-content">
                                    <p className="title">
                                        {step.fields.steptitle}
                                    </p>
                                    <footer className="card-footer">
                                        <p id={step.fields.status} className="card-footer-item">
                                            <span>
                                                {step.fields.status}
                                            </span>
                                        </p>
                                        <div className="card-footer-item">
                                            {step.fields.file ?
                                                <a key={index} target="_blank" href={step.fields.file.fields.file.url}>View File</a> : <div>No file uploaded</div>
                                            }
                                        </div>
                                    </footer>
                                </div>
                            </div>
                        ))}</div> : <div>No Steps added</div>
                    }
                </div>
            </div>
        </div>
    ))

    return (
        <div className="container">
            {/*<input className="input is-rounded" type="text" placeholder="Search Projects" onChange={e => setSearch(e.target.value)}></input>*/}
            {isLoading ? (
                <div className="main-body"><h1>loading...</h1></div>
            ) : (
                    <div>{listProjects}</div>

                )}
        </div>
    )
}
