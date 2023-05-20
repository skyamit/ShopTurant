import { useContext, useEffect } from 'react';
import './Order.css';
import Config from '../config/Config';
import { IdContext } from '../App';

function Order(){
    const idContext = useContext(IdContext);
    useEffect(()=>{
        fetchOrders();
    },[])
    const fetchOrders = ()=>{
        fetch(Config.url+"/orders?userId="+idContext.id, {
            method:"POST"
        })
        .then(data => data.json())
        .then(d => console.log(d))
    }
    return (
        <div>
        </div>
    );
}

export default Order;