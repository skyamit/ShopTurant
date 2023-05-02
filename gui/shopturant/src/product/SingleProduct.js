import './SingleProduct.css';
import {limitString, Config} from '../config/Config';

function SingleProduct(props) {
    console.log(props);

    return (
        <div className='singleProduct'>
            <div className='SingleProductDelete'>
                <img className='SingleProductDeleteImage' src='./options.png' alt='options' />
            </div>
            <div className='singleProductImageDiv'>
                <img className='singleProductImage' src={props.data.imageId} alt='product Image' />
            </div>
            <div className='SingleProductTitleDiv'>
                <span className='SingleProductTitle'>{limitString(props.data.title)}</span>
            </div>           
            <div className='SingleProductPriceDiv'>
                <span className='SingleProductPrice'>&#x20B9;{eval(props.data.price - (props.data.price/props.data.discount)).toFixed(2)}</span>
                <span className='SingleOProductPrice'>&#x20B9;<del>{props.data.price}</del></span>
            </div>
            <div >
            </div>
        </div>
    );
}

export default SingleProduct;