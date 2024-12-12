import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: "",
        email: "",
        name: "",
        phoneNumber: "",
        avatar: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUserData: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.phoneNumber = action.payload.phone_number;
            state.avatar = action.payload.avatar;
        }
    }
});

export const { setToken, setUserData } = UserSlice.actions

export default UserSlice.reducer;
