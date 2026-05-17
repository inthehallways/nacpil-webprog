import axios from 'axios';
import constants from '../constants';

// api access to front-end JSON data transformation or decoder
const API = axios.create({
    baseURL: `${constants.HOST}/users`,
});

// fetch users
export const fetchUsers = () => API.get('/');

// create user
export const createUser = (user) => API.post('/', user);

// update user
export const updateUser = (id, user) => API.put(`/${id}`, user);

// delete user
export const deleteUser = (id) => API.delete(`/${id}`);

// login user
export const loginUser = (credentials) => API.post('/login', credentials);
