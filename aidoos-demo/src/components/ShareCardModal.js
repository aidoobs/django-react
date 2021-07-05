import React,{useState} from 'react'
import '../style/ShareCardModal.css'
import { WhatsappShareButton,LinkedinShareButton,FacebookShareButton,TelegramShareButton,EmailShareButton } from 'react-share';
import { WhatsappIcon,LinkedinIcon,TelegramIcon,EmailIcon,FacebookIcon } from 'react-share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'

export default function ShareCardModal({showsharemodal,setshowsharemodal}) {
  //  const [showmodal,setshowmodal]=useState(false);
    const share_message = "Hello Friends, Check out this cool Profile Card made using Aidoos website   ";
    const share_url = "http://127.0.0.1:3000/config-profile-card";
    return (
        <div>
            {
                showsharemodal?(<div className="sharecard-base-container"><div className="sharecard-container">
                 <div><h3>Share your Profile Card</h3></div>
                    <div className="sharecard-center">
                        <textarea>
                            {share_message+share_url} 
                        </textarea>
                        <div className="sharecard-clip-btn">copy to clipboard</div>
                    </div>
                    <div className="sharecard-or">or</div>
                    <div style={{display:"flex",justifyContent:"space-around",margin:"20px"}}>
                    <WhatsappShareButton url={share_url} title={share_message} separator={String, " "}>
                            <WhatsappIcon round={true} size="50" />
                    </WhatsappShareButton>
                    <FacebookShareButton url={share_url} title={share_message} separator={String," "}>
                        <FacebookIcon round={true} size="50"/>
                    </FacebookShareButton>
                    <LinkedinShareButton url={share_url} title={share_message} separator={String," "}>
                        <LinkedinIcon round={false} size="50"/>
                    </LinkedinShareButton>
                    <TelegramShareButton url={share_url} title={share_message} separator={String," "}>
                        <TelegramIcon round={true} size="50"/>
                    </TelegramShareButton>
                    </div>
                    <div id="close" onClick={()=>{
                            setshowsharemodal(prev=>!prev);
                    }}><FontAwesomeIcon icon={faTimesCircle}/></div>
                    </div></div>):null
            }
        </div>
    )
}
