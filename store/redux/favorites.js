import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        ids: []
    },
    reducers: {
        addFav: (state, action) => {
            state.ids.push(action.payload.id);
        },
        delFav: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1);
        },
        clearFav: (state, action) => {
            state.ids = []
        }
    }
});

export const addFav = favoritesSlice.actions.addFav;
export const delFav = favoritesSlice.actions.delFav;
export const clearFav = favoritesSlice.actions.clearFav;
export default favoritesSlice.reducer;
