import { createSlice } from "@reduxjs/toolkit";

export const OrganizationSlice = createSlice({
    name: "organization",
    initialState: {
        name: "",
        description: "",
        logo: "",
        contact_email: "",
        contact_phone: "",
        address: "",
        subscription_type: ""
    },
    reducers: {
        setOrganizationData: (state, action) => {
            state.name = action.payload.name;
            state.description = action.payload.description;
            state.logo = action.payload.logo;
            state.contact_email = action.payload.contact_email;
            state.contact_phone = action.payload.contact_phone;
            state.address = action.payload.address;
            state.subscription_type = action.payload.subscription_type;
        },
    }
});

export const { setOrganizationData } = OrganizationSlice.actions

export default OrganizationSlice.reducer;
