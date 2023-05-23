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
        <div>
            {
                addresses && 
                addresses.map((e)=>(
                    <div className='d-flex p-2'>
                        <div className="b-1 p-2 m-2 singleAddressDiv">
                            <div className='singleAddressNameDiv'>{e.name}</div>
                            <div>{e.line1}, {e.line2}, {e.city}, {e.state}, {e.country}</div>
                            <div  className='singleAddressContactDiv'>{e.mobileNo}, {e.email}</div>
                        </div>
                    </div>       
                ))
            }
        </div>
    );
}

export default EditAddress;