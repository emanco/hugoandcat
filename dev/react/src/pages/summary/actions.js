import {baseURL, key, limit} from '../../constants/endpoints';

import axios from 'axios';


const loader = axios.create({
    // baseURL: '',
    // headers: {'x-api-key': key}
    baseURL: baseURL
});

const getForecast = (location) => {
    if (location) {
        return loader.get('forecast?q='+location+'&APPID='+key);
    } else {
        return loader.get('forecast?q=London,uk&cnt='+limit+'&APPID='+key);
    }
};

const getData = (location) => {
    return {
        type: 'FETCH_DATA',
        payload: axios.all([getForecast(location)])
    }
};



export { getData, getForecast };