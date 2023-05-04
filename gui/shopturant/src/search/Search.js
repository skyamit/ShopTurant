import { useEffect, useState } from "react";
import Config from "../config/Config";
import { useParams } from "react-router-dom";
import SingleProduct from "../product/SingleProduct";
import './Search.css';

function Search() {
    const { search } = useParams();
    const [data, setData] = useState(); 
    const [hasData, setHasData] = useState(true);
    const url = Config.url;
    const fetchSearch = async ()=>{
        await fetch(url + "/product/search?search="+search+"&offset=0", {
            method: "POST"
        })
        .then((res) =>  res.json())
        .then((res) => {
            setData(res.data)
            if(res.data.length===0) {
                setHasData(false);
            }
        })
        .then(res => console.log(res));
    }
    useEffect(()=>{
        fetchSearch();
        console.log(data);
    },[search]);

    return (
        <div className="getProducts">
        {
            data && data.map((d) => (
                    <SingleProduct key={d.id} data={d}/>
                ))
        }
        {
            !hasData && (
                <img src="/noProductsFound.jpg" alt="no products found" className="noProductsFound" />
            )
        }
        </div>
    )
}


export default Search;