import { createSlice } from "@reduxjs/toolkit";

export const SignupDataSlice = createSlice({
    name: "signupData",
    initialState: {
        signupData: {
            name: "",
            email: "",
            password: "",
            password2: "",
        }
    },
    reducers: {
        changeSignupData: (state, action) => {
            state.signupData = action.payload;
        },
        changeSignupEmail: (state, action) => {
            state.signupData = {...state.signupData, email: action.payload};
        }
    }
});

export const { changeSignupData, changeSignupEmail } = SignupDataSlice.actions

export default SignupDataSlice.reducer;
