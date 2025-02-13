import { createSlice } from "@reduxjs/toolkit";

export const ChatbotConfigSlice = createSlice({
  name: "chatbotConfig",
  initialState: {
    config: null
  },
  reducers: {
    setChatbotConfig: (state, action) => {
      state.config = action.payload
    },
  },
});

export const { setChatbotConfig } = ChatbotConfigSlice.actions;

export default ChatbotConfigSlice.reducer;
