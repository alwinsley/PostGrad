import axios from 'axios';
import { buildQuery } from 'app/helpers/functions';

export const postGame = (payload) => {
    return axios.post('/api/game', payload);
}

export const putGame = (id, payload) => {
    return axios.put(`/api/game/${id}`, payload);
}

export const getAllGames = (payload) => {
    let query = buildQuery(payload);
    return axios.get(`/api/games${query}`);
}

export const deleteGame = (id) => {
    return axios.delete(`/api/game/${id}`);
}