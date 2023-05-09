import { createContext, useContext, useEffect, useState } from 'react';
import './Cart.css';
import { CartVisibleContext } from '../components/header/Header';
import Config from '../config/Config'; 
import CartItem from './CartItem';
import { CartContext } from '../App';
import { IdContext } from '../App';

const AddSelectedPriceAndProductId = createContext();

function Cart() {
    const cartVisibleContext = useContext(CartVisibleContext);
    const idContext = useContext(IdContext);
    const url  = Config.url;
    const [cartItems, setCartItems] = useState();
    const [price, setPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const cartContext = useContext(CartContext);
    const addProduct = (id, price)=>{
        const index = products.indexOf(id);
        if(index <= -1){
            products.push(id);
            console.log("add",price);
            setPrice((e)=>{
                return e+price
            });
        }
    }
    const removeProduct = (id, price)=>{
        const index = products.indexOf(id);
        if (index > -1) {
          products.splice(index, 1);            
            setPrice((e)=>{
                return e-price
            });
        }
    }
    useEffect(()=>{
        fetchCartItems();
    },[idContext.id,cartContext.reloadCart]);

    const fetchCartItems = async ()=>{
        if(idContext.id) {
            await fetch(url+"/cart?id="+idContext.id,{
                method:"POST"
            })
            .then(res => res.json())
            .then(res => {
                setCartItems(res.data)
            });
        }
        else{
            setCartItems(0)
        }
    }
    const close = ()=>{
        cartVisibleContext.setCartVisible(false)
    }
    return (
            <>
                {
                    idContext.id!==0 && (
                        <div className='position-fixed top-0 end-0 cartDiv'>
                            <div className='close' >
                                <img className='iconCloseUser pointer' src="/cancel.png" alt="close" onClick={close}/>
                            </div>
                            
                            <p className='text-center fw-bolder p-1'>
                                My Cart
                            </p>
                            <div className=''>
                            <AddSelectedPriceAndProductId.Provider value={{addProduct, removeProduct}}>
                                {
                                    cartItems  && cartItems.map((e) =>(
                                            <CartItem key={e.productId.id} data={e} />
                                        )
                                    )
                                }
                            </AddSelectedPriceAndProductId.Provider>
                            </div>
                            <div className='d-flex align-items-center justify-content-between position-sticky bg-black bottom-0 checkoutDiv p-3'>
                                <div>
                                    <div className='fw-bold text-light'>
                                    &#x20B9;{price}
                                    </div>
                                    <div className='text-primary viewDetails'>
                                        View Details
                                    </div>
                                </div>
                                <div>
                                    <button className='btn btn-warning fw-bold pl-5 pr-5'>Place Order</button>
                                </div>
                            </div>
                        </div>  
                    )
                }
                {
                    idContext.id===0 && (
                        <div className='position-fixed top-0 end-0 cartDiv'>
                            <div className='close' >
                                <img className='iconCloseUser pointer' src="/cancel.png" alt="close" onClick={close}/>
                            </div>
                        </div>
                    )
                }
            </>
    );
}

export default Cart;
export {AddSelectedPriceAndProductId};