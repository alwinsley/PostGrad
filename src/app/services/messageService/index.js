import axios from 'axios';
import { buildQuery } from 'app/helpers/functions';

export const postMessage = (payload) => {
    return axios.post('/api/message', payload);
}

export const getMessages = (payload) => {
    let query = buildQuery(payload);
    return axios.get(`/api/messages${query}`);
}

export const getMessage = (id) => {
    return axios.get(`/api/message/${id}`);
}

export const checkMessage = () => {
    return axios.get('/api/unread_message');
}

export const changeMessageStatus = (id) => {
    return axios.put('/api/message/' + id);
}

export const deleteMessages = (payload) => {
    return axios.post('/api/delete_messages', payload);
}
