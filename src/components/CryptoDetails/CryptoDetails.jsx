import React, {useState} from 'react'
import HTMLReactParser from 'html-react-parser';
import {useParams} from 'react-router-dom'
import millify from 'millify'

import { useGetCryptoDetailsQuery } from '../../services/cryptoAPI'

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import DoDisturbOutlinedIcon from '@mui/icons-material/DoDisturbOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

function CryptoDetails() {

    const {coinId} = useParams()

    const [timePeriod, setTimePeriod] = useState('7d');
    const {data, isFetching} = useGetCryptoDetailsQuery(coinId);
    const cryptoDetails = data?.data?.coin;

    console.log(data)
    console.log(cryptoDetails)

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
      { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <MonetizationOnIcon /> },
      { title: 'Rank', value: cryptoDetails?.rank, icon: <ConfirmationNumberOutlinedIcon /> },
/*       { title: '24h Volume', value: `$ ${cryptoDetails?.total24hVolume && millify(cryptoDetails?.total24hVolume)}`, icon: <OfflineBoltIcon /> },
 */   { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <MonetizationOnIcon /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <EmojiEventsOutlinedIcon /> },
    ];
  
    const genericStats = [
      { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <ShowChartOutlinedIcon /> },
      { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <LocalAtmOutlinedIcon /> },
      { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlinedIcon /> : <DoDisturbOutlinedIcon />, icon: <ErrorOutlineOutlinedIcon /> },
      { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ErrorOutlineOutlinedIcon /> },
      { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ErrorOutlineOutlinedIcon /> },
    ];


  return (
    <div className='cryptoDetails__wrapper'>
         <h4>{cryptoDetails?.name} ({cryptoDetails?.symbol}) Price</h4> 
         <p>{cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
         <select
                  placeholder="Select Time Priod"
                  onChange={(e) => setTimePeriod(e.target.value)}
            >
            <option value="7d">7d</option>
            {time.map((date) => <option key={date}>{date}</option>)}
        </select>


        <div>
                <h4>{cryptoDetails?.name} Value Statistics</h4>
                <p>An overview showing the statistics of {cryptoDetails?.name}</p>
                <ul>
                    {stats.map(({icon, title, value}) => (
                        <li>{icon}{title} <span>{value}</span> </li>
                    ))}
                </ul>
        </div>

        <div>
                <h4>Other Statistics</h4>
                <p>An overview showing the statistics of all cryptocurrencies</p>
                <ul>
                    {genericStats.map(({icon, title, value}) => (
                        <li>{icon}{title} <span>{value}</span> </li>
                    ))}
                </ul>
        </div>

        <div>
                <h4>What is {cryptoDetails?.name}</h4>
                {HTMLReactParser(`${cryptoDetails?.description}`)}
        </div>

        <div>
                 <h4>{cryptoDetails?.name} Links</h4>  
                    
                 {cryptoDetails?.links.map((link)=> (
                     <>
                        <h4>{link?.name}</h4>
                        <a href={link?.url}>{link?.name}</a>
                     </>
                 ))}  
        </div>               

        


    </div>
    
  )
}

export default CryptoDetails