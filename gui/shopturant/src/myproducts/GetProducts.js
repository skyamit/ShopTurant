import { useContext, useEffect, useState } from "react";
import Config from "../config/Config";
import './GetProducts.css';
import { IdContext } from "../App";
import SingleProductOwner from "../product/SingleProductOwner";

function GetProducts() {
    
    const url = Config.url;
    const [products, setProducts] = useState();
    const idContext = useContext(IdContext);

    const categoryLoad = async () => {
        await fetch(url + "/product/"+idContext.id, {
        method: "POST",
        })
        .then((res) => res.json())
        .then((res) => setProducts(res?.data));
    };

    useEffect(()=>{
        categoryLoad();
    },[]);

    return (
        <div className="getProducts">
            {
                products && products.map((e)=>{
                    return (<SingleProductOwner key={e.id} data={e}/>);
                })
            }
        </div>
    );
}

export default GetProducts;