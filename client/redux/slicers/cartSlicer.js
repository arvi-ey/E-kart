import { URL } from "../../config";  // Adjust path based on your file structure
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AddToCart = createAsyncThunk(
    'cart/addtocart', async (data) => {
        try {

            const response = await axios.post(URL + `cart/addcart`, data);
            if (response.data.success === true) {
                return response.data.item;
            }
        } catch (error) {
            return error.response.data;
        }
    }
);

// GetCartItems async thunk
export const GetCartItems = createAsyncThunk(
    'cart/getitems', async (userId) => {
        try {
            const response = await axios.get(URL + `cart/getcartitems`);
            if (response.data.success === true) {
                return response.data.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
);


export const RemoveFromCart = createAsyncThunk(
    'cart/removefromcart', async (cartId) => {
        try {
            const response = await axios.post(URL + `cart/removecart/${cartId}`);
            if (response.data.success === true) {
                return response.data.item;
            }
        } catch (error) {
            return error.response.data;
        }
    }
);


export const UpdateCartItem = createAsyncThunk('cart/updateitem',
    async ({ cartId, body }) => {
        try {
            const response = await axios.patch(URL + `cart/updatecartitem/${cartId}`, { body });
            if (response.data.success === true) {
                return response.data.item;
            }
        } catch (error) {
            return error.response.data;
        }
    }
);


const initialState = {
    cartitems: [],
    loading: false,
    error: null
};


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartitems = [...state.cartitems, action.payload];
            })
            .addCase(AddToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartitems = action.payload;
            })
            .addCase(GetCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(RemoveFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(RemoveFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartitems = state.cartitems.filter(data => data._id !== action.payload._id);
            })
            .addCase(RemoveFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UpdateCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                const updatedData = action.payload;
                state.cartitems = state.cartitems.map(data =>
                    data._id === updatedData._id ? updatedData : data
                );
            })
            .addCase(UpdateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const cartReducer = cartSlice.reducer;