import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice.jsx';
import productFilterSlice from './productFilterSlice.jsx';
import productSlice from './productSlice.jsx';



const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        filter: productFilterSlice.reducer,
        products: productSlice.reducer
    }
})


export default store;