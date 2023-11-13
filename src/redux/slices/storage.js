import {createSlice} from "@reduxjs/toolkit";



const initialState  = {

}

const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {

    }

});

export const storageActions = storageSlice.actions;

export default storageSlice.reducer;
