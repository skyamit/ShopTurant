import { useEffect, useState } from "react";
import Config from "../config/Config";
import './Product.css';
import { useNavigate } from "react-router-dom";

function Product(props) {
    const data = props.data;
    const url = Config.url;
    const [productList, setProductList] = useState(); 
    const navigate = useNavigate();
    const fetchImagesBasedOnCategory = async ()=>{
        await fetch(url+"/productsByCategory/"+data.id,{
            method:"POST"
        }).then(res => res.json())
        .then(res => setProductList(res.data))
        .then(res => console.log(res));
    };

    useEffect(()=>{
        fetchImagesBasedOnCategory();
    },[]);
    const navigateToSearch = ()=>{
        navigate("/search/"+props.data.title);
    }
    const product0 = ()=>{
        navigate("/product/"+productList[0].id)
    }
    const product1 = ()=>{
        navigate("/product/"+productList[1].id)
    }
    const product2 = ()=>{
        navigate("/product/"+productList[2].id)
    }
    const product3 = ()=>{
        navigate("/product/"+productList[3].id)
    }
    return (
        <div className="product">
            <div className="content">
                <div className="" >
                    <h3 className="p-2 productTitle">{props.data.title}</h3>
                </div>
                <div className="productImageDiv">
                    <div className="first-line" >
                        {
                            productList && productList[0] && (
                                <div className="productImage pointer" >
                                    <img src={productList[0].imageId} onClick={product0} className="productSingleImage" alt="image"/>
                                </div>
                            )
                        }
                        {   
                            productList && productList[2] && (
                                <div className="productImage pointer" >
                                    <img src={productList[2].imageId} onClick={product2} className="productSingleImage" alt="image"/>
                                </div>
                            )
                        }  
                    </div>
                    <div className="second-line" >                  
                        {
                            productList && productList[1] && (
                                <div className="productImage pointer" >
                                    <img src={productList[1].imageId} onClick={product1} className="productSingleImage" alt="image"/>
                                </div>
                            )
                        }
                        {
                            productList && productList[3] && (
                                <div className="productImage pointer" >
                                    <img src={productList[3].imageId} onClick={product3} className="productSingleImage" alt="image"/>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="" >
                    <h5 className="p-2 productSeeMore text-primary pointer" onClick={navigateToSearch}>See more</h5>
                </div>
            </div>
        </div>
    );
}

export default Product;