import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios';
import { URL } from "../../config";



export const GetProducts = createAsyncThunk('getproducts', async (data) => {
    try {
        const response = await axios.get(URL + `products/getproducts`);
        return response.data;
    } catch (error) {
        console.log(error)
        return isRejectedWithValue(error.response?.data?.message || "Failed to get products");
    }
});







export const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetProducts.pending, (state) => {
                if (state.products.length < 1) {
                    state.loading = true;
                }
                if (state.products.length > 0) {

                }
                state.error = null;
            })
            .addCase(GetProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data
            })
            .addCase(GetProducts.rejected, (state, action) => {
                state.scrollLoading = true;
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const ProductRedducer = productSlice.reducer;
