import React,{useEffect,useState} from 'react'
import '../style/ProfileCardForm.css'

export default function PasswordForm() {
    const [email, setemail] = useState("");
    const [showModal,setshowModal]=useState(false);
    const [pass,setpass]=useState("");
    const [pass2,setpass2]=useState("");
    function handleChange(e){
        if(e.target.id==='email_field')
        {
            setemail(e.target.value);
        }
        if(e.target.id==='pass_field')
        {
            setpass(e.target.value);
        }
        if(e.target.id==='pass2_field')
        {
            setpass2(e.target.value);
        }
    }
    function updateProfile()
    {
        console.log("updating profile");
        setshowModal(false);
    }
    return (
        <div>
           {showModal? (<div className="profile-card-form-main-container">
                <div className="profile-card-form-container">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email_field" value={email}   onChange={handleChange}/>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="pass_field" value={pass} onChange={handleChange}/>
                    <label for="password2">Confirm Password</label>
                    <input type="password" name="password2" id="pass2_field" value={pass2}onChange={handleChange}/>
                    <div className="config-update-btn" onClick={updateProfile}>Set Password</div>
                </div>
            </div>):null}
        </div>
    )
}
