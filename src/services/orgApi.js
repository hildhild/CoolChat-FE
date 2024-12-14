import axios from './axios';

export const getOrgInfoApi = () => {
    return axios.get(`/organization/detail/`);
}

export const editOrgInfoApi = (name, description, contact_email, contact_phone, address) => {
    return axios.put(`/organization/detail/`, {
        "name": name,
        "description": description,
        "contact_email": contact_email,
        "contact_phone": contact_phone,
        "address": address
    });
}

export const getMembersApi = (page) => {
    return axios.get(`/organization/members/`, {
        params: {page: page}
    });
}

export const getInvitesApi = (page, status = "") => {
    return axios.get(`/organization/invites/`, {
        params: {
            page: page,
            ...(status ? {status: status} : {})
        }
    });
}

export const inviteMemberApi = (email, role) => {
    return axios.post(`/organization/invite/`, {
        email: email,
        role: role
    });
}

export const removeMemberApi = (id) => {
    return axios.post(`/organization/member/remove/${id}/`);
}

export const revokeInviteApi = (id) => {
    return axios.post(`/organization/invite/revoke/${id}/`);
}
