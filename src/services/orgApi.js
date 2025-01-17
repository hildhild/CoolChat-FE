import axios from './axios';

export const getOrgInfoApi = () => {
    return axios.get(`/organization/detail/`);
}

export const editOrgInfoApi = (name, description, contact_email, contact_phone, address) => {
    return axios.patch(`/organization/detail/`, {
        "name": name,
        "description": description,
        "contact_email": contact_email,
        "contact_phone": contact_phone,
        "address": address
    });
}

export const getMembersApi = (page, size) => {
    return axios.get(`/organization/members/`, {
        params: {page: page, page_size: size}
    });
}

export const getInvitesApi = (page, status = "", size) => {
    return axios.get(`/organization/invites/`, {
        params: {
            page: page,
            ...(status ? {status: status} : {}),
            page_size: size
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
