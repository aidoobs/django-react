import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProfileCard from './components/ProfileCard'
import ProfileCard2 from './components/ProfileCard2'
import ProfileCard3 from './components/ProfileCard3'
import ProfileCardForm from './components/ProfileCardForm'
import { useLocation } from 'react-router-dom'
import LoadingComp from './components/LoadingComp'
import './style/ConfigStyle.css'



export default function ConfigProfileCard() {
    const [profileData, setprofileData] = useState(null)
    const [loading, setloading] = useState(true)
    const [loadtext, setloadtext] = useState("Loading..")
    const [template, settemplate] = useState('#template1')
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(prev => !prev)
    }
    useEffect(() => {
        let userId = location.state;
        if (userId === undefined || userId === null) {
            userId = 9;
        }
        else {
            userId = userId.userId
        }
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
        axios.get(`create-resume/?User_id=${userId}`)
            .then((resp) => {
                //console.log(resp);
                //console.log(resp.headers)
                return resp.data;
            })
            .then((data) => {
                console.log(data)
                setprofileData(data.data);
                setloading(false);

            })
            .catch((err) => {
                setloadtext("Error in fetching data");
                console.log(err);
            })
    }, [showModal]);
    function ShowProfileCard() {
        switch (template) {
            case '#template1': return <ProfileCard data={profileData} />
            case '#template2': return <ProfileCard2 data={profileData} />
            case '#template3': return <ProfileCard3 data={profileData} />
            default:
                return <ProfileCard data={profileData} />

        }
    }
    //console.log(location.state.userId);
    return (
        <div className="config-container">
            <div className="config-left-side">
                {loading ? (<div><h1>{<LoadingComp width="100px" color="indigo" strokeWidth="10px" />}</h1></div>) : (<div><ShowProfileCard />
                    <div className="config-update-btn">
                        Save Profile Card
                    </div>
                    <div onClick={openModal} className="config-update-btn">
                        Configure Profile Card
                    </div>
                    <div>{<ProfileCardForm show={showModal} setShowModal={setShowModal} data={profileData} />}</div>
                </div>)}
            </div>
            <div className="config-right-side">
                <h3>Select Template</h3>
                <div onClick={() => {
                    settemplate("#template1");
                }} className="config-right-side-select">
                    <ProfileCard />
                </div>
                <div onClick={() => {
                    settemplate("#template2")
                }} className="config-right-side-select">
                    <ProfileCard2 />
                </div>
                <div onClick={() => {
                    settemplate("#template3")
                }} className="config-right-side-select">
                    <ProfileCard3 />
                </div>

            </div>
        </div>
    )
}
