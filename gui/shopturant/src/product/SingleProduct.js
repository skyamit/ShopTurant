import './SingleProduct.css';
import {limitString,calculateActualPrice} from '../config/Config';
import { useNavigate } from 'react-router-dom';

function SingleProduct(props) {
    console.log(props);
    const navigate = useNavigate();
    const openProduct = ()=>{
        navigate('/product/'+props.data.id);
    };
    return (
        <div className='singleProduct'>
            <div className='singleProductImageDiv pointer'  onClick={openProduct}>
                <img className='singleProductImage' src={props.data.imageId} alt='product' />
            </div>
            <div className='SingleProductTitleDiv'>
                <span className='SingleProductTitle' >{limitString(props.data.title)}</span>
            </div>           
            <div className='SingleProductPriceDiv'>
                <span className='SingleProductPrice'>&#x20B9;{calculateActualPrice(props.data.price,props.data.discount)}</span>
                <span className='SingleOProductPrice'>&#x20B9;<del>{props.data.price}</del></span>
            </div>
            <div className='d-flex justify-content-around'>
            </div>
        </div>
    );
}

export default SingleProduct;