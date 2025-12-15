import { configureStore } from '@reduxjs/toolkit';
import { ProductRedducer } from "../slicers/productSlicres"
import { cartReducer } from "../slicers/cartSlicer"

export const store = configureStore({
    reducer: {
        product: ProductRedducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;