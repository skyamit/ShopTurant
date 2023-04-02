import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './components/header/Header';
import Slide from './components/slide/Slide';
import Home from './home/Home';
import Footer from './components/footer/Footer';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
function App() {
  return (
    <>
    <Header/>
    <Slide/>
      <Routes>    
        <Route path="/" element={<Home />} exact />
      </Routes>
    <Footer/>
    </>
  );
}

export default App;
