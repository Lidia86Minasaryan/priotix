import { Component } from 'react';
import axios from 'axios';

const apiUrl = 'https://api-search.win.gg/search';
const mediaApiUrl = 'https://d1wrci9wmi4ouq.cloudfront.net/';

export default class Api extends Component {

    static async apiCall(method, callName, params = {}, type="app") {

        var api = apiUrl;

        if (type === 'media'){
            api = mediaApiUrl + callName;
        }

        var response;
        switch (method) {
            case 'get':
                response = axios.get(api, {
                    params: params
                });
                break;
            default:
                break;
        }
        return response;
    }
}
