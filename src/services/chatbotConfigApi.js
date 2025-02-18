import axios from './axios';

export const getChatbotConfigApi = () => {
    return axios.get(`/chatbot/config/`);
}

export const resetChatbotInterfaceApi = () => {
    return axios.post(`/chatbot/config/reset/`);
}

export const editChatbotConfigApi = (config) => {
    const formData = new FormData();
    if (config?.avatar) formData.append("avatar", config.avatar);
    if (config?.background_image) formData.append("background_image", config.background_image);
    if (config?.primary_background_color) formData.append("primary_background_color", config.primary_background_color);
    if (config?.secondary_background_color) formData.append("secondary_background_color", config.secondary_background_color);
    if (config?.primary_font_color) formData.append("primary_font_color", config.primary_font_color);
    if (config?.display_name) formData.append("display_name", config.display_name);
    if (config?.font) formData.append("font", config.font);
    if (config?.font_size) formData.append("font_size", config.font_size);
    if (config?.description) formData.append("description", config.description);
    if (config?.border_radius) formData.append("border_radius", config.border_radius.toString());
    if (config?.sending_message_font_color) formData.append("sending_message_font_color", config.sending_message_font_color);
    if (config?.sending_message_background_color) formData.append("sending_message_background_color", config.sending_message_background_color);
    if (config?.receiving_message_font_color) formData.append("receiving_message_font_color", config.receiving_message_font_color);
    if (config?.receiving_message_background_color) formData.append("receiving_message_background_color", config.receiving_message_background_color);
    return axios.patch(`/chatbot/config/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
}

export const getEmbedCodeApi = () => {
    return axios.get(`/chatbot/embed-code/`);
}

export const editAllowedDomainsApi = (allowedDomains) => {
    const formData = new FormData();
    formData.append("allowed_domains", allowedDomains);
    return axios.patch(`/chatbot/config/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
}

export const editChatbotToneApi = (tone) => {
    const formData = new FormData();
    formData.append("chatbot_tone", tone);
    return axios.patch(`/chatbot/config/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
}

export const editWelcomeMessageApi = (value) => {
    const formData = new FormData();
    formData.append("welcome_message", value);
    return axios.patch(`/chatbot/config/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
}
export const editGoodbyeMessageApi = (value) => {
    const formData = new FormData();
    formData.append("goodbye_message", value);
    return axios.patch(`/chatbot/config/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
}
export const editSwitchMessageApi = (value) => {
    const formData = new FormData();
    formData.append("human_switch_message", value);
    return axios.patch(`/chatbot/config/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
}