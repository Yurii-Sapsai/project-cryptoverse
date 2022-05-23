import React from 'react'
import './Navbar.sass'

import logo from '../../images/cryptocurrency.png'
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
        <div className="navbar__header">
            <img src={logo} alt="logo" />
            <h1>CryptoWorld</h1>
        </div>
        <ul className='navbar__list'>

            <NavLink to='/'>
                <li className='navbar__list-item'>
                    <HomeIcon style={{height:'18px'}}/>
                    <p>Home</p>
                </li>
            </NavLink>

            <NavLink to='cryptocurrencies'>
                <li className='navbar__list-item'>
                    <BarChartIcon style={{height:'18px'}}/>
                    <p>Cryptocurrencies</p>
                </li>
            </NavLink>

            <NavLink to='exchanges'>
                <li className='navbar__list-item'>
                    <CurrencyExchangeIcon style={{height:'18px'}}/>
                    <p>Exchanges</p>
                </li>
            </NavLink>

            <NavLink to='news'>
                <li className='navbar__list-item'>
                    <NewspaperIcon style={{height:'18px'}}/>
                    <p>News</p>
                </li>
            </NavLink>
            
        </ul>
    </div>
  )
}

export default Navbar