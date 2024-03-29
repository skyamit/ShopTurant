import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './components/header/Header';
import Home from './home/Home';
import Footer from './components/footer/Footer';
import { Routes,  Route} from "react-router-dom";
import AddProduct from './myproducts/AddProduct';
import GetProducts from './myproducts/GetProducts';
import Search from './search/Search';
import SingleProductDetails from './product/SingleProductDetails';
import { createContext, useState } from 'react';
import Order from './orders/Order';
import EditAddress from './components/address/EditAddress';
const CartContext = createContext();
const IdContext = createContext();

function App() {
  const [reloadCart, setReloadCart] = useState(1);
  const [id, setId] = useState(0);
  return (
    <>
    <CartContext.Provider value={{reloadCart,setReloadCart}}>
      <IdContext.Provider value={{id, setId}} >
        <Header/>
        <div className='body'>
          <Routes>    
            <Route path="/" element={<Home />} exact />
            <Route path="/addProduct" element={<AddProduct />} exact />
            <Route path="/getProducts" element={<GetProducts />} exact />
            <Route path="/search/:search" element={<Search />}  />
            <Route path="/product/:productId" element={<SingleProductDetails />}  />
            <Route path="/order" element={<Order />}  />
            <Route path="/address" element={<EditAddress />}  />
          </Routes>
        </div>
        <Footer/>
      </IdContext.Provider>
    </CartContext.Provider>
    </>
  );
}

export default App;
export {CartContext, IdContext};
