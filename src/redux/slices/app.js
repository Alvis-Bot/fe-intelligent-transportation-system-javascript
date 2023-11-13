import {createSlice} from "@reduxjs/toolkit";



const initialState  = {
    isSending: false, // chuyển mode otp

}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsSending: (state, action) => {
            state.isSending = action.payload;
        },
    }
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
