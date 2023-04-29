import { useEffect, useState } from "react";
import Config from "../config/Config";
import SingleProduct from "../product/SingleProduct";
import './GetProducts.css';

function GetProducts() {
    
    const url = Config.url;
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [products, setProducts] = useState();
    const categoryLoad = async () => {
        await fetch(url + "/product/"+userId, {
        method: "POST",
        })
        .then((res) => res.json())
        .then((res) => setProducts(res?.data));
    };

    useEffect(()=>{
        setUserId(sessionStorage.getItem("userId"));
        categoryLoad();
    },[]);

    return (
        <div className="getProducts">
            {
                products && products.map((e)=>{
                    return (<SingleProduct key={e.id} data={e}/>);
                })
            }
        </div>
    );
}

export default GetProducts;