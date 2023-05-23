import { useContext, useEffect, useState } from 'react';
import './Order.css';
import Config, { getDateFromString, getStatus, limitStringBySize } from '../config/Config';
import { IdContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Order(){
    const idContext = useContext(IdContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [reloadComp, setReloadComp] = useState(1);
    useEffect(()=>{
        fetchOrders();
    },[reloadComp])
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
    const showProduct = (e)=>{
        const id = e.target.getAttribute("product");
        console.log(id);
        console.log(e.target);
        navigate("/product/"+id);
    }
    const cancelOrder = (e)=>{
        const id = e.target.getAttribute("orderId");
        fetch(Config.url+"/order/cancel?orderId="+id, {
            method:"POST"
        })
        .then(e => e.json())
        .then(d => setReloadComp((e)=>e+1))
    }
    return (
        <div className='d-flex justify-content-center'>
            { data && (
                <div className='orderDiv'>
                    {   
                    data.map((e)=>(
                        <div className='bg-order b-1 p-2 m-3 border' key={e.id}>
                            <div className='d-flex align-items-center justify-content-between p-1'>
                                <div className='fw-bold'>
                                    {getDateFromString(e.orders.orderedAt)}
                                </div>
                                <div className='fw-bolder'>
                                    Total : &#x20B9;{e.orders.cost}
                                </div>
                            </div>
                            {
                                e.orderItems.map((i)=>(
                                    <div key={i.id} className='p-1 d-flex align-items-center justify-content-between border m-1' >
                                        <div className='d-flex align-items-center'>
                                            <div className="orderItemImageDiv">
                                                <img src={i.productId.imageId} alt="product" className="cartItemImage"/>
                                            </div>
                                            <div className='fw-bolder p-1 pointer'  product={i.productId.id} onClick={showProduct}>
                                                {limitStringBySize(i.productId.title,20)}
                                            </div>
                                        </div>
                                        <div className='fw-bolder'>
                                            {i.count}  &#215; &#x20B9;{i.price}
                                        </div>
                                    </div>
                                ))
                            }
                            {
                            e.orders.status===5 && (<div className='d-flex align-items-center p-1 text-danger fw-bold'>
                                <div>{getStatus(e.orders.status)}</div>
                            </div>
                            )}
                            {
                            e.orders.status===1 && (<div className='d-flex justify-content-between align-items-center p-1 text-primary fw-bold'>
                                <div>{getStatus(e.orders.status)}</div>
                                <div><button className='btn btn-danger' orderId={e.orders.id} onClick={cancelOrder}>Cancel Order</button></div>
                            </div>
                            )}
                            {
                            e.orders.status===2 && (<div className='d-flex justify-content-between align-items-center p-1 text-success fw-bold'>
                                <div>{getStatus(e.orders.status)}</div>
                                <div><button className='btn btn-danger' orderId={e.orders.id} onClick={cancelOrder}>Cancel Order</button></div>
                            </div>
                            )}
                            {
                            e.orders.status===3 && (<div className='d-flex align-items-center p-1 text-warning fw-bold'>
                                <div>{getStatus(e.orders.status)}</div>
                            </div>
                            )}
                            {
                            e.orders.status===4 && (<div className='d-flex align-items-center p-1 text-info fw-bold'>
                                <div>{getStatus(e.orders.status)}</div>
                            </div>
                            )}
                        </div>
                    ))
                    }
                </div>
            )}
        </div>
    );
}

export default Order;