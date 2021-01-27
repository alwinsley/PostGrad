import axios from 'axios';

export const getSchedules = () => {
    return axios.get(`/api/schedules`);
}

export const getUserSchedules = (id) => {
    return axios.get(`/api/user_schedules/${id}`);
}

export const postSchedule = (payload) => {
    return axios.post(`/api/schedule`, payload);
}

export const updateSchedule = (id, payload) => {
    return axios.put(`/api/schedule/${id}`, payload);
}

export const deleteSchedule = (id) => {
    return axios.delete(`/api/schedule/${id}`);
}