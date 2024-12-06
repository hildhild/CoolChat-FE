import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isExpanded: true,
    },
    reducers: {
        toggleIsExpanded: (state) => {
            state.isExpanded = !state.isExpanded;
        },
    }
});

export const { toggleIsExpanded } = SidebarSlice.actions

export default SidebarSlice.reducer;
