import axios from './axios';

export const getReportAllTimeApi = () => {
    return axios.get(`/reports/all-time-chat/`);
}

export const getReportDailyApi = (firstDate, lastDate) => {
    return axios.get(`/reports/daily-chat/`, {
        params: {
            date__gte: firstDate, 
            date__lte: lastDate, 
            page: 1, 
            page_size: 31,
            ordering: "date"
        }
    });
}

export const getMonthlySubscriptionApi = (firstMonth, lastMonth) => {
    return axios.get(`/reports/monthly-subscription-summary/`, {
        params: {
            month__gte: firstMonth, 
            month__lte: lastMonth, 
            page: 1, 
            page_size: 12,
            ordering: "month"
        }
    });
}

export const getOrgUsageApi = () => {
    return axios.get(`/reports/organization-usage-snapshot/`);
}


