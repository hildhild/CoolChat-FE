import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: "",
    },
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
    }
});

export const { setToken } = UserSlice.actions

export default UserSlice.reducer;
