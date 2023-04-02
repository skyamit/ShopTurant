import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './components/header/Header';
import Slide from './components/slide/Slide';
import Home from './home/Home';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
    <Header/>
    <Slide/>
    <Home/>
    <Footer/>
    </>
  );
}

export default App;
