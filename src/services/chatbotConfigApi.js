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