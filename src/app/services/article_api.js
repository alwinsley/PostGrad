import axios from 'axios';

export const GetArticles = () => {
    return axios.get(`/api/articles`);
}

export const PostArticle = (payload) => {
    return axios.post(`/api/article`, payload);
}

export const UpdateArticle = (id, payload) => {
    return axios.put(`/api/article/${id}`, payload);
}

export const DeleteArticle = (id) => {
    return axios.delete(`/api/article/${id}`);
}