import { createSlice } from "@reduxjs/toolkit";

export const SignupDataSlice = createSlice({
    name: "signupData",
    initialState: {
        signupData: {
            invitation_token: "",
            name: "",
            description: "",
            contact_email: "",
            contact_phone: "",
            email: "",
            password: "",
            password2: "",
            user_name: "",
            user_phone: ""
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
