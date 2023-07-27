import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import themeSlice from "./themeSlice";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        expense: cartSlice.reducer,
        theme: themeSlice.reducer
    }
});

export default store;