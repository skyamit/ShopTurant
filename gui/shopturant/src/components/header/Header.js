import Grid from '@mui/material/Grid';
import './Header.css';
import logo from '../../images/ShopTurant.png';
import cart from '../../images/carts.png';
import NotLoggedIn from '../notloggedin/NotLoggedIn';
import LoggedIn from '../loggedin/LoggedIn';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../toast/Toast';
import { useContext } from 'react';
import Config from '../../config/Config';
import { CartContext, IdContext } from '../../App';
import Cart from '../../cart/Cart';

const CartVisibleContext = createContext();

function Header() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const cartContext = useContext(CartContext);
    const idContext = useContext(IdContext);
    const url = Config.url;
    const [count, setCount] = useState(0);
    const [cartVisible, setCartVisible] = useState(false);
    
    useEffect(()=>{
        countCartItem();
        reload();
    },[cartContext.reloadCart, idContext.id]);

    const home = ()=> {
        navigate('/');
    }
    const search = ()=>{
        navigate('/search/'+searchText);
    };

    const countCartItem = async ()=>{
        if(idContext.id) {
            await fetch(url+"/cart/count/"+idContext.id, {
                method:"POST"
            })
            .then((res) => res.json())
            .then((res) => {
                setCount(res.data)
                console.log(res);
            });
        }
        else{
            setCount(0)
        }
    }

    const setCartV = () =>{
        setCartVisible(true)
    }

    const reload = ()=>{
        window.addEventListener("resize", (event) => {
            if(event.currentTarget.innerWidth < 800) {
                document.getElementById("largeScreenSearch").hidden = true;
                document.getElementById("smallScreenSearch").hidden = false;
            }
            else {
                document.getElementById("largeScreenSearch").hidden = false;
                document.getElementById("smallScreenSearch").hidden = true;
            }
        });
    }

    return (
        <>
        <div>
            <div className=''>
                <div className='header d-flex align-center justify-content-between'>
                    <div className='logo'>
                        <img src={logo} className="logo  pl-2 pointer" onClick={home} alt="logo" />
                    </div>
                    <div id="largeScreenSearch" className='search flex-grow-1 '>
                        <input type='text' className='searchInput' onChange={(e) => {setSearchText(e.target.value)}} placeholder='Search ShopTurant'/>
                        <button className='searchButton' onClick={search} type='submit'>Search</button>
                    </div>
                    <div className='details d-flex align-center '>
                        { idContext.id!==0 && (<LoggedIn key={0} />) }
                        { idContext.id===0 && (<NotLoggedIn key={0} />) }
                        
                        <div onClick={setCartV} className='position-relative'>
                            <div className='cartItemCount'>
                                {count}
                            </div>
                            <img src={cart} className="cart  pl-2" alt="cart" />
                        </div>
                    </div>
                </div>
                <div id="smallScreenSearch">
                    <div className='search flex-grow-1'>
                        <input type='text' className='searchInput' onChange={(e) => {setSearchText(e.target.value)}} placeholder='Search ShopTurant'/>
                        <button className='searchButton' onClick={search} type='submit'>Search</button>
                    </div>
                </div>
            </div>

            <CartVisibleContext.Provider value={{cartVisible, setCartVisible}} >
                {cartVisible && <Cart /> }
            </CartVisibleContext.Provider>
        </div>
        {/* <Grid className='header' container spacing={1}>
            <Grid className='icon'  item xs={3}>
                <img src={logo} className="logo  pl-2 pointer" onClick={home} alt="logo" />
            </Grid>
            <Grid className='search' item xs={6}>
                <input type='text' className='searchInput' onChange={(e) => {setSearchText(e.target.value)}} placeholder='Search ShopTurant'/>
                <button className='searchButton' onClick={search} type='submit'>Search</button>
            </Grid>
            <Grid className='detail' item xs={3}>
                { idContext.id && (<LoggedIn />) }
                { !idContext.id && (<NotLoggedIn />) }
                <div onClick={setCartV}>
                    <div className='cartItemCount'>
                        {count}
                    </div>
                    <img src={cart} className="cart  pl-2" alt="cart" />
                </div>
            </Grid>
            <CartVisibleContext.Provider value={{cartVisible, setCartVisible}} >
                {cartVisible && <Cart /> }
            </CartVisibleContext.Provider>
        </Grid> */}
        </>
        
    );
}
  
  export default Header;
  export {CartVisibleContext};