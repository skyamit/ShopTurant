import { useContext, useEffect, useState } from "react";
import Config from "../../config/Config";
import { IdContext } from "../../App";

function EditAddress(props) {
    const [addresses, setAddresses] = useState();
    const idContext = useContext(IdContext);
    useEffect(()=>{
        fetchAddress();
    },[]);
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
            <div className="editDiv" >
            {   addresses && 
                addresses.map((e)=>(
                    <div className='d-flex p-2 position-relative'>
                        <div className="b-1 p-2 m-2 singleAddressDiv position-relative mr-5">
                            <div className='singleAddressNameDiv'>{e.name}</div>
                            <div>{e.line1}, {e.line2}
                                <br/> City : {e.city}
                                <br/> State : {e.state}
                                <br/> Country : {e.country}</div>
                            <div  className='singleAddressContactDiv'>Mobile No. : +91 {e.mobileNo}<br></br> Email-Id : {e.email}</div>
                        </div>
                        <div className="d-flex justify-content-center flex-column position-absolute editPosition">
                            <button className="btn btn-warning m-2 editButton fw-bold"><img src="./pen.svg"/></button>
                            <button className="btn btn-danger m-2 editButton fw-bold"><img src="./trash.svg"/></button>
                        </div>
                    </div>       
                ))
            }
            </div>
        </div>
    );
}

export default EditAddress;