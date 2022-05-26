import React, {useState} from 'react'
import './News.sass'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../../services/cryptoAPI';
import { Grid } from '@mui/material';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

function News({simplified}) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const {data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12})
  const { data } = useGetCryptosQuery(100);

  if(!cryptoNews?.value) return 'Loading...'

  return (
   <div>
      {!simplified && (
            <select
                  placeholder="Select a Crypto"
                  onChange={(e) => setNewsCategory(e.target.value)}
            >
            <option value="Cryptocurency">Cryptocurrency</option>
            {data?.data?.coins?.map((currency) => <option key={currency.name} value={currency.name} >{currency.name}</option>)}
            
        </select>
        )} 
         
    <div className='news__wrapper'>

            <Grid container maxWidth="100%" spacing={3}>

                {cryptoNews.value.map((news, i) =>(
                  <Grid item xs={12} sm={12} md={6}>
                  <a href={news.url} key={i}>
                      <div className='news__card'>
                        <h4>{news.name}</h4>
                        <img src={news?.image?.thumbnail?.contentUrl || demoImage } alt="news" />
                        <p>
                            {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                        </p>
                        <div>
                          <img src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" style={{height:'16px'}}/>
                          <p>{news.provider[0]?.name}</p>
                        </div>
                        <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
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