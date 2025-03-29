import axios from './axios';

export const initPaymentApi = (type, name, isNew) => {
    return axios.post(`/subscription/subscriptions/initiate_payment/`, {
        payment_type: type,
        is_new_subscription: isNew,
        tier_name: name
    });
}