import { createContext, useContext, useEffect, useState } from 'react';
import './Cart.css';
import { CartVisibleContext } from '../components/header/Header';
import Config, { calculateActualPrice, limitStringBySize } from '../config/Config'; 
import CartItem from './CartItem';
import { CartContext } from '../App';
import { IdContext } from '../App';
import Address from '../components/address/Address';
import Toast from '../components/toast/Toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const SelectedAddress = createContext();

const AddSelectedPriceAndProductId = createContext();
const stripePromise = loadStripe('pk_test_51N9gdWSCxComyq37KiJddRE48VsBEQQpTJ2gz7AgEgn37upjZo2zsOO0YhZVhT56dZszrNDs33qJ64RN5hZwMNN700ejBe52Mh');

function Cart() {
    const cartVisibleContext = useContext(CartVisibleContext);
    const idContext = useContext(IdContext);
    const url  = Config.url;
    const [cartItems, setCartItems] = useState();
    const [price, setPrice] = useState(0);
    const [products,setProducts] = useState([]);
    const cartContext = useContext(CartContext);
    const [orderHandle, setOrderHandle] = useState(-1);
    const [addresses, setAddresses] = useState([]);
    const [saveAddress, setSaveAddress] = useState(false);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [code, setCode] = useState(0);
    const [msg, setMessage] = useState("");
    const [pricePopup, setPricePopup] = useState(false);
    const [addressId, setAddressId] = useState(-1);
    const [selectAddress, setSelectAddress] = useState(false);
    const [selectedCart, setSelectedCart] = useState();
    const [selectedAddresss, setSelectedAddresss] = useState();
    const [secretKey, setSecretKey] = useState('');

    const options = {
        // passing the client secret obtained in step 3
        clientSecret: secretKey,
        // Fully customizable with appearance API.
        appearance: {},
    };

    const payNow = async ()=>{
        const payNowPayload = {
            "cartIds" : products,
            "cost": price,
            "addressId" : addressId,
            "userId" : idContext.id
        }
        await fetch(url+"/payments",{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(payNowPayload)
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)
            setSecretKey(data.msg); 
        });

    }
    const fetchOrderDetails = async ()=>{
        // 1. fetch by products based on user id and keep count
        // 2. fetch address by id and if it belongs to this user
        console.log(products, addressId)
        await fetch(url+"/cartbyids?ids="+products,{
            method:"POST"
        })
        .then(data => data.json())
        .then(data => setSelectedCart(data.data));

        await fetch(url+"/address/"+addressId,{
            method:"POST"
        })
        .then(data => data.json())
        .then(data => setSelectedAddresss(data.data));
    }

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
        fetchAddress()
    },[idContext.id,cartContext.reloadCart]);


    const addAddress = async ()=>{
        await fetch(url+"/address/add",{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(address)
        })
        .then(json => json.json())
        .then(res => {
            console.log(res.data)
            if(res.statusCode === 200) {
                setCode(200);
                setMessage(res.data);
                fetchAddress()
            }
            else {
                setCode(500);
                setMessage(res.data);
            }
        })
        .then(data => {
            setSaveAddress(true);
            changeAddressFlag();
        });
    }

    const changeAddressFlag = ()=>{
        setTimeout(()=>{
            setSaveAddress(false);
        }, 1500)
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
            console.log(products)
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

    const fetchCartItems = async ()=>{
        if(idContext.id) {
            await fetch(url+"/cart?id="+idContext.id,{
                method:"POST"
            })
            .then(res => res.json())
            .then(res => {
                if(res.data.length > 0) {
                    setCartItems(res.data)
                    setOrderHandle(0);
                }
            });
        }
        else{
            setCartItems([])
        }
    }
    const close = ()=>{
        cartVisibleContext.setCartVisible(false)
    }

    const placeOrder = ()=>{
        if(price>0) {
            setOrderHandle(1);
        }
        else {
            setPricePopup(true);
            reset();
        }
    }

    const reset = ()=>{
        setTimeout(()=>{
            setPricePopup(false);
            setSelectAddress(false);
        },2000)
    }
    const changeShowAddd = ()=>{
        setShowAddAddress((e)=>!e)
    }
    const checkout = ()=>{
        if(addressId === -1) {
            setSelectAddress(true);
            reset();
            return; 
        }
        setOrderHandle(2);
        fetchOrderDetails();
    }
    return (
            <div className='position-fixed top-0 end-0 cartDiv'>
                {saveAddress && <Toast type={code===200?'success':'error'} message={msg} />}
                {selectAddress && <Toast type={'error'} message={'Please select Address'} />}
                {pricePopup && <Toast type={'error'} message={'Select atleast 1 Product to checkout'} />}
                {
                    orderHandle===0 && (
                        <div className='pb-6'>                            
                            <p className='text-center fw-bolder p-1'>
                                My Cart
                            </p>
                            <div>
                            <AddSelectedPriceAndProductId.Provider value={{addProduct, removeProduct}}>
                                {
                                    cartItems  && cartItems.map((e) =>(
                                            <CartItem key={e.productId.id} data={e} />
                                        )
                                    )
                                }
                            </AddSelectedPriceAndProductId.Provider>
                            </div>
                            <div className='d-flex align-items-center justify-content-between position-fixed bg-black bottom-0 checkoutDiv p-3'>
                                <div>
                                    <div className='fw-bold text-light'>
                                    &#x20B9;{price}
                                    </div>
                                    <div className='text-primary viewDetails'>
                                        View Details
                                    </div>
                                </div>
                                <div className='mr-2'>
                                    <button className='btn btn-warning fw-bold pl-5 pr-5' onClick={placeOrder}>Place Order</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    orderHandle===1 && (
                        <div className='pb-6'>      
                            {
                            !address.length && (
                            <p className='text-center fw-bolder p-1'>
                                Delivery Address
                            </p>
                            )}
                            <SelectedAddress.Provider value={{addressId, setAddressId}}>
                            {
                                addresses.map((e)=>
                                    (
                                        <Address data={e} key={e.id} />
                                    )
                                )
                            }
                            </SelectedAddress.Provider>
                            
                            
                            <div className=''>
                                {
                                showAddAddress && (
                                <div className='p-3'>
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
                                )}
                            </div>
                            <div className='d-flex align-items-center justify-content-between position-fixed bg-black bottom-0 checkoutDiv p-3'>
                                <div>
                                    <button className='btn btn-warning fw-bold pl-5 pr-5' onClick={changeShowAddd}>Add Address</button>
                                </div>
                                <div>
                                    <button className='btn btn-warning fw-bold pl-5 pr-5' onClick={checkout}>Continue</button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    orderHandle == 2 && (
                        <div className='pb-6'>
                            <div className='text-center fw-bolder p-1'>Order Details</div>
                            {
                                selectedCart && (
                                    <div className='b-1 p-2 m-2 bg-light'>
                                        <p className='fw-bolder m-1 p-1'>Order Items : </p>
                                        <hr/>
                                        {
                                            selectedCart.map((e) =>(
                                                <div>
                                                    <div className="CartItemDetails">
                                                        <div className="d-flex">
                                                            <div className="cartItemImageDiv">
                                                                <img src={e.productId.imageId} alt="product Image" className="cartItemImage"/>
                                                            </div>
                                                            <div>
                                                                <div className="cartItemTitle" >
                                                                    {limitStringBySize(e.productId.title,45)}
                                                                </div>
                                                                <div>
                                                                    <span className='cartItemDetailsDiscount'>{e.productId.discount}&#x25; Off</span>
                                                                    <span className='cartItemODetailsPrice'>&#x20B9;<del>{e.productId.price}</del></span>
                                                                    <span className='cartItemDetailsPrice'>&#x20B9;{calculateActualPrice(e.productId.price, e.productId.discount)}</span>
                                                                </div>
                                                                <div className="p-1">
                                                                    <div className="fw-bold">
                                                                        Qty : {e.count} 
                                                                    </div> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                        }
                                    </div>
                                )
                            }
                            {
                                selectedAddresss && (
                                <div className='b-1 p-2 m-2 bg-light'>
                                    <p className='fw-bolder m-1 p-1'>Delivery Address : </p>
                                    <hr/>
                                    <div className="p-2 m-2">
                                        <div className='singleAddressNameDiv'>{selectedAddresss.name}</div>
                                        <div>{selectedAddresss.line1}, {selectedAddresss.line2}, {selectedAddresss.city}, {selectedAddresss.state}, {selectedAddresss.country}</div>
                                        <div  className='singleAddressContactDiv'>{selectedAddresss.mobileNo}, {selectedAddresss.email}</div>
                                    </div>
                                </div>
                                )
                            }
                            {
                                selectedCart && (
                                    <div className='b-1 p-2 m-2 bg-light'>
                                        <p className='fw-bolder m-1 p-1'>Price Details : </p>
                                        <hr/>
                                        <div>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <p className='m-1 p-1'>Price({products.length} Items)</p>
                                                </div>
                                                <div>
                                                    <p className='m-1 p-1'>&#x20B9;{price}</p>
                                                </div> 
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <p className='m-1 p-1'>Delivery Charges</p>
                                                </div>
                                                <div>
                                                    <p className='m-1 p-1'>Free</p>
                                                </div> 
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <p className='fw-bolder m-1 p-1'>Total Amount</p>
                                            </div>
                                            <div>
                                                <p className='fw-bolder m-1 p-1'>&#x20B9;{price}</p>
                                            </div> 
                                        </div>
                                    </div>
                                )
                            }
                            {
                                secretKey && stripePromise && (
                                    <Elements stripe={stripePromise} options={options}>
                                        <CheckoutForm/>
                                    </Elements>
                                )
                            }
                            <div className='d-flex align-items-center justify-content-between position-fixed bg-black bottom-0 checkoutDiv p-3'>
                                <div>
                                </div>
                                <div>
                                    <button className='btn btn-warning fw-bold pl-5 pr-5' onClick={payNow}>Pay Now</button>
                                </div>
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
export {AddSelectedPriceAndProductId, SelectedAddress};