import React, { useState } from 'react'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../../services/cryptoAPI';
import { Box, Grid, Select, FormControl, InputLabel, MenuItem, styled, Typography } from '@mui/material';
import Loader from '../Loader/Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const NewsWrapper = styled(Box)(() => ({
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& a": {
    textDecoration: "none",
    color: "black"
  }
}))

const NewsCard = styled(Box)(() => ({
  backgroundColor: "white",
  padding: "10px",
  borderRadius: "8px",
  fontSize: "14px"
}))

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurency');

  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 })
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />

  return (
    <NewsWrapper >

      {!simplified && (
        <FormControl sx={{ width: "200px", marginBottom: "25px" }}>
          <InputLabel >Cryptocurency</InputLabel>
          <Select
            value={newsCategory}
            label="Cryptocurency"
            onChange={(e) => setNewsCategory(e.target.value)}
          >
            {data?.data?.coins?.map((currency) => <MenuItem key={currency.name} value={currency.name} >{currency.name}</MenuItem>)}
          </Select>
        </FormControl>
      )}

      <Grid container spacing={3}>

        {cryptoNews.value.map((news, i) => (

          <Grid item xs={12} sm={12} md={6} lg={4}>

            <a href={news.url} key={i}>
              <NewsCard >

                <Box sx={{ display: "flex", alignItems: "start" }}>
                  <Typography sx={{ pr: "10px" }} component="h4" variant={1}>{news.name}</Typography>
                  <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                </Box>

                <Typography sx={{ fontSize: "12px", m: "20px 0" }}>
                  {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" style={{ height: '26px' }} />
                    <Typography sx={{ ml: "5px", fontSize: "12px" }}>
                      {news.provider[0]?.name}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "12px" }}>
                    {moment(news.datePublished).startOf('ss').fromNow()}
                  </Typography>
                </Box>

              </NewsCard>
            </a>

          </Grid >
        ))}

      </Grid >

    </NewsWrapper>
  )
}

export default News