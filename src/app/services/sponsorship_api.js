import axios from 'axios';
import { buildQuery } from 'app/helpers/functions';

export const postSponsorship = (payload) => {
    return axios.post('/api/sponsorship', payload);
}

export const putSponsorship = (id, payload) => {
    return axios.put(`/api/sponsorship/${id}`, payload);
}

export const getAllSponsorships = (payload) => {
    let query = buildQuery(payload);
    return axios.get(`/api/sponsorships${query}`);
}

export const deleteSponsorship = (id) => {
    return axios.delete(`/api/sponsorship/${id}`);
}