import { useEffect, useState } from "react";
import './NotLoggedIn.css';
import Config from "../../config/Config";

function NotLoggedIn(props) {
    const url = Config.url;
    const [data, setData] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState("");
    const [seller, setSeller] = useState(false);

    useEffect(()=>{
        props.checkLogin()
    },[data]);
    var login = ()=> {
        document.getElementById('loginPopup').style.display = 'block';
        document.getElementById('signupPopup').style.display = 'none';
    };
    var signup = ()=> {
        document.getElementById('loginPopup').style.display = 'none';
        document.getElementById('signupPopup').style.display = 'block';
    };
    var close = () => {
        document.getElementById('loginPopup').style.display = 'none';
        document.getElementById('signupPopup').style.display = 'none';
    };
    var submitSignup = (e)=> {
        e.preventDefault();
        const variable = {
            "name":name,
            "password":password,
            "email":email,
            "phoneNo":phone,
            "isSeller":seller,
            "isActive":true
        };
        fetch(url+'/register',{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(variable)
        })
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.log(error));
    };
    var submitLogin = async (e)=> {
        e.preventDefault();
        const variable = {
            "password":password,
            "email":email
        };
        fetch(url+'/login',{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(variable)
        })
        .then(response => response.json())
        .then(async json => {
            setData(json);
            sessionStorage.setItem("userId", json?.data?.id);
        })
        .catch(error => console.log(error));
        close();
    };
    
return (
        <div className='profile pl-2' >
            <div className='hello'>
                Hello,
            </div>
            <div className='links'>
                <a href="#" className='linkText pointer' onClick={login}>Login</a>
                <h6 className='linkText'>Or</h6>
                <a href="#" className='linkText pointer' onClick={signup}>Signup</a>
            </div>
            <div id='loginPopup' className="popup">
                <img className='iconClose pointer' src="/cancel.png"  alt="close" onClick={close}/>
                <h1>Login to Account</h1>
                <form method="POST" >
                    Email Id : <input id="email" type="email" className="inputs" onChange={(event)=>{setEmail(event.target.value)}}  placeholder="Enter you Email Id" /> <br/>
                    Password : <input id="password" type="password" className="inputs" onChange={(event)=>{setPassword(event.target.value)}} placeholder="Password" /> <br/>
                    <button id="loginBtn" type="submit" onClick={submitLogin} className="inputs btn btn-outline-success fw-bold pointer">Login</button>
                </form>
            </div>
            <div id='signupPopup' className="popup">
                <img className='iconClose pointer' src="/cancel.png" alt="close" onClick={close}/>
                <h1>Create your Account</h1>
                <form method="post" onSubmit={submitSignup}>
                    Name : 
                    <input id="name" type="text" className="inputs" onChange={(event)=>{setName(event.target.value)}} placeholder="Enter you name" /> <br/>
                    Email Id : 
                    <input id="email" type="email" className="inputs" onChange={(event)=>{setEmail(event.target.value)}} placeholder="Enter you Email Id" /> <br/>
                    Phone number : 
                    <input id="phone" type="text" className="inputs" onChange={(event)=>{setPhone(event.target.value)}}  placeholder="XXXXXXXXXX" /> <br/>
                    Password : 
                    <input id="password" type="password" className="inputs" onChange={(event)=>{setPassword(event.target.value)}}  placeholder="Password" /> <br/>
                    Do you want to Sell products as well ? : 
                    <select name="seller" className="inputs" title="Seller" onChange={(event)=>{setSeller(event.target.value)}}  >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select> <br/>
                    <button type="submit" id="signupBtn"  className="inputs btn btn-outline-success fw-bold pointer" >SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default NotLoggedIn;