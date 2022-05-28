import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom'
import millify from 'millify'

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoAPI'

import { Box, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import DoDisturbOutlinedIcon from '@mui/icons-material/DoDisturbOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import LineChart from '../LineChart/LineChart';
import Loader from '../Loader/Loader';

function CryptoDetails() {

  const { coinId } = useParams()

  const [timeperiod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;

  console.log(data)
  console.log(cryptoDetails)

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <MonetizationOnIcon /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <ConfirmationNumberOutlinedIcon /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <MonetizationOnIcon /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <EmojiEventsOutlinedIcon /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <ShowChartOutlinedIcon /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <LocalAtmOutlinedIcon /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlinedIcon /> : <DoDisturbOutlinedIcon />, icon: <ErrorOutlineOutlinedIcon /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ErrorOutlineOutlinedIcon /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ErrorOutlineOutlinedIcon /> },
  ];

  if (isFetching) return <Loader />

  return (
    <Box
      maxWidth="xl"
      sx={{
        padding: "25px",
        margin: "0px"
      }}>

      <Box sx={{
        textAlign: "center"
      }}>
        <Typography variant="h5" component="h1">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Typography>
        <Typography sx={{ padding: "25px 0px" }}>
          {cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply.
        </Typography>
      </Box>

      <FormControl sx={{ width: "200px", marginBottom: "25px" }}>
        <InputLabel >Select Time Priod</InputLabel>
        <Select
          value={timeperiod}
          label="Select Time Priod"
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          {time.map((date, index) => <MenuItem key={index} value={date}>{date}</MenuItem>)}
        </Select>
      </FormControl>

      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />

      <Grid container sx={{ margin: "25px 0px" }}>
        <Grid item xs={12} sm={12} md={6}>
          <h4>{cryptoDetails?.name} Value Statistics</h4>
          <p>An overview showing the statistics of {cryptoDetails?.name}</p>
          <List>
            {stats.map(({ icon, title, value, index }) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={title + " " + value} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <h4>Other Statistics</h4>
          <p>An overview showing the statistics of all cryptocurrencies</p>
          <List>
            {genericStats.map(({ icon, title, value, index }) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={title + " " + value} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <h4>What is {cryptoDetails?.name}</h4>
          {HTMLReactParser(`${cryptoDetails?.description}`)}
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <h4>{cryptoDetails?.name} Links</h4>

          {cryptoDetails?.links.map((link, index) => (
            <div key={index}>
              <h4>{link?.name}</h4>
              <a href={link?.url}>{link?.name}</a>
            </div>
          ))}
        </Grid>
      </Grid>

    </Box>

  )
}

export default CryptoDetails