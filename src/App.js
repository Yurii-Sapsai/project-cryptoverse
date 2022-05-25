import './App.sass'

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Cryptocurrencies from './components/Cryptocurrencies/Cryptocurrencies'
import Exchanges from './components/Exchanges/Exchanges';
import News from './components/News/News';
import CryptoDetails from './components/CryptoDetails/CryptoDetails';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <Router>

            <nav>
              <Navbar/>
            </nav>

            <main>
              <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/cryptocurrencies" element={<Cryptocurrencies/>} />
                    <Route path="/exchanges" element={<Exchanges/>} />
                    <Route path="/news" element={<News/>} />
                    
                    <Route path="/crypto/:coinId" element={<CryptoDetails/>} />
              </Routes>
            </main>

      </Router>
    </div>
  );
}

export default App;
