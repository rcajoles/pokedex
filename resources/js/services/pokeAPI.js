import axios from 'axios';
import store from '../store';

export default {
    async list(params) {
        const src = 'https://pokeapi.co/api/v2/';
        const init = {
            limit: 20,
            offset: 0,
        };
        const query = `pokemon/?limit=${params != undefined ? params.limit : init.limit }&offset=${params != undefined ? params.offset : init.offset}`;
        const url_query = src + query;

        console.log(`url_query: ${url_query}`);
        return await axios({
            method: 'get',
            url: url_query,
        });
    },
};
