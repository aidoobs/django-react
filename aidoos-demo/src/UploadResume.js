import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './style/UploadPage.css'
import LoadingComp from './components/LoadingComp';

export default function UploadResume() {
    const [filedata, setfiledata] = useState({});
    const ref = useRef();
    const [loading, setloading] = useState(false);
    const history = useHistory();
    console.log(ref.current);
    function handleFile(e) {
        //console.log(e.target);
        setfiledata(e.target.files[0])
    }
    function focus() {
        console.log(ref.current);
        //ref.current.click();
        ref.current.focus();
    }
    //console.log(filedata);
    function handleUpload() {
        setloading(true);

        let data = new FormData();
        data.append('file', filedata);
        let config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/upload',
            /*headers: { 
                ...data.getHeaders()
                ,*/
            data: data
        };

        axios(config)
            .then(function (response) {
                setloading(false);
                const profile_id = response.data.data;
                //console.log(profile_id);
                history.push({
                    pathname: '/config-profile-card',
                    state: { userId: profile_id }
                })
                //console.log(response.data);
            })
            .catch(function (error) {

                console.log(error);
            });
    }
    return (
        <div className="upload-container">
            <div>
                <h3>Upload Resume</h3>
                <div className="upload-drop-section">
                    <label for="files">Upload File By Clicking on this Section</label>
                    <input type="file" id="files" onChange={handleFile} ref={ref} />
                </div>
                <div className="upload-resume-btn">{loading ? (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2%" }}>
                    <LoadingComp width="10px" color="white" strokeWidth="4px" />
                    <span>Extracting Resume...</span>
                </div>) : (<button onClick={handleUpload}>Send</button>)}</div>
            </div>
            <button onClick={focus}>focus</button>
        </div>
    )
}
