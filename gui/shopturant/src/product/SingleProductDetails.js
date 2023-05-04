import './SingleProductDetails.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Config from "../config/Config";

function SingleProductDetails() {
    const {productId} = useParams();
    const [data, setData] = useState();
    const url = Config.url;
    const fetchData = ()=>{
        fetch(url+"/product/"+productId,{
            method: "GET",
            })
            .then((res) => res.json())
            .then((res) => {
                setData(res?.data)
                console.log(data)
            });
    }
    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <div className='container'>
        {
            data && (
            <div className='SingleProductDetailsDiv'>
                <div className="m-3 p-3">
                        <h3>{data.title}</h3>
                    <div className="">
                        <div className='row'>
                            <div className="col-12 col-lg-4 col-md-12 pt-5">
                                <img className="singleProductDetailsImage" src={data.imageId} alt="product image" />
                            </div>
                            <div className="col-12 col-lg-8 col-md-12 p-3">
                                <div className='SingleProductPriceDiv'>
                                    <span className='SingleProductDetailsPrice'>&#x20B9;{eval(data.price - (data.price/data.discount)).toFixed(2)}</span>
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
                                <div>
                                    <div>
                                        <div className='inline cartAdd'>

                                        </div>
                                        <div  className='inline'>
                                            Qty
                                        </div>
                                        <div  className='inline cartAdd'>
                                            +
                                        </div>
                                    </div>
                                    <div>
                                        <button>Add to Cart</button>
                                    </div>
                                </div>
                                <hr/>
                                <div>
                                    Temporarily out of stock
                                </div>
                                <hr/>
                                <div>
                                    {data.summary}
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