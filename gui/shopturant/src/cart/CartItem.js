import { useContext, useEffect, useState } from "react";
import { limitStringBySize, calculateActualPrice, Config} from "../config/Config";
import { AddSelectedPriceAndProductId } from "./Cart";


function CartItem(props) {
    const addAndRemoveProduct = useContext(AddSelectedPriceAndProductId);
    const [isSelected, setIsSelected] = useState(false);
    useEffect(()=>{

    },[])

    const checkSelected = (e)=>{
        var price = parseInt(e.target.getAttribute("cost"),10);
        var productId = parseInt(e.target.getAttribute("productid"),10);
        console.log(price, productId);
        if(e.target.checked)
            addAndRemoveProduct.addProduct(productId, price);
        else
            addAndRemoveProduct.removeProduct(productId, price);
    }
    return (
        <div className="cartItemDiv">
            <div>
                <input type="checkbox" onChange={checkSelected} 
                cost={calculateActualPrice(props.data.productId.price, props.data.productId.discount)} 
                productid={props.data.productId.id} />
            </div>
            <div className="CartItemDetails">
                <div className="d-flex">
                    <div className="cartItemImageDiv">
                        <img src={props.data.productId.imageId} alt="product Image" className="cartItemImage"/>
                    </div>
                    <div>
                        <div className="cartItemTitle">
                            {limitStringBySize(props.data.productId.title,45)}
                        </div>
                        <div>
                            <span className='cartItemDetailsDiscount'>{props.data.productId.discount}&#x25; Off</span>
                            <span className='cartItemODetailsPrice'>&#x20B9;<del>{props.data.productId.price}</del></span>
                            <span className='cartItemDetailsPrice'>&#x20B9;{calculateActualPrice(props.data.productId.price, props.data.productId.discount)}</span>
                        </div>
                    </div>
                </div>
                <div>
                    Delivery excepted by Sun May 15
                </div>
            </div>
            <div>
                <input type="submit" id="removeCartItem" name="removeCartItem" value="Remove" className="btn btn-outline-danger" />
            </div>
        </div>
    );
}

export default CartItem;