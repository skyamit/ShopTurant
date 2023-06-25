import { useContext, useEffect, useState } from "react";
import Config from "../../config/Config";
import { IdContext } from "../../App";
import Toast from "../toast/Toast";

function EditAddress(props) {
    const [addresses, setAddresses] = useState();
    const idContext = useContext(IdContext);
    const [changeHappened, setChangeHappened] = useState();
    const [addressDeleted, setAddressDeleted] = useState(false);
    const [addressUpdated, setAddressUpdated] = useState(false);
    const [addressAdded, setAddressAdded] = useState(false);
    const address = {
        name : "",
        mobileNo : "",
        email : "",
        line1 : "",
        line2 : "",
        state : "",
        city : "",
        country : "",
        userId : idContext.id
    }
    useEffect(()=>{
        fetchAddress();
    },[changeHappened, idContext.id]);

    const addAddress = async ()=>{
        await fetch(Config.url+"/address/add",{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(address)
        })
        .then(json => json.json())
        .then(data => {
            console.log(data);
            setChangeHappened((e)=>e+1);
            setAddressAdded(true);
            reset();
        });
    }
    const deleteAddress = (e)=>{
        console.log(e.currentTarget);
        let id = e.currentTarget.getAttribute("addressid");
        fetch(Config.url+Config.deleteAddress+id,{
            method:"POST"
        })
        .then(data => data.json())
        .then(d => {
            setChangeHappened((x)=>x+1)
            setAddressDeleted(true);
            reset();
        });
    }
    const reset = ()=>{
        setTimeout(()=>{
            setAddressDeleted(false);
            setAddressUpdated(false);
            setAddressAdded(false);
        }, 2000);
    }
    const fetchAddress = async () =>{
        await fetch(Config.url +"/address?userId="+idContext.id,{
            method:"POST"
        })
        .then(json => json.json())
        .then(res => {
            console.log(res)
            if(res.statusCode === 200){
                setAddresses(res.data);
            }
        })
    }
    return (
        <div className='d-flex justify-content-center flex-column align-items-center'>
            {addressDeleted && (<Toast type="success" message="Address Deleted Successfully.." />)}
            {addressUpdated && (<Toast type="success" message="Address Updated Successfully.."/>)}
            {addressAdded && (<Toast type="success" message="Address Updated Successfully.."/>)}
            <div className="editDiv" >
                <div className='mt-2 p-2 editAddAddress d-flex flex-column text-center'>
                    <p className="fw-bold">Add New Delivery Address</p>
                    <hr/>
                    <div>
                        <input  onChange={(event)=>{address.name = event.target.value}}   className="inputs" type='text' name='name' placeholder='Name(Required)' />
                    </div>
                    <div>
                        <input onChange={(event)=>{address.mobileNo = event.target.value}}  className="inputs" type='text' name='phoneNumber' placeholder='Phone No.(Required)' />
                    </div>
                    <div>
                        <input onChange={(event)=>{address.email = event.target.value}} className="inputs" type='email' name='email' placeholder='Email-Id(Required)' />
                    </div>
                    <div>
                        <input onChange={(event)=>{address.state = event.target.value}} className="inputs" type='text' name='state' placeholder='State(Required)' />
                    </div>
                    <div>
                        <input onChange={(event)=>{address.city = event.target.value}} className="inputs" type='text' name='city' placeholder='City(Required)' />
                    </div>
                    <div>
                        <input onChange={(event)=>{address.country = event.target.value}}  className="inputs" type='text' name='country' placeholder='Country(Required)' />
                    </div>
                    <div>
                        <input onChange={(event)=>{address.line1 = event.target.value}}  className="inputs" type='text' name='line1' placeholder='House No., Building Name (Required)' />
                    </div>
                    <div>
                        <input onChange={(event)=>{address.line2 = event.target.value}}  className="inputs" type='text' name='line2' placeholder='Road Name, Area, Colony, Landmark(Required)' />
                    </div>
                    <div>
                        <button onClick={addAddress} className="inputs btn btn-outline-success fw-bold pointer" >Save Address</button>
                    </div>
                </div>
                
                <p className="fw-bold pt-5">Saved Address</p>
                <hr/>
            {   addresses && 
                addresses.map((e)=>(
                    <div className='d-flex position-relative mt-3 mb-3'>
                        <div className="singleAddressDiv position-relative p-3">
                            <div className='singleAddressNameDiv'>{e.name}</div>
                            <div>{e.line1}, {e.line2}
                                <br/> City : {e.city}
                                <br/> State : {e.state}
                                <br/> Country : {e.country}</div>
                            <div  className='singleAddressContactDiv'>Mobile No. : +91 {e.mobileNo}<br></br> Email-Id : {e.email}</div>
                        </div>
                        <div className="d-flex justify-content-center flex-column position-absolute editPosition p-1">
                            <button className="btn btn-danger m-2 editButton fw-bold" addressid={e.id} onClick={deleteAddress}>
                                <i className="fa-solid fa-trash-can fa-sm white" ></i>    
                            </button>
                        </div>
                    </div>       
                ))
            }
            </div>
        </div>
    );
}

export default EditAddress;