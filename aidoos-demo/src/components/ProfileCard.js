import React,{useState,useEffect} from 'react'
import '../style/ProfileCard.css'
import ProtoPic from '../images/protoprofile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faPhoneSquareAlt ,faDumbbell} from '@fortawesome/free-solid-svg-icons'
import {faGithubSquare} from '@fortawesome/free-brands-svg-icons'
export default function ProfileCard({data,onClick}) {
    
    useEffect(() => {
        let isMounted=true;
        if(isMounted)
        {
            if(data!==undefined)
            {
            let new_data=data;
           /* let skills=new_data.Skills.split(',');
            if(skills.length>5)
            {
                skills=skills.splice(0,4);
                skills=skills.join(',');
                new_data.Skills=skills;
            }*/
            setdetail(new_data)
            //console.log(new_data);
        }

        }
         return ()=>{isMounted=false}
    }, []);
    const [detail,setdetail]=useState(null)
    const nullstyle={width:'100px',backgroundColor:"#ccc",height:'8px',border:'none',borderRadius:'10px'}
   
    return (
        <div className="container-one">
            <div className="top-side">
                <div className="top-side-left">
                    <img src={ProtoPic}/>
                </div>
                <div className="top-side-right">
                    <span className="heading-large">{detail===undefined||detail===null?(<div style={nullstyle}></div>):detail.Name}</span>
                    <span className="heading-medium">{detail===undefined||detail===null?(<div style={nullstyle}></div>):detail.Designation}</span>
                    <span className="heading-small"><FontAwesomeIcon icon={faEnvelope}/>
                    {detail===undefined||detail===null?(<div style={nullstyle}></div>):detail.Email}
                    </span>
                    <span className="heading-small"><FontAwesomeIcon icon={faPhoneSquareAlt}/>
                    {detail===undefined||detail===null?(<div style={nullstyle}></div>):detail.Phone}</span>
                </div>
            </div>
            <div className="bottom-side">
                <div>
                <p className="heading-medium alt">Expierence: 5+</p><br/>
                <p className="heading-medium alt"><FontAwesomeIcon icon={faGithubSquare} style={{fontSize:'1rem'}}/>
                {detail===undefined||detail===null?(<div style={nullstyle}></div>):detail.links}
                </p>
                <p className="heading-medium alt"><FontAwesomeIcon icon={faDumbbell}/>
                {detail===undefined||detail===null?(<div style={nullstyle}></div>):detail.Skills}</p> 
                </div>
                <div onClick={onClick} className="see-profile">View Profile</div>
            </div>
        </div>
    )
}
