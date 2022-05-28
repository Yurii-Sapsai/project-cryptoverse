import React from 'react'

import { useGetExchangesQuery } from '../../services/cryptoExchanges'

import {Box, Grid, Typography} from '@mui/material'

import Loader from '../Loader/Loader';


function Exchanges() {


  const { data: exchanges, isFetching } = useGetExchangesQuery();

  if (isFetching) return <Loader />

  return (
    <Box sx={{padding:"25px"}}>
      <Typography variant='' component={"h2"} sx={{fontWeight:"300", textAlign:"center", marginBottom:"20px"}}>Popular cryptocurrency exchanges</Typography>
      {exchanges?.map((exchange) => (
        <Grid container sx={{backgroundColor:"white", 
                             borderRadius: "8px", 
                             padding:"10px", 
                             marginBottom:"15px",
                             '&:hover': {
                              boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.3)"
                            },
                            '& a': { textDecoration:"none", color:"black" }}}>
          <Grid item md={6} xs={12}>
            {exchange?.name}
          </Grid>
          <Grid item md={6} xs={12}>
            <a href={exchange?.website}>{exchange?.website}</a>
          </Grid>
        </Grid>
      ))}
    </Box>
  )
}

export default Exchanges