import axios from 'axios';

export const getAnalytics = () => {
    return axios.get('/api/dashboard/analytics');
}
