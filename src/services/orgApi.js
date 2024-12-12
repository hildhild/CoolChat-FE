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

export const getMembersApi = () => {
    return axios.get(`/organization/members/`);
}

export const inviteMemberApi = (email, role) => {
    return axios.post(`/organization/invite/`, {
        email: email,
        role: role
    });
}
