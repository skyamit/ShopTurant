import './SingleProduct.css';
import Config, {limitString,calculateActualPrice} from '../config/Config';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SingleProductOwner(props) {
    const [productActive, setProductActive] = useState(true);
    const navigate = useNavigate();
    const openProduct = ()=>{
        navigate('/product/'+props.data.id);
    };
    const deleteProduct = ()=>{
        fetch(Config.url+"/product/"+props.data.id, {
            method:"DELETE"
        })
        .then(data => data.json())
        .then(data => {
            console.log(data);
            if(data.statusCode === 200) {
                setProductActive(false);
            }
        })
    }
    useEffect(()=>{

    }, [productActive]);
    return (
        <>
        {
            productActive && (
            <div className='singleProduct'>
                <div className='singleProductImageDiv pointer' onClick={openProduct}>
                    <img className='singleProductImage' src={props.data.imageId} alt='product'  />
                </div>
                <div className='SingleProductTitleDiv'>
                    <span className='SingleProductTitle' >{limitString(props.data.title)}</span>
                </div>           
                <div className='SingleProductPriceDiv'>
                    <span className='SingleProductPrice'>&#x20B9;{calculateActualPrice(props.data.price,props.data.discount)}</span>
                    <span className='SingleOProductPrice'>&#x20B9;<del>{props.data.price}</del></span>
                </div>
                <div className='d-flex'>
                    <btn className="btn btn-danger m-2 w-50" onClick={deleteProduct} >
                        <i className="fa-solid fa-trash-can fa-sm white" ></i> DELETE
                    </btn>
                    <btn className="btn btn-secondary m-2 w-50">
                        <i className="fa-solid fa-pen-to-square fa-sm white" ></i> EDIT
                    </btn>
                </div>
            </div>
            )
        }
        </>
    );
}

export default SingleProductOwner;