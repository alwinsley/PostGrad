import axios from 'axios';

export const getPermissions = () => {
    return axios.get(`/api/permissions`);
}

export const postSubscription = (payload) => {
    return axios.post(`/api/subscription`, payload);
}