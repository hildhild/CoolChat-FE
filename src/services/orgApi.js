import axios from './axios';

export const getOrgInfoApi = () => {
    return axios.get(`/organization/detail/`);
}

export const editOrgInfoApi = (name, description, contact_email, contact_phone, address, logo) => {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (contact_email) formData.append("contact_email", contact_email);
    if (contact_phone) formData.append("contact_phone", contact_phone);
    if (address) formData.append("address", address);
    if (logo) formData.append("logo", logo);
    return axios.patch(`/organization/detail/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
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
