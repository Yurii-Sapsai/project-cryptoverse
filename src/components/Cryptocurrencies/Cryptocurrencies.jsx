import React, { useState, useEffect } from 'react'

import millify from 'millify'
import { NavLink } from 'react-router-dom'
import { useGetCryptosQuery } from '../../services/cryptoAPI'

import Loader from '../Loader/Loader';

import { Grid, Box, Typography, TextField } from '@mui/material';


function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {

    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)

  }, [cryptosList, searchTerm])

  if (isFetching) return <Loader />

  return (
    <Box sx={{ padding: "25px", backgroundColor: "#f1f2f5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"start"}}>

      {simplified ? null : <TextField
        label="Search Cryptocurrency"
        variant="standard"
        sx={{ marginBottom: "25px" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />}

      <Grid container maxWidth="100%" spacing={2}>

        {cryptos?.map((currency) => (

          <Grid item xs={6} sm={6} md={4} lg={3}>
            <NavLink to={`/crypto/${currency.uuid}`} key={currency.uuid} style={{ textDecoration: "none", color: "black", cursor: "pointer" }}>

              <Box sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "14px",
                '&:hover': {
                  boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.3)"
                },
                '& p': { marginTop: "5px" }
              }} >

                <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                  <Typography component={"h4"}>
                    {currency.rank}. {currency.name}
                  </Typography>
                  <img src={currency.iconUrl} alt="icon" style={{ height: '25px' }} />
                </Box>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Price: {millify(currency.change)}%</p>
              </Box>

            </NavLink>
          </Grid >

        ))}

      </Grid>

    </Box>
  )
}

export default Cryptocurrencies