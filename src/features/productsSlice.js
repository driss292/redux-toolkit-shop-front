import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
    error: null,
};
export const productsFetch = createAsyncThunk(
    "producst/productsFetch",
    async (id = null, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3001/products");
            return response?.data;
        } catch (error) {
            return rejectWithValue("ERROR");
        }
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
            state.error = action.payload;
        },
    },
});

export default productsSlice.reducer;
