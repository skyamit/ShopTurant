import { useEffect, useState } from "react";
import Config from "../config/Config";

function Product(props) {
    const data = props.data;
    const url = Config.url;
    const [productList, setProductList] = useState(); 
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

    return (
        <div className="product">
            <div className="content">
                <div className="" >
                    <h3 className="p-2">{props.data.title}</h3>
                </div>
                <div className="productImageDiv">
                    <div className="first-line" >
                        {
                            productList && productList[0] && (
                                <div className="productImage">
                                    <img src={productList[0].imageId} className="productSingleImage" alt="image"/>
                                </div>
                            )
                        }
                        {   
                            productList && productList[2] && (
                                <div className="productImage">
                                    <img src={productList[2].imageId} className="productSingleImage" alt="image"/>
                                </div>
                            )
                        }  
                    </div>
                    <div className="second-line" >                  
                        {
                            productList && productList[1] && (
                                <div className="productImage">
                                    <img src={productList[1].imageId} className="productSingleImage" alt="image"/>
                                </div>
                            )
                        }
                        {
                            productList && productList[3] && (
                                <div className="productImage">
                                    <img src={productList[3].imageId} className="productSingleImage" alt="image"/>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="" >
                    <h5 className="p-2"><a href="#">See more</a></h5>
                </div>
            </div>
        </div>
    );
}

export default Product;