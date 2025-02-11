import axios from './axios';

export const getChatbotConfigApi = () => {
    return axios.get(`/chatbot/config/`);
}

export const resetChatbotConfigApi = () => {
    return axios.post(`/chatbot/config/reset/`);
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