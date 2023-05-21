import { useContext, useEffect, useState } from 'react';
import './Order.css';
import Config from '../config/Config';
import { IdContext } from '../App';

function Order(){
    const idContext = useContext(IdContext);
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetchOrders();
    },[])
    const fetchOrders = ()=>{
        fetch(Config.url+"/orders?userId="+idContext.id, {
            method:"POST"
        })
        .then(data => data.json())
        .then(d => {
            if(d.statusCode === 200) {
                console.log(d.data);
                setData(d.data);
            }
        })
    }
    return (
        <div>
            { data && (
                <div>
                    {   
                    data.map((e)=>(
                        <div className='bg-order b-1 p-2 m-3 border'>
                            <div>
                                <div>
                                    Ordered At : {e.orders.orderedAt}
                                </div>
                            </div>
                            <div>
                                
                            </div>
                            <div>
                            </div>
                            {e.orders.id}
                        </div>
                    ))
                    }
                </div>
            )}
        </div>
    );
}

export default Order;