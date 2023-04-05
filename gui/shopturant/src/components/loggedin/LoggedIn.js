import { useScrollTrigger } from '@mui/material';
import avatar from '../../images/avatar.png';
import { useEffect, useState } from 'react';
import Config from '../../config/Config';
import './LoggedIn.css';
function LoggedIn(props) {
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
        props.checkLogin()
    },[userId]);
    const close = ()=>{
        document.getElementById('userPopup').style.display = 'none';
    };
    const showUserPopup = ()=>{
        document.getElementById('userPopup').style.display = 'block';
    };
    const logout = ()=> {
        close();
        sessionStorage.removeItem("userId");
        setUserId(null);
    }
    return (
        <div className='myProfile pl-2' >
            <img src={avatar} className="profileImage  pl-2" alt="cart" />
            <div className='userDetails' >
                <h6 className='helloUser'>Hello, {data && data?.data?.name}</h6>
                <h6 className='userOption pointer' onClick={showUserPopup}>Accounts & Details</h6>
            </div>
            <div id='userPopup' className="popup">
                <img className='iconCloseUser pointer' src="/cancel.png" alt="close" onClick={close}/>
                <p className='userPopupTitle'>Your History</p>
                <h3 className="userPopupLink pointer" >Your Orders</h3>
                <h3 className="userPopupLink pointer" >Your Wish List</h3>
                <hr/>
                <p className='userPopupTitle'>Seller :</p>
                <h3 className="userPopupLink pointer" >Add Products</h3>
                <h3 className="userPopupLink pointer" >View Products</h3>
                <hr/>
                <p className='userPopupTitle'>Account Details</p>
                <h3 className="userPopupLink pointer" >Your Account</h3>
                <h3 className="userPopupLink pointer" onClick={logout} >Sign Out</h3>
            </div>
        </div>
    );
}

export default LoggedIn;