import { useContext, useEffect } from 'react';
import './Address.css'
import { SelectedAddress } from '../../cart/Cart';

function Address(props) {
    const selectedAddress = useContext(SelectedAddress);
    useEffect(()=>{
        console.log(selectedAddress.addressId)
    },[selectedAddress.addressId])

    const updateAddressId = (event)=>{
        selectedAddress.setAddressId(event.target.value);
    }
    return (
        <div className='d-flex p-2 addressDiv'>
            <input type="radio" name="address" value={props.data.id} checked={Number(selectedAddress.addressId) === Number(props.data.id)} onChange={updateAddressId}></input>
            <div className="b-1 p-2 m-2 singleAddressDiv">
                <div className='singleAddressNameDiv'>{props.data.name}</div>
                <div>{props.data.line1}, {props.data.line2}
                    <br/> City : {props.data.city}
                    <br/> State : {props.data.state}
                    <br/> Country : {props.data.country}</div>
                <div  className='singleAddressContactDiv'>Mobile No. : +91 {props.data.mobileNo}<br></br> Email-Id : {props.data.email}</div>
            </div>
        </div>
    );
}

export default Address;