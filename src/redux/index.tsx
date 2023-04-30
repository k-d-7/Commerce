import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        // Add reducers here
        cart: cartReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
