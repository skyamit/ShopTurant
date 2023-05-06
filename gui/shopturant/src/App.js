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
const CartContext = createContext();

function App() {
  const [reloadCart, setReloadCart] = useState(1);
  return (
    <>
    <CartContext.Provider value={{reloadCart,setReloadCart}}>
      <Header/>
        <Routes>    
          <Route path="/" element={<Home />} exact />
          <Route path="/addProduct" element={<AddProduct />} exact />
          <Route path="/getProducts" element={<GetProducts />} exact />
          <Route path="/search/:search" element={<Search />}  />
          <Route path="/product/:productId" element={<SingleProductDetails />}  />
        </Routes>
      <Footer/>
    </CartContext.Provider>
    </>
  );
}

export default App;
export {CartContext};
