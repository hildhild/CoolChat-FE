import axios from './axios';

export const signupApi = (role, firstName, lastName, email, phoneNumber, invitationCode, description) => {
    // console.log(import.meta.env.VITE_API_CORE_ENDPOINT);
    if (role == 'Producer'){
        if (invitationCode){
            return axios.post(`api/v1/producer/registration`, {"firstName": firstName, "lastName": lastName, "email": email, "phoneNumber": phoneNumber, "invitationCode": invitationCode, "description": description});
        }
        else {
            return axios.post(`api/v1/producer/registration`, {"firstName": firstName, "lastName": lastName, "email": email, "phoneNumber": phoneNumber, "description": description});
        }
    }
    else {
        if (invitationCode) {
            return axios.post(`api/v1/affiliate/registration`, {"firstName": firstName, "lastName": lastName, "email": email, "phoneNumber": phoneNumber, "invitationCode": invitationCode});
        }
        else {
            return axios.post(`api/v1/affiliate/registration`, {"firstName": firstName, "lastName": lastName, "email": email, "phoneNumber": phoneNumber});
        }
    }
}


