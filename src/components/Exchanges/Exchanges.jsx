import React from 'react'
import './Exchanges.sass'

import { useGetExchangesQuery, useGetExchangesIconsQuery } from '../../services/cryptoExchanges'

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


function Exchanges() {

 
  const {data: exchanges, isFetching} = useGetExchangesQuery();
  console.log(exchanges)
  const {data} = useGetExchangesIconsQuery()
  console.log(data)

  
  return (
    <Container maxWidth={'100%'} className={'exchanges__wrapper'}>
      <h3>Popular cryptocurrency exchanges</h3>
            {exchanges?.map((exchange)=>(
                <Grid container className={'exchanges__container'} maxWidth="xl">
                    <Grid item md={6} xs={12}>
                        {exchange?.name}
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <a href={exchange?.website}>{exchange?.website}</a>
                    </Grid>
                </Grid>
            ))}
  </Container>
  )
}

export default Exchanges