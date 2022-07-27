import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
};
export const productsFetch = createAsyncThunk(
    "producst/productsFetch",
    async () => {
        const response = await axios.get("http://localhost:3001/products");
        return response?.data;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = "succes";
            state.items = action.payload;
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = "error";
        },
    },
});

export default productsSlice.reducer;
