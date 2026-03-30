import axios from 'axios';

const API_URL = 'https://tu-backend.up.railway.app';

export const getMedia = () => axios.get(API_URL);
export const createMedia = (data) => axios.post(API_URL, data);
export const updateMedia = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteMedia = (id) => axios.delete(`${API_URL}/${id}`);
