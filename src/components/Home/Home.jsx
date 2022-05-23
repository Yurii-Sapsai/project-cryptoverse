import React from 'react'
import './Home.sass'
import millify from 'millify'

import { useGetCryptosQuery } from '../../services/cryptoAPI'

function Home() {

  const {data, isFetching} = useGetCryptosQuery()

  const globalStats = data?.data?.stats

  if (isFetching) return 'Loading...'

  return (
    <div className='home'>
      
        <h2> Global Crypto Stats</h2>

        <div className='home__stats'>
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

        <div className='home__container'>

        </div>

    </div>
  )
}

export default Home