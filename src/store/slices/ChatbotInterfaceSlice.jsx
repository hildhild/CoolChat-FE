import { createSlice } from "@reduxjs/toolkit";

export const ChatbotInterfaceSlice = createSlice({
  name: "chatbotInterface",
  initialState: {
    main_name: "CoolChat",
    sub_name: "Luôn sẵn sàng hỗ trợ bạn",
    font_family: "font-sans",
    message_border_radius: "12",
    message_background_color: "#EAF2F6",
    message_text_color: "#000000",
    message_background_color_me: "#4880FF",
    message_text_color_me: "#ffffff",
  },
  reducers: {
    setChatbotInterface: (state, action) => {
      state.main_name = action.payload.main_name;
      state.sub_name = action.payload.sub_name;
      state.font_family = action.payload.font_family;
      state.message_border_radius = action.payload.message_border_radius;
      state.message_background_color = action.payload.message_background_color;
      state.message_text_color = action.payload.message_text_color;
      state.message_background_color_me = action.payload.message_background_color_me;
      state.message_text_color_me = action.payload.message_text_color_me;
    },
  },
});

export const { setChatbotInterface } = ChatbotInterfaceSlice.actions;

export default ChatbotInterfaceSlice.reducer;
