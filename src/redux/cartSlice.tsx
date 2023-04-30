import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './index';
import {IItemCart} from '../interfaces/itemCart.interface';

interface CartState {
    items: IItemCart[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IItemCart>) => {
            const existedItem = state.items.find(item => item.id === action.payload.id);
            if (existedItem) {
                existedItem.quantity += 1;
            } else {
                state.items.push(action.payload);
            }
        },
        deleteItem : (state, action: PayloadAction<IItemCart>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }
    }
}); 

export const selectCartItems = (state: RootState) => state.cart.items;
export const {addToCart, deleteItem} = cartSlice.actions;
export default cartSlice.reducer;

