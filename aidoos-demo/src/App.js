import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UploadResume from './UploadResume.js'
import UploadResume2 from './UploadResume2.js'
import FullResume from './components/FullResume.js'
import Dashboard from './Dashboard.js'
import ConfigProfileCard from './ConfigProfileCard.js'
export default function App() {
  /* const [profile,setProfile]=useState({});
   useEffect(()=>{
     axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
     axios.get(`create-resume/`)
     .then((resp)=>{
       console.log(resp);
       console.log(resp.headers)
       return resp.data;
     })
     .catch((err)=>{
       console.log(err);
     })
     .then((data)=>{
       setProfile(data);
     })
   },[]); 
   return (
     <div style={{display:'flex',gap:"10px",justifyContent:'center'}}>
         <ProfileCard data={profile}/>
         <ProfileCard3/>
         <ProfileCard2/>
         
     </div>
   )
   */
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' exact component={UploadResume2} />
          <Route path='/config-profile-card' exact component={ConfigProfileCard} />
          <Route path='/resume' exact component={FullResume} />
          <Route path='/dashboard' exact component={Dashboard}/>
        </Switch>
      </div>
    </Router>
  )
}
