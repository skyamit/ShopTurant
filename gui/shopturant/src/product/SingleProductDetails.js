import './SingleProductDetails.css';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {calculateActualPrice} from '../config/Config';
import Config from '../config/Config';
import Toast from '../components/toast/Toast';
import { CartContext } from '../App';
import { IdContext } from '../App';

function SingleProductDetails() {
    const {productId} = useParams();
    const [data, setData] = useState();
    const [summary, setSummary] = useState([]);
    const [countItem, setCountItem] = useState(1);
    const url = Config.url;
    const [addedToCart, setAddedToCart] = useState(false);
    const [addedToCartMessage, setAddedToCartMessage] = useState();
    const cartContext = useContext(CartContext);
    const idContext = useContext(IdContext);

    const fetchData = async ()=>{
        await fetch(url+"/product/"+productId,{
            method: "GET",
            })
            .then((res) => res.json())
            .then((res) => {
                setData(res?.data)
                setSummary(res?.data?.summary.split(/[\n]/))
            });
    }
    useEffect(()=>{
        fetchData();
        unsetAddedToCart();
    },[addedToCart, productId]);

    const unsetAddedToCart = ()=>{
        setTimeout(function() {
            setAddedToCart(false);
        }, 2000)
    }
    const increment = ()=>{
        setCountItem((e)=>{
            return e+1
        });
    }
    const decrement = ()=>{
        setCountItem((e)=>{
            if(e===1)
                return 1;
            return e-1;
        });
    }
    const addToCart = async ()=>{
        const cartItem = {
            "user" : idContext.id,
            "product" : productId,
            "count" : countItem
        }
        if(idContext.id) {
            await fetch(url+"/cart/add",{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body : JSON.stringify(cartItem)
            })
            .then((res) =>  res.json())
            .then((res) => {
                if(res.data) {
                    setAddedToCartMessage(res.data)
                    setAddedToCart(true)
                    cartContext.setReloadCart((e)=>e+1)
                } 
            })
        }
    }
    return (
        <div className='container'>
        {addedToCart && (<Toast type={'success'} message={addedToCartMessage} /> )}
        {
            data && (
            <div className='SingleProductDetailsDiv'>
                <div className="m-3 p-3">
                        <h3>{data.title}</h3>
                    <div className="">
                        <div className='row'>
                            <div className="col-12 col-lg-4 col-md-12 pt-5">
                                <img className="singleProductDetailsImage" src={data.imageId} alt="product" />
                            </div>
                            <div className="col-12 col-lg-8 col-md-12 p-3">
                                <div className='SingleProductPriceDiv'>
                                    <span className='SingleProductDetailsPrice'>&#x20B9;{calculateActualPrice(data.price, data.discount)}</span>
                                    <span className='SingleOProductDetailsPrice'>&#x20B9;<del>{data.price}</del></span>
                                </div>
                                <hr />
                                <div className='container'>
                                    <div className='ratingimage'>
                                        <img src='/4.5.jpg' alt='4.5 rating' className='rating'/>
                                    </div>
                                    <div className='ratingtext p-3'>
                                        99 Ratings
                                    </div>
                                </div>
                                <hr />
                                <div className='d-flex'>
                                    <div className='cartQty'>
                                        <div onClick={decrement} className='inline cartAdd'>
                                            <i className="fa-solid fa-minus fa-sm white"></i>
                                        </div>
                                        <div  className='inline cartCount'>
                                            {countItem}
                                        </div>
                                        <div onClick={increment} className='inline cartAdd'>
                                            <i className="fa-solid fa-plus fa-sm white" ></i>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <button onClick={addToCart} className='addToCart '>
                                            <i className="fa-solid fa-cart-plus fa-lg"></i> ADD TO CART
                                        </button>
                                    </div>
                                </div>
                                <hr/>
                                <div>
                                    <h6 className='p-0 m-0'>See all products from Seller</h6>
                                </div>
                                <hr/>
                                <div>
                                    <div className='fw-bolder'>
                                        About :
                                    </div>
                                    <ul>
                                    {
                                        summary.map((e)=>(
                                            e.length!==0 && <li key={e} >{e}</li>
                                        ))
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        {
            !data && (
                <div className='noProductsFoundDiv'>
                    <img src="/noProductsFound.jpg" alt="no products found" className="noProductsFound" />
                </div>
            )
        }
        </div>
    );
}

export default SingleProductDetails;