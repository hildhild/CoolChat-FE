import axios from './axios';

export const getChatConversationsApi = (active, customer, page, size, agentId) => {
    return axios.get(`/chat/conversations/`, {
        params: {
            page: page, 
            page_size: size,
            ...(active ? {active : active} : {}),
            ...(customer ? {customer : customer} : {}),
            ...(agentId ? {agent : agentId} : {}),
        }
    });
}

export const getAgentChatConversationsApi = (active, agent, customer, page, size) => {
    return axios.get(`/chat/conversations/`, {
        params: {
            page: page, 
            page_size: size,
            ...(active ? {active : active} : {}),
            ...(agent ? {agent : agent} : {}),
            ...(customer ? {customer : customer} : {}),
        }
    });
}

export const getChatDetailApi = (id) => {
    return axios.get(`/chat/conversations/${id}/`);
}
