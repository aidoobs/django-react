import React, { useState, useEffect } from 'react'
import '../style/ProfileCard3.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhoneSquareAlt, faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import ProtoPic from '../images/protoprofile.jpg'

export default function ProfileCard3({ data }) {

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (data !== undefined) {
                let new_data = data;
                /*let skills=new_data.Skills.split(',');
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
        return () => { isMounted = false }
    }, []);
    const iconStyle = { color: "#33ff99", margin: '0 2px', fontSize: '0.8rem' }
    const [detail, setdetail] = useState(null)
    const nullstyle = { width: '100px', backgroundColor: "#ccc", height: '8px', border: 'none', borderRadius: '10px' }
    return (
        <div className="container-three">
            <div className="container-three-left">
                <span className="heading-large-3">{detail === null ? (<div style={nullstyle}></div>) : detail.Name}</span>
                <span className="heading-medium-3">{detail === null ? (<div style={nullstyle}></div>) : detail.Designation}</span>
                <span className="heading-medium-3"><FontAwesomeIcon icon={faEnvelope} style={iconStyle} />
                    {detail === null ? (<div style={nullstyle}></div>) : detail.Email}</span>
                <span className="heading-medium-3"><FontAwesomeIcon icon={faPhoneSquareAlt} style={iconStyle} />
                    {detail === null ? (<div style={nullstyle}></div>) : detail.Phone}</span>
                <span className="heading-small-3 ">Expierence: 5+</span><br />
                <span className="heading-small-3 "><FontAwesomeIcon icon={faGithubSquare} style={iconStyle} />
                    {detail === null ? (<div style={nullstyle}></div>) : detail.links}</span>
                <span className="heading-small-3 "><FontAwesomeIcon icon={faDumbbell} style={iconStyle} />
                    {detail === null ? (<div style={nullstyle}></div>) : detail.Skills}</span>
            </div>
            <div className="container-three-right">
                <img src={ProtoPic} />
                <div className="see-profile-3">
                    view profile
                </div>
            </div>
            <div id="aidoos-badge">aidoos</div>
            <div id="aidoos-td">*aidoos registered profile card</div>
        </div>
    )
}
