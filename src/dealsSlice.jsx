import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDeals = createAsyncThunk('deals/fetchDeals', async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/deals`, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
});

const dealsSlice = createSlice({
    name: 'deals',
    initialState: {
        deals: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeals.fulfilled, (state, action) => {
                state.loading = false;
                state.deals = action.payload;
            })
            .addCase(fetchDeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default dealsSlice.reducer;