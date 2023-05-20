import { useContext, useEffect } from "react";
import { limitStringBySize, calculateActualPrice} from "../config/Config";
import Config from "../config/Config";
import { AddSelectedPriceAndProductId } from "./Cart";
import { CartContext } from '../App';
import { useNavigate } from "react-router-dom";

function CartItem(props) {
    const addAndRemoveProduct = useContext(AddSelectedPriceAndProductId);
    const cartContext = useContext(CartContext);
    const url = Config.url;
    const navigate = useNavigate();
    useEffect(()=>{
    },[])

    const checkSelected = (e)=>{
        var price = parseInt(e.target.getAttribute("cost"),10);
        var productId = parseInt(e.target.getAttribute("productid"),10);
        if(e.target.checked)
            addAndRemoveProduct.addProduct(productId, price);
        else
            addAndRemoveProduct.removeProduct(productId, price);
    }

    const removeFromCart = async ()=>{
        await fetch(url+"/cart/remove?id="+props.data.id,{
            method:"POST"
        })
        .then(res => console.log(res));
        cartContext.setReloadCart((e)=>e+1);
    }
    const navigateProduct = ()=>{
        navigate("/product/"+props.data.productId.id);
    }
    return (
        <div className="cartItemDiv">
            <div>
                <input type="checkbox" name="checkbox" onChange={checkSelected} 
                cost={calculateActualPrice(props.data.productId.price, props.data.productId.discount)*props.data.count} 
                productid={props.data.id} />
            </div>
            <div className="CartItemDetails">
                <div className="d-flex">
                    <div className="cartItemImageDiv">
                        <img src={props.data.productId.imageId} alt="product Image" className="cartItemImage"/>
                    </div>
                    <div>
                        <div className="cartItemTitle" onClick={navigateProduct}>
                            {limitStringBySize(props.data.productId.title,45)}
                        </div>
                        <div>
                            <span className='cartItemDetailsDiscount'>{props.data.productId.discount}&#x25; Off</span>
                            <span className='cartItemODetailsPrice'>&#x20B9;<del>{props.data.productId.price}</del></span>
                            <span className='cartItemDetailsPrice'>&#x20B9;{calculateActualPrice(props.data.productId.price, props.data.productId.discount)}</span>
                        </div>
                        <div className="p-1">
                            <div className="fw-bold">
                                Qty : {props.data.count} 
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <input type="submit" id="removeCartItem" name="removeCartItem" onClick={removeFromCart} value="Remove" className="btn btn-outline-danger" />
            </div>
        </div>
    );
}

export default CartItem;