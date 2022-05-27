import React, {useState} from 'react'
import './News.sass'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../../services/cryptoAPI';
import { Grid } from '@mui/material';
import Loader from '../Loader/Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

function News({simplified}) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const {data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12})
  const { data } = useGetCryptosQuery(100);

  if(!cryptoNews?.value) return <Loader/>

  return (
   <div className='news__wrapper'>
      {!simplified && (
            <select
                  className='news__select'
                  placeholder="Select a Crypto"
                  onChange={(e) => setNewsCategory(e.target.value)}
            >
            <option value="Cryptocurency">Cryptocurrency</option>
            {data?.data?.coins?.map((currency) => <option key={currency.name} value={currency.name} >{currency.name}</option>)}
            
        </select>
        )} 
         
    <div >

            <Grid container maxWidth="100%" spacing={3}>

                {cryptoNews.value.map((news, i) =>(
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                  <a href={news.url} key={i}>
                      <div className='news__card'>
                        <div className='news__card-title'>
                            <h4>{news.name}</h4>
                            <img src={news?.image?.thumbnail?.contentUrl || demoImage } alt="news" />
                        </div>
                        <p className='news__card-description'>
                            {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                        </p>
                        <div className='news__card-footer'>
                          <div>
                              <img src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" style={{height:'26px'}}/>
                              <p>{news.provider[0]?.name}</p>
                          </div>
                          <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
                        </div>
                      </div>
                  </a>
                  </Grid > 
                ))}

            </Grid > 
            
    </div>
     
  

   </div>
  )
}

export default News