import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoExchangesHeaders = {'X-CoinAPI-Key': 'CCF7CF58-A173-4CCE-874D-16A165FF2FF7'}


const baseUrl = 'https://rest.coinapi.io/' ;

const createRequest = (url) => ({ url, headers: cryptoExchangesHeaders })

export const cryptoExchanges = createApi({
    reducerPath: 'cryptoExchanges',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getExchanges: builder.query({
            query: () => createRequest(`/v1/exchanges`),
        }),
        getExchangesIcons: builder.query({
            query: () => createRequest(`/v1/exchanges/icons/{30px}`),
        })
     
    })
}) 

export const { useGetExchangesQuery, useGetExchangesIconsQuery } = cryptoExchanges