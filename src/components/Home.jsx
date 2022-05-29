import React from 'react';
import millify from 'millify';
import { NavLink } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoAPI';

import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

import { Box, styled } from '@mui/material';
import Button from '@mui/material/Button';

const HomeWrapper = styled(Box)(() => ({
    paddingTop: "25px"
}
))

const HomeStats = styled(Box)(() => ({
    padding: "25px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr"
}
))

const HomeStatsItem = styled(Box)(() => ({
    marginBottom: "25px",
    "& p": {
        fontSize: "14px",
        marginBottom: "5px"
    },
    "& span": {
        fontSize: "18px"
    }
}
))

const HomeTitle = styled("h2")(() => ({
    fontWeight: "400"
}
))

const HomeTitleBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 25px"
}
))


function Home() {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) return <Loader />

    return (
        <HomeWrapper>

            <HomeTitle sx={{ ml: "25px" }}>Global Crypto Stats</HomeTitle>

            <HomeStats>
                <HomeStatsItem>
                    <p>Total Cryptocurrencies</p>
                    <span>{globalStats.total}</span>
                </HomeStatsItem>
                <HomeStatsItem>
                    <p>Total Market Cap</p>
                    <span>{millify(globalStats.totalMarketCap)}</span>
                </HomeStatsItem>
                <HomeStatsItem>
                    <p>Total Markets</p>
                    <span>{millify(globalStats.totalMarkets)}</span>
                </HomeStatsItem>
                <HomeStatsItem>
                    <p>Total Exchages</p>
                    <span>{millify(globalStats.totalExchanges)}</span>
                </HomeStatsItem>
                <HomeStatsItem>
                    <p>Total 24 Volume</p>
                    <span>{millify(globalStats.total24hVolume)}</span>
                </HomeStatsItem>
            </HomeStats>

            <HomeTitleBox>
                <HomeTitle>Top 10 Cryptocurrencies</HomeTitle>
                <NavLink to='/cryptocurrencies' style={{ textDecoration: "none" }}><Button variant="contained" size={"small"}>Show more</Button></NavLink>
            </HomeTitleBox>
            <Cryptocurrencies simplified />

            <HomeTitleBox>
                <HomeTitle>Latest Crypto News</HomeTitle>;
                <NavLink to='/news' style={{ textDecoration: "none" }} ><Button variant="contained" size={"small"}>Show more</Button></NavLink>
            </HomeTitleBox>
            <News simplified />

        </HomeWrapper>
    )
}

export default Home;