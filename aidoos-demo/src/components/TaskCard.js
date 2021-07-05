import React from 'react'
import '../style/Taskcard.css'

export default function TaskCard() {
    return (
        <div className="taskcard-container">
            <div className="task-heading">
            <div className="task-name">
                <span style={{color:"indigo",fontWeight:"bold"}}>Task:</span>
                <span>Tableau Extension Development in Node.js and Typescript</span>
            </div>
            <div className="task-button">
                Interested
            </div>
            </div>
            <div className="task-detail-table">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                <table>
                    <tr>
                    <th>Company</th>
                    <th>Earning</th>
                    <th>Due Date</th>
                    <th>Skill</th>
                    </tr>
                    <tr>
                    <td>
                        Finetech Startup
                    </td>
                    <td>$1000</td>
                    <td>May 26,2022</td>
                    <td>Java</td>
                    </tr>
                </table>
                </div>
            </div>
            <div className="task-showmore">
                show-more
            </div>
            
        </div>
    )
}
