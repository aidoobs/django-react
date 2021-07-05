import { faBlackberry } from '@fortawesome/free-brands-svg-icons';
import React from 'react'
import '../style/LoadingComp.css'
export default function LoadingComp(props) {
    const width=props.width!==null?props.width:"10px";
    const color=props.color!==null?props.color:"#000";
    const strokeWidth=props.strokeWidth!==null?props.strokeWidth:"5px";
    const style={width:width,height:width,
        borderRadius:'50%',
        backgroundColor:"transparent",
        borderBottom:`${strokeWidth} solid ${color}`,
        borderTop:`${strokeWidth} solid ${color}`,
        borderRight:`${strokeWidth} solid ${color}`,
        borderLeft:`${strokeWidth} solid transparent`}
    //console.log(style);
    return (
        <div>
            <div id="spinner" style={style}></div>
        </div>
    )
}
