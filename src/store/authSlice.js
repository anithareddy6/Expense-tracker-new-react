import { createSlice } from "@reduxjs/toolkit";

const initialauthState = { isAuthenticated: false, email: "" };

const authSlice = createSlice({
    name: "auth",
    initialState: initialauthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.email = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
        signup(state, action) {
            state.isAuthenticated = true;
            state.email = action.payload;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;