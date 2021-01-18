import axios from 'axios';
import { buildQuery } from 'app/helpers/functions';

export const postTeam = (payload) => {
    return axios.post('/api/team', payload);
}

export const putTeam = (id, payload) => {
    return axios.put(`/api/team/${id}`, payload);
}

export const getAllTeams = (payload) => {
    let query = buildQuery(payload);
    return axios.get(`/api/teams${query}`);
}

export const deleteTeam = (id) => {
    return axios.delete(`/api/team/${id}`);
}