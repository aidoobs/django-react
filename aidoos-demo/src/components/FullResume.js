import React from 'react'
import '../style/FullResume.css'
import { WhatsappShareButton } from 'react-share';
import { WhatsappIcon } from 'react-share'
export default function FullResume() {
    const share_message = "Hello Friends, Check out this cool Profile Card made using Aidoos website   ";
    const share_url = "http://127.0.0.1:3000/config-profile-card";
    return (
        <div className="fullresume-main-container">

            <div className="fullresume-container">
                <div className="fullresume-top">
                    <div className="fullresume-detail large dark">Ashutosh Nayal</div>
                    <div className="fullresume-detail small">ashun4762@gmail.com</div>
                    <div className="fullresume-detail small">https://github.com/ashu-nayal</div>
                    <div className="fullresume-detail small dark">+91-7060503026</div>
                </div>
                <div className="fullresume-bottom">
                    <div className="fullresume-section">
                        <div className="fullresume-heading medium">About Me</div>
                        <div className="fullresume-heading section-detail small light">
                        A software engineering graduate who is seeking to find the opportunity to work in a fun and challenging working environment that will encourage me to improve and learn new and necessary skills as well as be motivated by the company to do his best for the sake of helping himself and the company advance in the software engineering industry
                        </div>
                    </div>
                    <div className="fullresume-section">
                        <div className="fullresume-heading medium">Education</div>
                        <div className="fullresume-heading section-detail small light">Lorem ipsum dummy class</div>
                    </div>
                    <div className="fullresume-section">
                        <div className="fullresume-heading medium">Skills</div>
                        <div className="fullresume-detail section-detail small">React,React-Native,Android,Django</div>
                    </div>
                </div>
            </div>
            <div className="share-buttons">
            <WhatsappShareButton url={share_url} title={share_message} separator={String, " "}>
                            <WhatsappIcon round={true} />
                        </WhatsappShareButton>
            </div>
        </div>
    )
}
