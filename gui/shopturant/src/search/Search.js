import { useEffect, useState } from "react";
import Config from "../config/Config";
import { useParams } from "react-router-dom";
import SingleProduct from "../product/SingleProduct";

function Search() {
    const { search } = useParams();
    const [data, setData] = useState(); 
    const url = Config.url;
    const fetchSearch = async ()=>{
        await fetch(url + "/product/search?search="+search+"&offset=0", {
            method: "POST"
        })
        .then((res) =>  res.json())
        .then((res) => setData(res.data));
    }
    useEffect(()=>{
        fetchSearch();
        console.log(search);
    },[search]);

    return (
        <div className="getProducts">
        {
        data &&
            data.map((d) => (
                <SingleProduct key={d.id} data={d}/>
            ))
        }
        </div>
    )
}


export default Search;