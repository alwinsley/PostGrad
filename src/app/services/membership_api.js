import axios from 'axios';

export const getMemberships = () => {
    return axios.get(`/api/memberships`);
}

export const postSubscription = (payload) => {
    return axios.post(`/api/subscription`, payload);
}