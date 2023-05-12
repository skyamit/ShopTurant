import { createContext, useContext, useEffect, useState } from 'react';
import './Cart.css';
import { CartVisibleContext } from '../components/header/Header';
import Config from '../config/Config'; 
import CartItem from './CartItem';
import { CartContext } from '../App';
import { IdContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Address from '../components/address/Address';

const AddSelectedPriceAndProductId = createContext();

function Cart() {
    const cartVisibleContext = useContext(CartVisibleContext);
    const idContext = useContext(IdContext);
    const url  = Config.url;
    const [cartItems, setCartItems] = useState();
    const [price, setPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const cartContext = useContext(CartContext);
    const navigate = useNavigate();
    const [orderHandle, setOrderHandle] = useState(0);
    const [addresses, setAddresses] = useState([]);

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
        fetchCartItems();
        markAllChecked();
        fetchAddress()
    },[idContext.id,cartContext.reloadCart]);


    const addAddress = async ()=>{
        await fetch(url+"/address/add",{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(address)
        })
        .then(json => console.log(json));
    }
    const fetchAddress = async () =>{
        await fetch(url +"/address?userId="+idContext.id,{
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
    const markAllChecked = async ()=>{
        const collection = document.getElementsByName("checkbox");
        console.log(collection)
        for (let i = 0; i < collection.length; i++) {
          if (collection[i].type == "checkbox") {
            collection[i].checked = true;
          }
        }
    }

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

    const placeOrder = ()=>{
        setOrderHandle(1);
    }
    return (
            <div className='position-fixed top-0 end-0 cartDiv'>
                {
                    orderHandle===0 && (
                        <div>                            
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
                                    <button className='btn btn-warning fw-bold pl-5 pr-5' onClick={placeOrder}>Place Order</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    orderHandle===1 && (
                        <div>                            
                            <p className='text-center fw-bolder p-1'>
                                Add Delivery Address
                            </p>
                            <div className=''>
                                <div>
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

                                </div>
                                <div>
                                    <button onClick={addAddress} className="inputs btn btn-outline-success fw-bold pointer" >Save Address</button>
                                </div>
                                {
                                    addresses.map((e)=>
                                        (<Address data={e} />)
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                <div className='close' >
                    <img className='iconCloseUser pointer' src="/cancel.png" alt="close" onClick={close}/>
                </div>
            </div>
    );
}

export default Cart;
export {AddSelectedPriceAndProductId};