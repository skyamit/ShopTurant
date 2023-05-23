import avatar from '../../images/avatar.png';
import { useContext, useEffect, useState } from 'react';
import Config from '../../config/Config';
import './LoggedIn.css';
import { useNavigate } from 'react-router-dom';
import { IdContext } from '../../App';

function LoggedIn(props) {
    const [data, setData] = useState();
    const url = Config.url;
    const navigate = useNavigate();
    const idContext = useContext(IdContext);

    const fetchUserDetails = async ()=>{
        const variable = {
            "id":idContext.id
        };
        fetch(url+'/userDetails',{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(variable)
        })
        .then(async response => await response.json())
        .then(json => {
            if(json.data.name)
                setData(json);
            console.log(json);
        })
        .catch(error => {
            logout();
            console.log(error, 1)
        });
    }

    useEffect(()=>{
        fetchUserDetails();
    },[idContext.id]);

    const close = ()=>{
        document.getElementById('userPopup').style.display = 'none';
    };
    const showUserPopup = ()=>{
        document.getElementById('userPopup').style.display = 'block';
    };
    const logout = ()=> {
        close();
        idContext.setId(0);
    };
    const addProduct = ()=>{
       navigate('/addProduct');
       close();
   };
   const getProducts = ()=>{
    navigate('/getProducts');
    close();
    };
    const showMyOrders = ()=>{
        navigate("/order");
        close();
    }
    const editAddress = ()=>{
        navigate("/address");
        close();
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
                <h4 className="userPopupLink pointer" onClick={showMyOrders}>Your Orders</h4>
                <h4 className="userPopupLink pointer" >Your Wish List</h4>
                <hr/>
                {
                    data?.data?.isSeller && (
                    <>
                        <p className='userPopupTitle'>Seller :</p>
                        <h4 className="userPopupLink pointer" onClick={addProduct}>Add Products</h4>
                        <h4 className="userPopupLink pointer" onClick={getProducts}>View Products</h4>
                        <hr/>
                    </>
                    )
                }
                
                <p className='userPopupTitle'>Account Details</p>
                <h4 className="userPopupLink pointer" >Your Account</h4>
                <h4 className="userPopupLink pointer"onClick={editAddress} >Saved Address</h4>
                <h4 className="userPopupLink pointer" onClick={logout} >Sign Out</h4>
            </div>
        </div>
    );
}

export default LoggedIn;