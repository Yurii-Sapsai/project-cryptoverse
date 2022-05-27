import React from 'react'
import './Exchanges.sass'

import { useGetExchangesQuery, useGetExchangesIconsQuery } from '../../services/cryptoExchanges'


import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Loader from '../Loader/Loader';


function Exchanges() {


  const { data: exchanges, isFetching } = useGetExchangesQuery();

  if (isFetching) return <Loader />

  return (
    <Container maxWidth={'100%'} className={'exchanges__wrapper'}>
      <h3>Popular cryptocurrency exchanges</h3>
      {exchanges?.map((exchange) => (
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