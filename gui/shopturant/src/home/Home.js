import Product from '../components/product';
import { useEffect, useState } from 'react';
import './Home.css';
import Config from '../config/Config';
import Slide from '../components/slide/Slide';
function Home() {
    const url = Config.url;
    const [data, setData] = useState(null);

    const fetchData = async ()=>{
        await fetch(url+"/category",{
            method:"POST"
        }).then(res => res.json())
        .then(res => setData(res.data));
    }
    useEffect(()=> {
        fetchData();
    },[]);
    //Different Category | Upto 20% off 
    return (
        <div >
            <Slide/>
            <div className='outerDiv'>
            <div className="home" >
            {
            data &&
                data.map((d) => (
                    <Product key={d.id} data={d}/>
                ))
            }
            </div>
        </div>
        </div>
    );
}

export default Home;