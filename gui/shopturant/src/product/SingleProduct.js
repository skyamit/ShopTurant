import './SingleProduct.css';
import {limitString,calculateActualPrice, Config} from '../config/Config';
import { useNavigate } from 'react-router-dom';

function SingleProduct(props) {
    console.log(props);
    const navigate = useNavigate();
    const openProduct = ()=>{
        navigate('/product/'+props.data.id);
    };

    return (
        <div className='singleProduct' onClick={openProduct}>
            <div className='SingleProductDelete'>
                <img className='SingleProductDeleteImage' src='/options.png' alt='options' />
            </div>
            <div className='singleProductImageDiv'>
                <img className='singleProductImage' src={props.data.imageId} alt='product Image' />
            </div>
            <div className='SingleProductTitleDiv'>
                <span className='SingleProductTitle' >{limitString(props.data.title)}</span>
            </div>           
            <div className='SingleProductPriceDiv'>
                <span className='SingleProductPrice'>&#x20B9;{calculateActualPrice(props.data.price,props.data.discount)}</span>
                <span className='SingleOProductPrice'>&#x20B9;<del>{props.data.price}</del></span>
            </div>
            <div >
            </div>
        </div>
    );
}

export default SingleProduct;