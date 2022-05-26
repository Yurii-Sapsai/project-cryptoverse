import './App.sass'

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Cryptocurrencies from './components/Cryptocurrencies/Cryptocurrencies'
import Exchanges from './components/Exchanges/Exchanges';
import News from './components/News/News';
import CryptoDetails from './components/CryptoDetails/CryptoDetails';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'

import { Grid } from '@mui/material';

function App() {
  return (
  
      <Router>

            <Grid container maxWidth="100%">
                  <Grid item xs={12} sm={4} md={3}>
                      <nav>
                            <Navbar/>
                      </nav>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                      <main>
                            <Routes>
                                  <Route path="/" element={<Home/>} />
                                  <Route path="/cryptocurrencies" element={<Cryptocurrencies/>} />
                                  <Route path="/exchanges" element={<Exchanges/>} />
                                  <Route path="/news" element={<News/>} />
                                  
                                  <Route path="/crypto/:coinId" element={<CryptoDetails/>} />
                            </Routes>
                      </main>
                  </Grid>
            </Grid>

      </Router>
  
  );
}

export default App;
