import React from 'react'

import { useGetExchangesQuery, useGetExchangesIconsQuery } from '../../services/cryptoExchanges'


function Exchanges() {

 
  const {data: exchanges, isFetching} = useGetExchangesQuery();
  console.log(exchanges)
  const {data} = useGetExchangesIconsQuery()
  console.log(data)
  


  
  return (
    <div>Exchanges</div>
  )
}

export default Exchanges