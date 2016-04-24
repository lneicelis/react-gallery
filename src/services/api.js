import axios from 'axios';
import HttpRequest from '../models/http-request';

// TODO: take from ENV params
const baseURL = 'http://localhost:3000/';
const client = axios.create({baseURL});

/**
 * @param {String} URL
 * @param {String} method
 * @returns {HttpRequest}
 */
export function createHttpRequest({URL, method}) {
    return new HttpRequest(URL, method);
}


export default {
    getResponse(httpRequest) {
        const {URL, method, params, data} = httpRequest;

        return axios({
            url: URL,
            method,
            params,
            data
        }).delay(1000);
    }
};