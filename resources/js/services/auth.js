import axios from 'axios';
import store from '../store';

let env = '';

export default {
    register(payload) {
        return axios({
            method: 'post',
            url: '/api/register',
            data: payload
        });
    },
    login(payload) {
        return axios({
            method: 'post',
            url: env + '/api/login',
            data: payload
        });
    },
    logout() {
        return axios({
            method: 'get',
            url: '/api/logout'
        });

    }
};
