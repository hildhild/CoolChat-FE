import axios from './axios';

export const initSubscriptionPaymentApi = (type, name, isNew) => {
    return axios.post(`/subscription/subscriptions/initiate_payment/`, {
        payment_type: type,
        is_new_subscription: isNew,
        tier_name: name
    });
}

export const initChargePaymentApi = (type, name, quantity) => {
    return axios.post(`/subscription/subscriptions/initiate_payment/`, {
        payment_type: type,
        additional_usage_quantity: quantity,
        additional_usage_type: name
    });
}

export const getPaymentsApi = (page, size) => {
    return axios.get(`/subscription/payments/`, {
        params: {
            page: page,
        page_size: size
        }
    });
}