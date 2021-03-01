import axios from 'axios';

export const getMemberships = () => {
    return axios.get(`/api/memberships`);
}

export const postSubscription = (payload) => {
    return axios.post(`/api/subscription`, payload);
}

export const checkPromoCode = (payload) => {
    return axios.post(`/api/promo_code`, payload);
}