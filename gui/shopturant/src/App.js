import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './components/header/Header';
import Home from './home/Home';
import Footer from './components/footer/Footer';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import AddProduct from './myproducts/AddProduct';
import GetProducts from './myproducts/GetProducts';
function App() {
  return (
    <>
    <Header/>
      <Routes>    
        <Route path="/" element={<Home />} exact />
        <Route path="/addProduct" element={<AddProduct />} exact />
        <Route path="/getProducts" element={<GetProducts />} exact />
      </Routes>
    <Footer/>
    </>
  );
}

export default App;
