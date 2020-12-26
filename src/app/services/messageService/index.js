import axios from 'axios';

export const postMessage = (payload) => {
    return axios.post('/api/message', payload);
}

export const getMessages = () => {
    return axios.get('/api/messages');
}

export const checkMessage = () => {
    return axios.get('/api/unread_message');
}

export const changeMessageStatus = (id) => {
    return axios.put('/api/message' + id);
}
