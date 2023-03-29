import Grid from '@mui/material/Grid';
import './Header.css';
import logo from '../../images/ShopTurant.png';
import cart from '../../images/carts.png';
import NotLoggedIn from '../notloggedin/NotLoggedIn';
import LoggedIn from '../loggedin/LoggedIn';

function Header() {
    return (
    <Grid className='header' container spacing={1}>
        <Grid className='icon'  item xs={3}>
            <img src={logo} className="logo  pl-2" alt="logo" />
        </Grid>
        <Grid className='search' item xs={6}>
            <input type='text' className='searchInput' placeholder='Search ShopTurant'/>
            <button className='searchButton' type='submit'>Search</button>
        </Grid>
        <Grid className='detail' item xs={3}>
            <LoggedIn/>
            <img src={cart} className="cart  pl-2" alt="cart" />
        </Grid>
    </Grid>
    );
}
  
  export default Header;