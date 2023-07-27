import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { isActivated: false, bgColor: false };

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers: {
        activateTheme(state, action) {
            state.isActivated = !state.isActivated;
        },
        changeTheme(state, action) {
            state.bgColor = !state.bgColor;
        }
    }
});


export const themeActions = themeSlice.actions;

export default themeSlice;