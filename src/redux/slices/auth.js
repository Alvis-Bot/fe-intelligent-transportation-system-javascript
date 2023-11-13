
import { createSlice} from "@reduxjs/toolkit";



const initialState  = {
    currentUser: null, // thông tin user đăng nhập
    isLoading: false,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },

    },
    extraReducers: (builder) => {

    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
