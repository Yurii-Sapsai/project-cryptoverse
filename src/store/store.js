import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoAPI';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { cryptoExchanges } from '../services/cryptoExchanges';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [cryptoExchanges.reducerPath]: cryptoExchanges.reducer
    }
})