import React, { useEffect,useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import ProfileCard from './components/ProfileCard'
import ShareCardModal from './components/ShareCardModal'
import './style/Dashboard.css'
import TaskCard from './components/TaskCard'
import PasswordForm from './components/PasswordForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCogs,faShareSquare,faUsers
} from '@fortawesome/free-solid-svg-icons'
export default function Dashboard() {
    const location = useLocation();
    const [profileData, setprofileData] = useState(null);
    const [loading,setloading]=useState(true);
    const [showsharemodal,setshowsharemodal]=useState(false);
    const history=useHistory();
    useEffect(()=>{
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
                //setloadtext("Error in fetching data");
                console.log(err);
            })
    },[])
    const GotoResume=()=>{
        history.push({pathname:"/resume"})
    }
    const GotoConfig=()=>{
        history.push({pathname:"/config-profile-card"})
    }
    const openShareModal = () => {
        setshowsharemodal(prev => !prev)
    }
    return (
        <div>
            <Navbar/>
            {/*<h4 style={{color:"#333"}}>Hey,Complete this steps to get most of aidoos</h4>*/}
            <div className="dashboard-top-section">
               <div className="d-t-s-left"> 
                    <div>
                   {loading ?null: <ProfileCard data={profileData} onClick={GotoResume}/>}
                     </div>
                <div style={{alignSelf:"flex-end"}}>
                     <div className="dashboard-info-box">
                     <FontAwesomeIcon icon={faUsers}/>      Invite Friends
                     </div>
                     <div className="dashboard-info-box" onClick={GotoConfig}>
                         <FontAwesomeIcon icon={faCogs}/>Configure Profile Card
                     </div>
                     <div className="dashboard-info-box" onClick={openShareModal}>
                         <FontAwesomeIcon icon={faShareSquare}/>Share Profile Card
                     </div>
                </div>
                </div>
    
            <div className="d-t-s-right">
                <div>
                <div className="dashboard-info-box-alt down">
                <h4>Showcase your work</h4>
                </div>
                <div className="dashboard-info-box-alt down">
                <h4>Contribute for articles and interview</h4>
                </div>
                </div>
                <div>
                    <div className="dashboard-info-box-alt up">
                        <p>Task Completed</p>
                        <p>0</p>
                    </div>
                    <div className="dashboard-info-box-alt up">
                        <p>Team Ranking</p>
                        <p>-</p>
                    </div>
                </div>
            </div>
            </div>

            <div className="dashboard-bottom-section">
                <div className="dashboard-bottom-left-section">
                    <div className="detail-section">
                        <p>Ashutosh Nayal</p>
                    </div>

                </div>
                <div className="dashboard-bottom-center-section">
                    <div className="d-b-c-manual-card">
                        Hello Ashutosh and Team,here you can see your task
                    </div>
                    <TaskCard/>
                    <TaskCard/>
                </div> 
                <div className="dashboard-bottom-right-section">
                    <div className="dashboard-info-box-other">
                        <div>Your Team</div>
                        <div className="spans-div">
                        <span>Member</span> <span>5</span>
                        </div>
                    </div>
                    <div className="dashboard-info-box-other">
                        <div>Your Progress</div>
                        <div className="spans-div">
                            <span>Task Completed</span><span>0</span>
                        </div>
                    </div>
                    <div className="dashboard-info-box-other">
                <div>Team Statistics</div>
                    <div>
                     <div className="spans-div"><span> Member</span><span>5</span></div>
                      <div className="spans-div"><span>Task Completed</span><span>0</span></div>
                    </div>
                </div>
                </div>
            </div>
            <PasswordForm/>
            <ShareCardModal showsharemodal={showsharemodal} setshowsharemodal={setshowsharemodal}/>
         </div>
    )
}
