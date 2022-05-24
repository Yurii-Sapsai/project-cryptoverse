import React from 'react'
import './Home.sass'
import millify from 'millify'
import {NavLink} from 'react-router-dom'

import { useGetCryptosQuery } from '../../services/cryptoAPI'

import Cryptocurrencies from '../Cryptocurrencies/Cryptocurrencies'
import News from '../News/News'

function Home() {

  const {data, isFetching} = useGetCryptosQuery(10)

  const globalStats = data?.data?.stats

  if (isFetching) return 'Loading...'

  return (
    <div className='home__wrapper'>
      
        <h2 className='home__wrapper-title'> Global Crypto Stats</h2>

        <div className='home__stats-container'>
              <div className='home__stats-item'>
                  <p>Total Cryptocurrencies</p>
                  <span>{globalStats.total}</span>
              </div>
              <div className='home__stats-item'>
                  <p>Total Market Cap</p>
                  <span>{millify(globalStats.totalMarketCap)}</span>
              </div>
              <div className='home__stats-item'>
                  <p>Total Markets</p>
                  <span>{millify(globalStats.totalMarkets)}</span>
              </div>
              <div className='home__stats-item'>
                  <p>Total Exchages</p>
                  <span>{millify(globalStats.totalExchanges)}</span>
              </div>
              <div className='home__stats-item'>
                  <p>Total 24 Volume</p>
                  <span>{millify(globalStats.total24hVolume)}</span>
              </div>
        </div>

        <div className='home__top10-title'>
              <h2>Top 10 Cryptocurrencies</h2>
              <NavLink to='/cryptocurrencies'><h3>Show more</h3></NavLink>
        </div>
        <Cryptocurrencies simplified/> 

        <div className='home__latestNews-title'>
              <h2>Latest Crypto News</h2>
              <NavLink to='/news'><h3>Show more</h3></NavLink>
        </div>
        <News simplified/> 

    </div>
  )
}

export default Home