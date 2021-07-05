import React, { useEffect, useState ,useRef} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import '../style/ProfileCardForm.css'
import { useHistory } from 'react-router-dom'
export default function ProfileCardForm({show,setShowModal,data}) {
    useEffect(()=>{
        setname(data.Name)
        setemail(data.Email)
        setphone(data.Phone)
        setdesignation(data.Designation)
        setlinks(data.links)
        setskills(data.Skills)
        console.log(data);
    },[])
    const history=useHistory();
    const modelref=useRef();
    const closeModel=e=>{
        if(modelref.current===e.target)
        {
            setShowModal(false);
        }
    }
 function updateProfile()
    {   
        let req_id=data.id;
        let update_data=new FormData();
        update_data.append('Name',name);
        update_data.append('Email',email);
        update_data.append('Phone',phone)
        update_data.append('Designation',designation)
        update_data.append('Skills',skills)
        update_data.append('links',links);
        let config = {
            
            method: 'put',
            url: `http://127.0.0.1:8000/api/create-resume/?id=${req_id}`,
            /*headers: { 
                ...data.getHeaders()
                ,*/
            data : update_data
            };
            axios(config)
            .then(function (response){
                let data=response.data;
                console.log(data);
                history.push({
                    pathname:'/config-profile-card',
                    state:{userId:req_id}
                });
                setShowModal(prev=>!prev);
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }
    const [name,setname]=useState();
    const [email,setemail]=useState();
    const [phone,setphone]=useState();
    const [designation,setdesignation]=useState();
    const [skills,setskills]=useState();
    const [links,setlinks]=useState();
    function handleChange(e){
        console.log(e.target);
        if(e.target.name==="Name")
        {
            setname(e.target.value);
        }
        if(e.target.name==="designation")
        {
            setdesignation(e.target.value);
        }
        if(e.target.name==="Email")
        {
            setemail(e.target.value);
        }
        if(e.target.name==='phone')
        {
            setphone(e.target.value);
        }
        if(e.target.name==='links')
        {
            setlinks(e.target.value);
        }
        if(e.target.name==='skills')
        {
            setskills(e.target.value);
        }
       // setname(e.target.value);
    }
    return (
        <div>
            {show?(
            <div className="profile-card-form-main-container" ref={modelref} onClick={closeModel}>
                <div className="profile-card-form-container">
                <label for="Name">Name</label>
                <input type="text" name="Name" id="name_field" value={name}   onChange={handleChange}/>
                <label for="designation">Designation</label>
                <input type="text" name="designation" id="designation" value={designation} onChange={handleChange}/>
                <label for="Email">Email</label>
                <input type="text" name="Email" id="email_field" value={email} onChange={handleChange}/>
                <label for="Phone">Phone</label>
                <input type="text" name="phone" id="phone_field" value={phone} onChange={handleChange}/>
                <label for="Links">Links</label>
                <input type="text" name="links" id="links_field" value={links} onChange={handleChange}/>
                <label for="Phone">Skills</label>
                <input type="text" name="skills" id="skills_field" value={skills} onChange={handleChange}/>
                <div className="config-update-btn" onClick={updateProfile}>Update Profile Card</div>
                <div id="cross"onClick={()=>{
                    setShowModal(prev=> !prev) 
                }}><FontAwesomeIcon icon={faTimesCircle}/></div>
                </div>
                </div>):null}
        </div>
    )
}
