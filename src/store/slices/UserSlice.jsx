import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: "",
        email: "",
        name: "",
        phoneNumber: "",
        avatar: "",
        role: "",
        companyName: "",
        userId: "",
    },
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUserData: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.phoneNumber = action.payload.phone_number;
            state.avatar = action.payload.avatar_url;
        },
        setUserRole: (state, action) => {
            state.role = action.payload;
        },
        setCompanyName: (state, action) => {
            state.companyName = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        }
    }
});

export const { setToken, setUserData, setUserRole, setCompanyName, setUserId } = UserSlice.actions

export default UserSlice.reducer;
