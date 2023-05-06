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
import { CartContext } from '../../App';
import Cart from '../../cart/Cart';

const CartVisibleContext = createContext();

function Header() {
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const cartContext = useContext(CartContext);
    const url = Config.url;
    const [count, setCount] = useState(0);
    const [cartVisible, setCartVisible] = useState(false);
    const checkLogin = ()=> {
        setUserId(sessionStorage.getItem("userId"));
    }
    useEffect(()=>{
        setUserId(sessionStorage.getItem("userId"));
        countCartItem();
    },[userId, cartContext.reloadCart]);

    const home = ()=> {
        navigate('/');
    }
    const search = ()=>{
        navigate('/search/'+searchText);
    };

    const countCartItem = async ()=>{
        userId && await fetch(url+"/cart/count/"+userId, {
            method:"POST"
        })
        .then((res) => res.json())
        .then((res) => {
            setCount(res.data)
            console.log(res);
        });
    }

    const setCartV = () =>{
        setCartVisible(true)
    }

    return (
    <Grid className='header' container spacing={1}>
        <Grid className='icon'  item xs={3}>
            <img src={logo} className="logo  pl-2 pointer" onClick={home} alt="logo" />
        </Grid>
        <Grid className='search' item xs={6}>
            <input type='text' className='searchInput' onChange={(e) => {setSearchText(e.target.value)}} placeholder='Search ShopTurant'/>
            <button className='searchButton' onClick={search} type='submit'>Search</button>
        </Grid>
        <Grid className='detail' item xs={3}>
            { userId && (<LoggedIn checkLogin={checkLogin} />) }
            { !userId && (<NotLoggedIn checkLogin={checkLogin}/>) }
            <div onClick={setCartV}>
                <div className='cartItemCount'>
                    {count}
                </div>
                <img src={cart} className="cart  pl-2" alt="cart" />
            </div>
        </Grid>
        {!userId && <Toast type={'error'} message={'Logged Out Successfully..'} />}
        {userId && <Toast type={'success'} message={'Logged In Successfully..'} />}
        <CartVisibleContext.Provider value={{cartVisible, setCartVisible}} >
            {cartVisible && <Cart /> }
        </CartVisibleContext.Provider>
    </Grid>
    );
}
  
  export default Header;
  export {CartVisibleContext};