import React, {useState, useEffect} from 'react'
import './Cryptocurrencies.sass'
import millify from 'millify'
import { NavLink } from 'react-router-dom'

import { useGetCryptosQuery } from '../../services/cryptoAPI'


function Cryptocurrencies({simplified}) {
  const count = simplified ? 10 : 100
  
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{

    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)

  },[cryptosList, searchTerm])

  if(isFetching) return 'Loading...'

  return (
    <div className='cryptocurrencies__wrapper'>
      {simplified ? null : <div className='cryptocurrencies__search'>
                                <input type="text" placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}/>
                            </div>}
      <div className='cryptocurrencies__container'>
          {cryptos?.map((currency)=>(
              <NavLink to={`/crypto/${currency.id}`} key={currency.uuid} className='cryptocurrencies__link'>
              <div className='cryptocurrencies__card'>
                    <div className='cryptocurrencies__card-title'>
                        <h4>{currency.rank}. {currency.name}</h4>
                        <img src={currency.iconUrl} alt="" style={{height:'25px'}}/>
                    </div>
                    
                    <p>Price: {millify(currency.price)}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>Price: {millify(currency.change)}%</p>
              </div>
              </NavLink>
          ))}
    </div>
      
    </div>
  )
}

export default Cryptocurrencies