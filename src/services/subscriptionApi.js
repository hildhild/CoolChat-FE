import axios from './axios';

export const initSubscriptionPaymentApi = (type, name, period) => {
    return axios.post(`/subscription/subscriptions/initiate_payment/`, {
        payment_type: type,
        billing_period: period,
        tier_name: name
    });
}

export const renewSubscriptionApi = (period) => {
    return axios.post(`/subscription/subscriptions/renew/`, {
        billing_period: period
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

export const cancelPaymentApi = (id) => {
    return axios.post(`/subscription/payment/cancel/${id}/`);
}

export const getCurrentSubscriptionInfoApi = () => {
    return axios.get(`/subscription/subscriptions/`);
}

export const getActiveSubscriptionInfoApi = () => {
    return axios.get(`/subscription/subscriptions/active/`);
}