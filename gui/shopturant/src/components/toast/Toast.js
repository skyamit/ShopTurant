import { useEffect, useState } from 'react';
import './Toast.css';

function Toast(props) {
    const [showElement,setShowElement] = useState(true)
    useEffect(()=>{
        setTimeout(function() {
        setShowElement(false)
            }, 1800);
        },
    [])
    return (
        showElement?<div id="right-top" className={props.type}><h3 className="message">{props.message}</h3></div>:<></>
    );
}

export default Toast;