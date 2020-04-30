import React, { useState, useEffect } from 'react';

const client = require("contentful").createClient({
    accessToken: "qEYl0Cr9DXuoJmSHNl_bikN-QxDQfg8K49mChfz8Wpc",
    environment: 'master',
    space: "1cvzi7txphx1"
});

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [modal, setModal] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [singleStepTitle, setSingleStepTitle] = useState('')
    const [singleStepStatus, setSingleStepStatus] = useState('')
    const [singleStepUrl, setSingleStepUrl] = useState('')

    const showModal = async (entry) => {
        setIsLoading(true);
        setModal('is-active')
        try {
            const step = await client.getEntries({
                content_type: 'steps',
                'sys.id': entry
            })
            setSingleStepTitle(step.items[0].fields.steptitle)
            setSingleStepStatus(step.items[0].fields.status)
            if (step.items[0].fields.file) {
                setSingleStepUrl(step.items[0].fields.file.fields.file.url)
            } else {
                setSingleStepUrl('')
            }

            setIsLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

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
                    <p>{project.fields.description}</p>
                    <br />
                </div>
                <div className="steps">
                    {project.fields.steps ?
                        <div>{project.fields.steps.map((step, index) => (
                            <button id={step.fields.status} className="button" onClick={e => showModal(step.sys.id)} key={index}>{index + 1}. {step.fields.steptitle}</button>
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
            <div className={`modal ${modal}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    {!isLoading ? (
                        <div className="card-content">
                            <h1>Step title : {singleStepTitle}</h1>
                            <p>Step Status : {singleStepStatus}</p>
                            {singleStepUrl !== '' ? (
                                <a className="button" href={singleStepUrl} rel="noopener noreferrer" target="_blank">View File</a>
                            ) : (
                                    <h1>no file uploaded</h1>
                                )}
                        </div>
                    ) : (
                            <h6>Loading</h6>
                        )}
                </div>
                <button className="modal-close is-large" onClick={() => setModal('')}></button>
            </div>
        </div>
    )
}