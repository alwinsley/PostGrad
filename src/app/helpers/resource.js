import { API_URL } from '../services/config';

export const buildResource = (files, type, user_id) => {
    if(!files || !files.length) return [];

    let _files = files.map(f => {
        return {
            user_id,
            type,
            url: f,
            description: '',
            highlight: 0,
            workout: 0
        }
    });

    return _files;
}

export const asset_path = (path) => {
    return API_URL + path;
}