import axios from 'axios';

export const postProfile = (payload) => {
    return axios.post('/api/profile', payload);
}

export const getMyProfile = () => {
    return axios.get('/api/my_profile');
}

export const getProfile = (id) => {
    return axios.get('/api/profile/' + id);
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
