import axios from 'axios';
import { buildQuery } from 'app/helpers/functions';

export const postProfile = (payload) => {
    return axios.post('/api/profile', payload);
}

export const getMyProfile = () => {
    return axios.get('/api/my_profile');
}

export const getProfile = (id) => {
    return axios.get('/api/profile/' + id);
}

export const GetProfiles = (payload) => {
    let query = buildQuery(payload);
    return axios.get(`/api/profiles${query}`);
}

export const uploadResources = (payload) => {
    return axios.post('/api/resources', payload);
}

export const deleteResource = (id) => {
    return axios.delete('/api/resource/'+ id);
}

export const updateResource = (id, data) => {
    return axios.put('/api/resource/' + id, data);
}


export const setRecruitUser = (id, data) => {
    return axios.post(`/api/set_recruit/${id}`, data);
}

export const createUser = (payload) => {
    return axios.post('/api/user', payload);
}

export const deleteUser = (id) => {
    return axios.delete(`/api/user/${id}`);
}



export const getTranscript = (userId) => {
    return axios.get(`/api/transcript/${userId}`);
}

export const postTranscript = (userId, payload) => {
    return axios.post(`/api/transcript/${userId}`, payload);
}

export const updateTranscript = (userId, payload) => {
    return axios.put(`/api/transcript/${userId}`, payload);
}

export const removeTranscript = (userId) => {
    return axios.delete(`/api/transcript/${userId}`);
}

