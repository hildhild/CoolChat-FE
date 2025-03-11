import axios from './axios';

export const getChatConversationsApi = (active, customer, page, size, agentId, isNeedSupport) => {
    return axios.get(`/chat/conversations/`, {
        params: {
            page: page, 
            page_size: size,
            ...(active ? {active : active} : {}),
            ...(customer ? {customer : customer} : {}),
            ...(agentId ? {agent : agentId} : {}),
            ...(isNeedSupport ? {has_agent : isNeedSupport} : {}),
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

export const editIsActiveChatDetailApi = (id, value) => {
    return axios.patch(`/chat/conversations/${id}/`, {
        is_active: value,
    });
}

export const changeAgentOfChatApi = (id, agentId) => {
    return axios.patch(`/chat/conversations/${id}/`, {
        agent: agentId,
    });
}

export const deleteChatApi = (id) => {
    return axios.delete(`/chat/conversations/${id}/`);
}
