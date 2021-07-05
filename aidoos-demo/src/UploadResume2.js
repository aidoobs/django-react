import React, { useState, useRef } from 'react'
import axios from 'axios'
import Navbar from './Navbar.js'
import LoadingComp from './components/LoadingComp.js'
import { useHistory } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import './style/upload_resume_2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

const captchakey="6Lcf2VYbAAAAAIoqcIQO1j8imfEk6U9LBjJPfEdW";
const captchakey_secret="6Lcf2VYbAAAAADtMXt3XUUBwbKPkHz74tHVd8vDf";
export default function UploadResume2() {
    const upload_ref = useRef();
    const captcha_ref=useRef();
    const [loading, setloading] = useState(false);
    const [filedata, setfiledata] = useState(null);
    const [uploaded, setuploaded] = useState(false);
    const [errormsg, seterrormsg] = useState(false)
    const [captcha, setcaptcha] = useState(null);
    const history = useHistory();
    const [resp, setresp] = useState(true);
    const handleChange = (e) => {
        setfiledata(e.target.files[0]);
    }
    const handleUpload = () => {
        upload_ref.current.click();
    }
    const onChangeCaptcha=(value)=>{
        setcaptcha(value);
        seterrormsg(false);
        console.log(value);
    }
    const uploadResume = () => {
        //console.log(filedata.name + " is send to the server")
        if(captcha===null)
        {
            console.log("Captcha is wrong");
            seterrormsg(true);
            return
        }
        else{
        setloading(true);
        
        let data = new FormData();
        data.append('file', filedata);
        let config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/upload',
            data: data
        };

        axios(config)
            .then(function (response) {
                setloading(false);
                const profile_id = response.data.data;
                //console.log(profile_id);
                history.push({
                    pathname: '/dashboard',
                    state: { userId: profile_id }
                })
                console.log(response.data);
            })
            .catch(function (error) {

                console.log(error);
            });
        seterrormsg(false);
        }
    }
    return (
        <div>
            <Navbar />
            <div className="upload-container-2">
                <h3 style={{ textAlign: 'left', color: "#333" }}>New to Aidoos Upload your resume.</h3>
                <input type="file" id="files" hidden="true" ref={upload_ref} onChange={handleChange} />
                <div>{filedata === null ?
                    (<div className="upload-container-box">
                        <div>
                            No File is Selected
                        </div>
                        <div>
                            <div className="upload-button" onClick={handleUpload}><FontAwesomeIcon icon={faPlus} style={{margin:"0 10px"}}/>Add File</div>
                        </div>
                    </div>) : (<div><div className="upload-container-box">
                        <div>
                            File selected  {filedata.name}
                        </div>
                        <div>
                            <span className="upload-button" onClick={handleUpload}>Change</span>
                        <span className="upload-button alt" onClick={uploadResume}>Upload</span>
                        </div>
                    </div>
                    <ReCAPTCHA ref={captcha_ref} sitekey={captchakey} onChange={onChangeCaptcha} size="normal"/>
                    </div>)}
                    
                </div>
                {/*uploaded ? (<div className="upload-message-box green">
                    {resp ? (<span>Your Resume Succesfully uploaded and send for review.</span>) :
                        (<span>Resume with email ashun4762@gmail.com already present in database)</span>)}
                </div>) : null}
                {errormsg?(<div className="upload-message-box red">
                    <span>Fill the captcha before submitting.</span>
                    </div>):(null)*/}
                <div>
                    {loading?(<div className="">
                            {!resp?(<div className="upload-message-box green">
                                <span>Resume with this email and phone number is already present.</span>
                            </div>):(<div style={{display:'flex',gap:"5%",padding:"2%",justifyContent:"center"}}>
                                <LoadingComp width="20px" color="indigo" strokeWidth="5px"/>
                                <span>Extracting data from resume</span>
                            </div>)}
                        </div>):null}
                    {errormsg?(<div className="upload-message-box red">
                    <span>Fill the captcha before submitting.</span>
                </div>):(null)}
                </div>
            </div>
        </div>
    )
}
