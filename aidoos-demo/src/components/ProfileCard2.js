import React,{useState,useEffect} from 'react'
import '../style/ProfileCard2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faPhoneSquareAlt ,faDumbbell} from '@fortawesome/free-solid-svg-icons'
import ProtoPic from '../images/protoprofile.jpg'
export default function ProfileCard2({data}) {
    useEffect(()=>{
        if(data!==undefined)
        {
        let new_data=data;
        /*let skills=data.Skills.split(',');
        if(skills.length>5)
        {
            skills=skills.splice(0,4);
            skills=skills.join('|');
            new_data.Skills=skills
        }*/
        setdetail(new_data)
        //console.log(new_data)
    }
    },[])
    const [detail,setdetail]=useState(null)
    const nullstyle={width:'100px',backgroundColor:"#ccc",height:'8px',border:'none',borderRadius:'10px'}
    return (
        <div className="container-two">
            <div className="container-two-top">
                <img src={ProtoPic}/>
                <div className="heading-large">
                {detail===null?(<div style={nullstyle}></div>):detail.Name}
                </div>
                <div className="heading-small">
                {detail===null?(<div style={nullstyle}></div>):detail.Designation}
                </div>
                <div className="heading-medium">
                {detail===null?(<div style={nullstyle}></div>):detail.Skills}
                </div>
                <div className="heading-medium">
                    <FontAwesomeIcon icon={faEnvelope}/> {detail===null?(<div style={nullstyle}></div>):detail.Email}
                </div>
                <div className="heading-medium">
                    <FontAwesomeIcon icon={faPhoneSquareAlt}/> {detail===null?(<div style={nullstyle}></div>):detail.Phone}
                </div>
            </div>

            <div className="container-two-bottom">
                <div className="button">View Profile</div>
            </div>
        </div>
    )
}
