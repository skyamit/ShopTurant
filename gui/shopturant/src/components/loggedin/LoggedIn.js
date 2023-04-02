import { useScrollTrigger } from '@mui/material';
import avatar from '../../images/avatar.png';
import { useEffect, useState } from 'react';
import Config from '../../config/Config';
import './LoggedIn.css';
function LoggedIn() {
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [data, setData] = useState();
    const url = Config.url;
    useEffect(()=>{
        setUserId(sessionStorage.getItem("userId"));
        const variable = {
            "id":userId
        };
        fetch(url+'/userDetails',{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(variable)
        })
        .then(async response => await response.json())
        .then(json => setData(json))
        .catch(error => console.log(error));
        console.log(data);
    },[]);
    const close = ()=>{
        document.getElementById('userPopup').style.display = 'none';
    };
    const showUserPopup = ()=>{
        document.getElementById('userPopup').style.display = 'block';
    };
    const logout = ()=> {
        sessionStorage.removeItem("userId");
    }
    return (
        <div className='myProfile pl-2' >
            <img src={avatar} className="profileImage  pl-2" alt="cart" />
            <div className='userDetails' >
                <h6 className='helloUser'>Hello, {data && data.data.name}</h6>
                <h6 className='userOption' onClick={showUserPopup}>Accounts & Details</h6>
            </div>
            <div id='userPopup' className="popup">
                <img className='iconCloseUser' src="/cancel.png" alt="close" onClick={close}/>
                <button onClick={logout}>Logout</button> 
            </div>
        </div>
    );
}

export default LoggedIn;