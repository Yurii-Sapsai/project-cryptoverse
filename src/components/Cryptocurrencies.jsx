import React, { useState, useEffect } from 'react';

import millify from 'millify';
import { NavLink } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoAPI';

import Loader from './Loader';

import { Grid, Box, Typography, TextField, styled } from '@mui/material';

const CryptocurrenciesWrapper = styled(Box)(() => ({
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start"
}
))
const CryptocurrenciesCard = styled(Box)(() => ({
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "10px",
  fontSize: "14px",
  '&:hover': {
    boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.3)"
  },
  '& p': { marginTop: "5px" }
}
))


function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);

  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />

  return (
    <CryptocurrenciesWrapper >

      {simplified ? null : <TextField
        label="Search Cryptocurrency"
        variant="standard"
        sx={{ marginBottom: "25px" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />}

      <Grid container spacing={2}>

        {cryptos?.map((currency) => (

          <Grid item xs={6} sm={6} md={4} lg={3}>

            <CryptocurrenciesCard >
              <NavLink to={`/crypto/${currency.uuid}`} key={currency.uuid} style={{ textDecoration: "none", color: "black", cursor: "pointer" }}>

                <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
                  <Typography component={"h4"} sx={{ fontWeight: "500" }}>
                    {currency.rank}. {currency.name}
                  </Typography>
                  <img src={currency.iconUrl} alt="icon" style={{ height: '25px' }} />
                </Box>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Price: {millify(currency.change)}%</p>

              </NavLink>
            </CryptocurrenciesCard>

          </Grid >
        ))}

      </Grid>

    </CryptocurrenciesWrapper>
  )
}

export default Cryptocurrencies;